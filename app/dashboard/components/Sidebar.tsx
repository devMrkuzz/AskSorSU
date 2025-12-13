"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Plus, LogOut, X } from "lucide-react";
import { account } from "@/lib/appwrite";

export default function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [chats, setChats] = useState<string[]>([
    "Enrollment Inquiry",
    "Document Request",
  ]);
  const router = useRouter();

  const handleLogout = async () => {
    await account.deleteSession("current");
    router.push("/authentication");
  };

  const handleNewChat = () => {
    setChats((prev) => [`New Chat ${prev.length + 1}`, ...prev]);
  };

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      <aside
        className={`fixed md:static z-50 h-screen w-64 bg-[#1E1E1E] text-white flex flex-col transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <h1 className="text-lg font-semibold">AskSorSU</h1>

          <div className="flex gap-2">
            <button
              onClick={handleNewChat}
              className="p-2 hover:bg-gray-700 rounded"
              title="New Chat"
            >
              <Plus size={18} />
            </button>

            <button
              onClick={onClose}
              className="md:hidden p-2 hover:bg-gray-700 rounded"
              title="Close sidebar"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2">
          {chats.map((chat, i) => (
            <button
              key={i}
              className="w-full text-left px-3 py-2 bg-[#2A2A2A] hover:bg-[#383838] rounded text-sm truncate"
            >
              {chat}
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-[#800000] hover:bg-[#5a0000] py-2 rounded text-sm"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>
    </>
  );
}
