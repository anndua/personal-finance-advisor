import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import PortfolioCard from "../components/PortfolioCard";
import PortfolioModal from "../components/PortfolioModal";
import { portfolioAPI } from "../services/api";
import toast from "react-hot-toast";

const Portfolio = () => {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const load = async () => {
    try {
      const res = await portfolioAPI.getAll();
      setItems(res.data);
    } catch {
      toast.error("Failed to load portfolio");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const save = async (data) => {
    try {
      if (editing) {
        await portfolioAPI.update(editing.id, data);
        toast.success("Updated");
      } else {
        await portfolioAPI.create(data);
        toast.success("Added");
      }

      setOpen(false);
      setEditing(null);
      load();
    } catch {
      toast.error("Error saving asset");
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete asset?")) return;

    await portfolioAPI.delete(id);
    toast.success("Deleted");
    load();
  };

  return (
    <MainLayout>
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Portfolio</h1>

        <button
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
          className="bg-[#1a6b5e] text-white px-5 py-2 rounded-xl"
        >
          + Add Asset
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <PortfolioCard
            key={item.id}
            item={item}
            onEdit={(i) => {
              setEditing(i);
              setOpen(true);
            }}
            onDelete={remove}
          />
        ))}
      </div>

      <PortfolioModal
        isOpen={open}
        onClose={() => {
          setOpen(false);
          setEditing(null);
        }}
        onSave={save}
        item={editing}
      />
    </MainLayout>
  );
};

export default Portfolio;