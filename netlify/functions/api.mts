import type { Config } from "@netlify/functions";
import { and, eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { expenses, goals, portfolio, users } from "../../db/schema.js";

type User = typeof users.$inferSelect;

const json = (body: unknown, init?: ResponseInit) => Response.json(body, init);

const textEncoder = new TextEncoder();

const base64Url = (value: ArrayBuffer | Uint8Array | string) => {
  const bytes = typeof value === "string" ? textEncoder.encode(value) : value instanceof Uint8Array ? value : new Uint8Array(value);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
};

const fromBase64Url = (value: string) => {
  const normalized = value.replaceAll("-", "+").replaceAll("_", "/");
  const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), "=");
  return atob(padded);
};

const getSecret = () => process.env.SECRET_KEY || process.env.NETLIFY_DATABASE_URL || "local-dev-secret";

const sign = async (payload: string) => {
  const key = await crypto.subtle.importKey(
    "raw",
    textEncoder.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return base64Url(await crypto.subtle.sign("HMAC", key, textEncoder.encode(payload)));
};

const createToken = async (user: User) => {
  const payload = base64Url(JSON.stringify({ sub: user.id, email: user.email, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 }));
  return `${payload}.${await sign(payload)}`;
};

const verifyToken = async (req: Request) => {
  const auth = req.headers.get("authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  const [payload, signature] = token.split(".");

  if (!payload || !signature || signature !== await sign(payload)) {
    return null;
  }

  try {
    const data = JSON.parse(fromBase64Url(payload));
    if (!data.sub || Date.now() > data.exp) return null;
    const [user] = await db.select().from(users).where(eq(users.id, data.sub)).limit(1);
    return user ?? null;
  } catch {
    return null;
  }
};

const hashPassword = async (password: string) => {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.importKey("raw", textEncoder.encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations: 100_000, hash: "SHA-256" },
    key,
    256,
  );
  return `pbkdf2$${base64Url(salt)}$${base64Url(bits)}`;
};

const verifyPassword = async (password: string, stored: string) => {
  const [, saltValue, hashValue] = stored.split("$");
  if (!saltValue || !hashValue) return false;
  const salt = Uint8Array.from(fromBase64Url(saltValue), (char) => char.charCodeAt(0));
  const key = await crypto.subtle.importKey("raw", textEncoder.encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations: 100_000, hash: "SHA-256" },
    key,
    256,
  );
  return base64Url(bits) === hashValue;
};

const requireUser = async (req: Request) => {
  const user = await verifyToken(req);
  return user ? { user } : { response: json({ message: "Unauthorized" }, { status: 401 }) };
};

const readBody = async (req: Request) => {
  try {
    return await req.json();
  } catch {
    return {};
  }
};

const authHandler = async (req: Request, parts: string[]) => {
  if (req.method !== "POST") return json({ message: "Method not allowed" }, { status: 405 });
  const body = await readBody(req);
  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");

  if (!email || !password) return json({ message: "Email and password are required" }, { status: 400 });

  if (parts[1] === "register") {
    const existing = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (existing.length) return json({ message: "Email already exists" });

    await db.insert(users).values({
      name: String(body.name || "").trim() || email,
      email,
      passwordHash: await hashPassword(password),
    });

    return json({ message: "User registered successfully" });
  }

  if (parts[1] === "login") {
    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (!user) return json({ message: "User not found" });
    if (!await verifyPassword(password, user.passwordHash)) return json({ message: "Invalid password" });
    return json({ message: "Login successful", access_token: await createToken(user), token_type: "bearer" });
  }

  return json({ message: "Not found" }, { status: 404 });
};

const collectionConfig = {
  expenses: {
    table: expenses,
    messageName: "Expense",
    toValues: (body: any, userId: string) => ({
      userId,
      title: String(body.title || "").trim(),
      category: String(body.category || "Others"),
      amount: Number(body.amount || 0),
      date: body.date ? String(body.date) : null,
      notes: body.notes ? String(body.notes) : null,
    }),
  },
  goals: {
    table: goals,
    messageName: "Goal",
    toValues: (body: any, userId: string) => ({
      userId,
      name: String(body.name || "").trim(),
      targetAmount: Number(body.targetAmount || 0),
      currentAmount: Number(body.currentAmount || 0),
      deadline: body.deadline ? String(body.deadline) : null,
    }),
  },
  portfolio: {
    table: portfolio,
    messageName: "Portfolio",
    toValues: (body: any, userId: string) => ({
      userId,
      name: String(body.name || "").trim(),
      type: String(body.type || "Stock"),
      quantity: Number(body.quantity || 0),
      buyPrice: Number(body.buyPrice || 0),
      currentPrice: Number(body.currentPrice || 0),
    }),
  },
} as const;

const collectionHandler = async (req: Request, parts: string[]) => {
  const auth = await requireUser(req);
  if ("response" in auth) return auth.response;

  const name = parts[0] as keyof typeof collectionConfig;
  const id = parts[1];
  const config = collectionConfig[name];

  if (!id && req.method === "GET") {
    const rows = await db.select().from(config.table).where(eq(config.table.userId, auth.user.id));
    return json(rows);
  }

  if (!id && req.method === "POST") {
    const body = await readBody(req);
    await db.insert(config.table).values(config.toValues(body, auth.user.id));
    return json({ message: `${config.messageName} added successfully` }, { status: 201 });
  }

  if (id && req.method === "PUT") {
    const body = await readBody(req);
    await db
      .update(config.table)
      .set(config.toValues(body, auth.user.id))
      .where(and(eq(config.table.id, id), eq(config.table.userId, auth.user.id)));
    return json({ message: `${config.messageName} updated successfully` });
  }

  if (id && req.method === "DELETE") {
    await db.delete(config.table).where(and(eq(config.table.id, id), eq(config.table.userId, auth.user.id)));
    return json({ message: `${config.messageName} deleted successfully` });
  }

  return json({ message: "Method not allowed" }, { status: 405 });
};

export default async (req: Request) => {
  const { pathname } = new URL(req.url);
  const parts = pathname.replace(/^\/api\/?/, "").split("/").filter(Boolean);

  if (parts[0] === "auth") return authHandler(req, parts);
  if (parts[0] in collectionConfig) return collectionHandler(req, parts);

  return json({ message: "Not found" }, { status: 404 });
};

export const config: Config = {
  path: "/api/*",
};
