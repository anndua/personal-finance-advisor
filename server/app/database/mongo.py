from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os
from pathlib import Path

# Walk up from this file to find the .env at the project root
_env_path = Path(__file__).resolve().parents[3] / ".env"
load_dotenv(dotenv_path=_env_path)

MONGO_URI = os.getenv("MONGO_URI")

# tlsAllowInvalidCertificates is a workaround for SSL handshake issues
# with Python 3.14's OpenSSL and MongoDB Atlas. Use Python 3.11/3.12 for production.
client = AsyncIOMotorClient(MONGO_URI, tlsAllowInvalidCertificates=True)
db = client.personal_finance_db