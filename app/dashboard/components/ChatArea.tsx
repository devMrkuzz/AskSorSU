import React from "react";

export default function ChatArea({ messages, isTyping }: any) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#fffdf9]">
      {messages.map((msg: any, i: number) => (
        <div
          key={i}
          className={`flex ${
            msg.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-[75%] p-3 rounded-2xl shadow-sm ${
              msg.role === "user"
                ? "bg-[#800000] text-white rounded-br-none"
                : "bg-gray-100 text-gray-800 rounded-bl-none"
            }`}
          >
            <p className="whitespace-pre-line">{msg.content}</p>
            <span className="block text-[10px] text-gray-500 mt-1 text-right">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </span>
          </div>
        </div>
      ))}

      {isTyping && (
        <div className="flex justify-start">
          <div className="bg-gray-200 text-gray-600 rounded-2xl px-3 py-2">
            AskSorSU is typing...
          </div>
        </div>
      )}
    </div>
  );
}
