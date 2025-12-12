"use client";
import { useState } from "react";
import { account } from "@/lib/appwrite";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await account.createRecovery(
        email,
        "http://localhost:3000/reset-password"
      );
      setMessage("A password reset link has been sent to your email.");
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-amber-50">
      <div className="border rounded-lg shadow p-6 bg-white max-w-md w-full">
        <h1 className="text-2xl font-semibold mb-4 text-[#800000]">
          Forgot Password
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full border rounded px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-[#800000] text-white py-2 rounded hover:bg-[#5a0000]"
          >
            Send Reset Link
          </button>
        </form>
        {message && <p className="mt-4 text-sm text-slate-700">{message}</p>}
      </div>
    </main>
  );
}
