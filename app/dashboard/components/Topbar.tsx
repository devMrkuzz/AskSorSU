"use client";
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { account } from "@/lib/appwrite";

export default function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    account
      .get()
      .then(setUser)
      .catch(() => {});
  }, []);

  return (
    <header className="w-full bg-white border-b px-4 py-3 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded hover:bg-gray-100"
          title="Toggle menu"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-lg font-semibold text-[#800000]">
          AskSorSU Dashboard
        </h1>
      </div>

      {user && (
        <div className="flex items-center gap-3">
          <span className="hidden sm:block font-medium">
            {user.name || user.email}
          </span>
          <div className="w-9 h-9 flex items-center justify-center rounded-full bg-[#800000] text-white font-bold">
            {user.name ? user.name[0].toUpperCase() : "U"}
          </div>
        </div>
      )}
    </header>
  );
}
