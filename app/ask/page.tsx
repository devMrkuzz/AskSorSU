"use client";

import { useState } from "react";
import { findKnowledge } from "./actions";

export default function AskSorSUPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle when user submits a question
  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!question.trim()) return;

    setLoading(true);
    setAnswer("");

    try {
      const res = await findKnowledge(question); // Fetch answer from database
      setAnswer(res);
    } catch (err: any) {
      setAnswer("Sorry, something went wrong while fetching the answer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-amber-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-[#800000] mb-6 text-center">
          AskSorSU — Your Campus Assistant
        </h1>

        {/* Question Input */}
        <form onSubmit={handleAsk} className="flex gap-3 mb-4">
          <input
            type="text"
            placeholder="Ask something about Sorsogon State University..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#800000]"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-[#800000] text-white px-5 py-2 rounded-lg hover:bg-[#5a0000] transition disabled:opacity-70"
          >
            {loading ? "Thinking..." : "Ask"}
          </button>
        </form>

        {/* Answer Output */}
        {answer && (
          <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-gray-800 whitespace-pre-line">{answer}</p>
          </div>
        )}
      </div>
    </main>
  );
}
