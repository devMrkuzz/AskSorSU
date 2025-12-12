"use client";
import { useState } from "react";
import { account } from "@/lib/appwrite";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await account.create("unique()", email, password, name);
      setMessage("Account created successfully! You can now log in.");
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-amber-50">
      <div className="border rounded-lg shadow p-6 bg-white max-w-md w-full">
        <h1 className="text-2xl font-semibold mb-4 text-[#800000]">Sign Up</h1>
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border rounded px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-[#800000] text-white py-2 rounded hover:bg-[#5a0000]"
          >
            Create Account
          </button>
        </form>
        {message && <p className="mt-4 text-sm text-slate-700">{message}</p>}
      </div>
    </main>
  );
}
