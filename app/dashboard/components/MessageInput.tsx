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
      className="p-3 border-t bg-white flex gap-2 sticky bottom-0"
    >
      <input
        type="text"
        placeholder="Ask AskSorSU anything..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 rounded-full border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#800000]"
      />
      <button
        type="submit"
        title="Send message"
        className="bg-[#800000] text-white rounded-full p-3 hover:bg-[#5a0000]"
      >
        <Send size={18} />
      </button>
    </form>
  );
}
