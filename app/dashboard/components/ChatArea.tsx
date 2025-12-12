"use client";
import { useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatArea({ messages }: { messages: Message[] }) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#F7F7F8]">
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`flex ${
            msg.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-[75%] px-4 py-2 rounded-2xl ${
              msg.role === "user"
                ? "bg-[#800000] text-white"
                : "bg-white border border-gray-300 text-gray-800"
            }`}
          >
            {msg.content}
          </div>
        </div>
      ))}
      <div ref={bottomRef}></div>
    </div>
  );
}
