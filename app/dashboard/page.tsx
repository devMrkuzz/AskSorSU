"use client";

import { useState, useTransition, useRef, useEffect } from "react";
import { findKnowledge } from "@/lib/knowledge";

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

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initial system message
  useEffect(() => {
    setMessages([
      {
        role: "assistant",
        content:
          "Hello! 👋 I’m AskSorSU, your Campus Assistant.\n\nPlease note: AskSorSU currently has no AI Agent yet. Some responses might be incomplete or unavailable. I can only provide information based on the data stored in my knowledge base (such as enrollment, admission, registrar, and campus details). Some answers might also be inaccurate because I can only match keywords from your questions.\n\nFor feedback or bug reports, please contact: send2hire.mark@gmail.com",
        timestamp: Date.now(),
      },
    ]);
  }, []);

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
    <div className="flex flex-col h-screen bg-gradient-to-b from-white to-amber-50 dark:from-gray-900 dark:to-gray-950">
      {/* Header */}
      <header className="p-4 border-b text-center font-bold text-xl bg-white text-[#800000] dark:bg-gray-900 dark:text-amber-200 dark:border-gray-800">
        AskSorSU — Campus Assistant
      </header>

      {/* Quick Questions */}
      <section className="p-4 border-b bg-white dark:bg-gray-900 dark:border-gray-800 shrink-0 overflow-x-auto scrollbar-hide">
        <h2 className="font-semibold mb-3 text-[#800000] dark:text-amber-300">
          Quick Questions
        </h2>
        <div className="flex flex-wrap justify-center sm:justify-start gap-2">
          {quickQuestions.map((q) => (
            <button
              key={q}
              onClick={() => handleAsk(q)}
              disabled={isPending}
              className="bg-[#800000] text-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm md:text-base font-medium hover:bg-[#5a0000] transition disabled:opacity-70 dark:bg-amber-600 dark:hover:bg-amber-500 break-words text-center whitespace-normal"
              style={{ maxWidth: "95%" }}
            >
              {q}
            </button>
          ))}
        </div>
      </section>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4 dark:bg-gray-950">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] sm:max-w-[70%] p-3 rounded-2xl text-sm shadow transition break-words ${
                msg.role === "user"
                  ? "bg-[#800000] text-white rounded-br-none dark:bg-amber-600"
                  : "bg-gray-100 text-gray-800 rounded-bl-none dark:bg-gray-800 dark:text-gray-100"
              }`}
            >
              <p className="whitespace-pre-line">{msg.content}</p>
              <div className="text-[10px] mt-1 opacity-70 text-right">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}

        {isPending && (
          <div className="flex justify-start text-gray-500 dark:text-gray-400 text-sm italic">
            AskSorSU is typing...
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Bar */}
      <form
        onSubmit={handleSubmit}
        className="p-4 border-t bg-white dark:bg-gray-900 dark:border-gray-800 flex gap-3 items-center shrink-0"
      >
        <input
          type="text"
          placeholder="Ask SorSU anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#800000] dark:focus:ring-amber-500"
        />
        <button
          type="submit"
          disabled={isPending}
          className="bg-[#800000] text-white px-5 py-2 rounded-lg hover:bg-[#5a0000] transition disabled:opacity-70 dark:bg-amber-600 dark:hover:bg-amber-500"
        >
          {isPending ? "..." : "Send"}
        </button>
      </form>
    </div>
  );
}
