import { useEffect, useState } from "react";

const PortfolioModal = ({ isOpen, onClose, onSave, item }) => {
  const [form, setForm] = useState({
    name: "",
    type: "Stock",
    quantity: "",
    buyPrice: "",
    currentPrice: "",
  });

  useEffect(() => {
    if (item) {
      setForm(item);
    } else {
      setForm({
        name: "",
        type: "Stock",
        quantity: "",
        buyPrice: "",
        currentPrice: "",
      });
    }
  }, [item]);

  if (!isOpen) return null;

  const submit = (e) => {
    e.preventDefault();

    onSave({
      ...form,
      quantity: Number(form.quantity),
      buyPrice: Number(form.buyPrice),
      currentPrice: Number(form.currentPrice),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      <div className="bg-white rounded-2xl p-6 w-full max-w-md">

        <h2 className="text-xl font-bold mb-4">
          {item ? "Edit Asset" : "Add Asset"}
        </h2>

        <form onSubmit={submit} className="space-y-3">

          <input
            className="w-full border p-3 rounded-xl"
            placeholder="Asset Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            required
          />

          <select
            className="w-full border p-3 rounded-xl"
            value={form.type}
            onChange={(e) =>
              setForm({ ...form, type: e.target.value })
            }
          >
            <option>Stock</option>
            <option>Crypto</option>
            <option>Mutual Fund</option>
            <option>Gold</option>
          </select>

          <input
            type="number"
            className="w-full border p-3 rounded-xl"
            placeholder="Quantity"
            value={form.quantity}
            onChange={(e) =>
              setForm({ ...form, quantity: e.target.value })
            }
          />

          <input
            type="number"
            className="w-full border p-3 rounded-xl"
            placeholder="Buy Price"
            value={form.buyPrice}
            onChange={(e) =>
              setForm({ ...form, buyPrice: e.target.value })
            }
          />

          <input
            type="number"
            className="w-full border p-3 rounded-xl"
            placeholder="Current Price"
            value={form.currentPrice}
            onChange={(e) =>
              setForm({ ...form, currentPrice: e.target.value })
            }
          />

          <div className="flex justify-end gap-2 mt-4">

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-xl"
            >
              Cancel
            </button>

            <button className="px-4 py-2 bg-[#1a6b5e] text-white rounded-xl">
              Save
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default PortfolioModal;