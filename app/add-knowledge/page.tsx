"use client";

import { useState } from "react";
import { databases } from "@/lib/appwrite";
import { Permission, Role } from "appwrite";

export default function AddKnowledgePage() {
  const [form, setForm] = useState({
    title: "",
    category: "",
    audience: "",
    question: "",
    answer: "",
    keywords: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        "tb_knowledge",
        "unique()",
        {
          ...form,
          createdBy: "Admin",
          createdAt: new Date().toISOString(),
        },
        [Permission.read(Role.any())]
      );

      setMessage("✅ Knowledge successfully added!");
      setForm({
        title: "",
        category: "",
        audience: "",
        question: "",
        answer: "",
        keywords: "",
      });
    } catch (error: any) {
      setMessage(`❌ Failed to add: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-amber-50 text-slate-800 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold text-[#800000] mb-4">
          Add Knowledge Entry
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
          <input
            name="audience"
            placeholder="Audience (e.g. student, guest)"
            value={form.audience}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          <textarea
            name="question"
            placeholder="Question"
            value={form.question}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 h-20"
            required
          />
          <textarea
            name="answer"
            placeholder="Answer"
            value={form.answer}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 h-20"
            required
          />
          <input
            name="keywords"
            placeholder="Keywords (comma separated)"
            value={form.keywords}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#800000] text-white py-2 rounded hover:bg-[#5a0000] transition disabled:opacity-70"
          >
            {loading ? "Saving..." : "Add Knowledge"}
          </button>
        </form>

        {message && <p className="mt-4 text-center">{message}</p>}
      </div>
    </main>
  );
}
