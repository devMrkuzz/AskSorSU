"use client";
import { useState } from "react";
import ChatArea from "./components/ChatArea";
import MessageInput from "./components/MessageInput";
import Topbar from "./components/Topbar";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function DashboardPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! 👋 I’m **AskSorSU**, your AI-powered campus registrar assistant.\n\nI can help you with:\n• Enrollment inquiries\n• Document and transcript requests\n• Registrar policies\n• Campus-related questions\n\nHow can I assist you today?",
    },
  ]);

  const handleSend = (text: string) => {
    setMessages((prev) => [...prev, { role: "user", content: text }]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Thanks for your message! I’m processing your request now 😊",
        },
      ]);
    }, 800);
  };

  return (
    <div className="flex flex-col h-full">
      <Topbar />
      <ChatArea messages={messages} />
      <MessageInput onSend={handleSend} />
    </div>
  );
}
