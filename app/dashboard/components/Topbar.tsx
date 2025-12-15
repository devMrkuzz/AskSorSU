"use client";
import { useEffect, useRef, useState } from "react";
import { Menu, Moon, Sun, LogOut, User } from "lucide-react";
import { account } from "@/lib/appwrite";
import { useRouter } from "next/navigation";

export default function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  const [user, setUser] = useState<any>(null);
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Fetch user info
  useEffect(() => {
    account
      .get()
      .then(setUser)
      .catch(() => {});
  }, []);

  // Load theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("asksorsu-theme");
    const isDark = savedTheme === "dark";
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  // Save theme preference
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("asksorsu-theme", dark ? "dark" : "light");
  }, [dark]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = async () => {
    await account.deleteSession("current");
    router.push("/authentication");
  };

  return (
    <header className="w-full bg-white dark:bg-neutral-900 border-b dark:border-neutral-800 px-4 py-3 flex justify-between items-center transition-colors duration-200">
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
          title="Toggle menu"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-lg font-semibold text-[#800000] dark:text-amber-400">
          AskSorSU
        </h1>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4 relative" ref={dropdownRef}>
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDark(!dark)}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
          title={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* User */}
        {user && (
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="flex items-center gap-3 focus:outline-none"
          >
            <span className="hidden sm:block text-sm font-medium dark:text-gray-200">
              {user.name || user.email}
            </span>
            <div className="w-9 h-9 flex items-center justify-center rounded-full bg-[#800000] dark:bg-amber-600 text-white font-bold">
              {(user.name || user.email)?.[0]?.toUpperCase()}
            </div>
          </button>
        )}

        {/* DROPDOWN */}
        {open && (
          <div className="absolute right-0 top-14 w-48 bg-white dark:bg-neutral-800 border dark:border-neutral-700 rounded-lg shadow-lg overflow-hidden z-50">
            <button className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-neutral-700 dark:text-gray-200">
              <User size={16} /> Profile
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-neutral-700"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
