"use client";

import { useState, useTransition, useRef, useEffect } from "react";
import { findKnowledge } from "@/lib/knowledge"; // ✅ from shared lib

type Message = {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
};

export default function DashboardPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isPending, startTransition] = useTransition();
  const chatEndRef = useRef<HTMLDivElement>(null);

  // ✅ Auto-scroll to the bottom when new message appears
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const quickQuestions = [
    "When is enrollment for 2026?",
    "What are the admission requirements?",
    "How can I shift to another program?",
    "Where can I get my TOR or Transcript?",
    "What scholarships are available at SorSU?",
    "What is the mission and vision of SorSU?",
    "When was Sorsogon State University established?",
  ];

  const handleAsk = (question: string) => {
    const userMsg: Message = {
      role: "user",
      content: question,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);

    startTransition(async () => {
      try {
        const answer = await findKnowledge(question);

        const botMsg: Message = {
          role: "assistant",
          content: answer,
          timestamp: Date.now(),
        };

        setMessages((prev) => [...prev, botMsg]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Sorry, something went wrong while fetching the answer.",
            timestamp: Date.now(),
          },
        ]);
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleAsk(input.trim());
    setInput("");
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-white to-amber-50 overflow-hidden">
      {/* Header */}
      <header className="p-4 border-b text-center text-[#800000] font-bold text-xl bg-white">
        AskSorSU — Campus Assistant
      </header>

      {/* Quick Question Buttons (fixed height section) */}
      <section className="p-4 border-b bg-white shrink-0">
        <h2 className="font-semibold mb-2 text-[#800000]">Quick Questions</h2>
        <div className="flex flex-wrap gap-3">
          {quickQuestions.map((q) => (
            <button
              key={q}
              onClick={() => handleAsk(q)}
              disabled={isPending}
              className="bg-[#800000] text-white px-4 py-2 rounded-full text-sm hover:bg-[#5a0000] transition disabled:opacity-70"
            >
              {q}
            </button>
          ))}
        </div>
      </section>

      {/* Chat Area (scrollable) */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] p-3 rounded-2xl text-sm shadow ${
                msg.role === "user"
                  ? "bg-[#800000] text-white rounded-br-none"
                  : "bg-gray-100 text-gray-800 rounded-bl-none"
              }`}
            >
              {msg.content}
              <div className="text-[10px] mt-1 opacity-70">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
        {isPending && (
          <div className="flex justify-start text-gray-500 text-sm italic">
            AskSorSU is typing...
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Bar (fixed bottom) */}
      <form
        onSubmit={handleSubmit}
        className="p-4 border-t bg-white flex gap-3 items-center shrink-0"
      >
        <input
          type="text"
          placeholder="Ask SorSU anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#800000]"
        />
        <button
          type="submit"
          disabled={isPending}
          className="bg-[#800000] text-white px-5 py-2 rounded-lg hover:bg-[#5a0000] transition disabled:opacity-70"
        >
          {isPending ? "..." : "Send"}
        </button>
      </form>
    </div>
  );
}
