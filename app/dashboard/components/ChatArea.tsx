"use client";
import { useEffect, useRef } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export default function ChatArea({
  messages,
  isTyping,
}: {
  messages: Message[];
  isTyping: boolean;
}) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 bg-gray-50 dark:bg-neutral-900 space-y-6">
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`flex ${
            msg.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-[85%] md:max-w-[70%] px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap shadow ${
              msg.role === "user"
                ? "bg-[#800000] text-white rounded-br-md"
                : "bg-white dark:bg-neutral-800 dark:text-white border rounded-bl-md"
            }`}
          >
            {msg.content}
            <div className="mt-1 text-[10px] opacity-60 text-right">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </div>
          </div>
        </div>
      ))}

      {isTyping && (
        <div className="flex justify-start">
          <div className="bg-white dark:bg-neutral-800 px-4 py-2 rounded-2xl text-sm italic opacity-70">
            AskSorSU is typing…
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
