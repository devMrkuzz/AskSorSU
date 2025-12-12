"use client";
import { useState } from "react";
import { Send } from "lucide-react";

export default function MessageInput({
  onSend,
}: {
  onSend: (msg: string) => void;
}) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border-t border-gray-300 bg-white flex gap-2"
    >
      <input
        type="text"
        placeholder="Type your message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#800000]"
      />
      <button
        type="submit"
        title="Send message"
        className="bg-[#800000] text-white px-4 py-2 rounded-lg hover:bg-[#5a0000] transition"
      >
        <Send size={18} />
      </button>
    </form>
  );
}
