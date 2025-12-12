"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Plus, LogOut } from "lucide-react";
import { account } from "@/lib/appwrite";

export default function Sidebar() {
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
    <aside className="bg-[#1E1E1E] text-white w-64 flex flex-col h-screen">
      <div className="p-4 border-b border-gray-700 flex justify-between items-center">
        <h1 className="text-lg font-semibold">AskSorSU</h1>
        <button
          onClick={handleNewChat}
          className="p-2 hover:bg-gray-700 rounded"
          title="New Chat"
        >
          <Plus size={18} />
        </button>
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
  );
}
