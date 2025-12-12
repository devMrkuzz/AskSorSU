"use client";
import { useState } from "react";
import ChatArea from "./components/ChatArea";
import MessageInput from "./components/MessageInput";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function DashboardPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi there! I’m AskSorSU — your campus registrar assistant. How can I help today?",
    },
  ]);

  const handleSend = async (text: string) => {
    setMessages((prev) => [...prev, { role: "user", content: text }]);

    // Simulate bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `You said: "${text}". I’ll assist you with that shortly.`,
        },
      ]);
    }, 800);
  };

  return (
    <div className="flex flex-col h-full">
      <ChatArea messages={messages} />
      <MessageInput onSend={handleSend} />
    </div>
  );
}
