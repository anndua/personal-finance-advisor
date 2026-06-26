import { FaBell } from "react-icons/fa";

const Navbar = () => {
  return (
    <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center">

      <input
        type="text"
        placeholder="Search..."
        className="w-80 px-4 py-2 rounded-xl border border-slate-300"
      />

      <div className="flex items-center gap-5">

        <FaBell
          size={18}
          className="text-slate-500 cursor-pointer"
        />

        <div className="text-right">
          <h3 className="font-semibold">
            Abhishek P S
          </h3>
          <p className="text-xs text-slate-500">
            Personal Finance Advisor
          </p>
        </div>

        <div className="h-10 w-10 rounded-full bg-[#1a6b5e] text-white flex items-center justify-center">
          A
        </div>

      </div>

    </header>
  );
};

export default Navbar;