"use client";
import { useEffect, useState } from "react";
import ChatArea from "./components/ChatArea";
import MessageInput from "./components/MessageInput";

type Message = {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
};

export default function DashboardPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  // Load saved chat
  useEffect(() => {
    const saved = localStorage.getItem("asksorsu-chat");
    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      setMessages([
        {
          role: "assistant",
          content:
            "Hello! 👋 I’m **AskSorSU**, your AI-powered campus registrar assistant.\n\nI can help you with:\n• Enrollment inquiries\n• Document & transcript requests\n• Registrar policies\n• Campus-related questions\n\nHow can I assist you today?",
          timestamp: Date.now(),
        },
      ]);
    }
  }, []);

  // Save chat
  useEffect(() => {
    localStorage.setItem("asksorsu-chat", JSON.stringify(messages));
  }, [messages]);

  const handleSend = (text: string) => {
    const userMsg: Message = {
      role: "user",
      content: text,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const botMsg: Message = {
        role: "assistant",
        content: "Thanks for your question! I’m checking that for you now 😊",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-full">
      <ChatArea messages={messages} isTyping={isTyping} />
      <MessageInput onSend={handleSend} />
    </div>
  );
}
