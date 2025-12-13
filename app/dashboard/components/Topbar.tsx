"use client";
import { useEffect, useState } from "react";
import { Menu, Moon, Sun } from "lucide-react";
import { account } from "@/lib/appwrite";

export default function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  const [user, setUser] = useState<any>(null);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    account
      .get()
      .then(setUser)
      .catch(() => {});
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header className="w-full bg-white dark:bg-neutral-900 border-b px-4 py-3 flex justify-between items-center">
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded hover:bg-gray-100 dark:hover:bg-neutral-800"
          title="Toggle menu"
        >
          <Menu size={20} />
        </button>

        <h1 className="text-lg font-semibold text-[#800000]">AskSorSU</h1>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {/* Dark mode toggle */}
        <button
          onClick={() => setDark(!dark)}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-neutral-800"
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* User info */}
        {user && (
          <div className="flex items-center gap-3">
            {/* Name / Email */}
            <span className="hidden sm:block text-sm font-medium">
              {user.name || user.email}
            </span>

            {/* Avatar */}
            <div className="w-9 h-9 flex items-center justify-center rounded-full bg-[#800000] text-white font-bold">
              {(user.name || user.email)?.[0]?.toUpperCase()}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
