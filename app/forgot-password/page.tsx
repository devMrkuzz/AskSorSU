"use client";

import { useState, useEffect } from "react";
import { account } from "@/lib/appwrite";
import { useRouter, useSearchParams } from "next/navigation";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"request" | "reset">("request");
  const [userId, setUserId] = useState("");
  const [secret, setSecret] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  // ✅ Wrap useSearchParams inside useEffect to avoid SSR error
  useEffect(() => {
    if (typeof window === "undefined") return;

    const id = searchParams.get("userId") || "";
    const s = searchParams.get("secret") || "";

    if (id && s) {
      setMode("reset");
      setUserId(id);
      setSecret(s);
    }
  }, [searchParams]);

  // Request password reset email
  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await account.createRecovery(
        email,
        // ✅ Use production-safe base URL (auto works on Vercel)
        `${window.location.origin}/forgot-password`
      );
      alert("Password reset email sent! Please check your inbox.");
    } catch (error: any) {
      alert(error.message || "Failed to send reset link.");
    }
  };

  // Perform password update
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !secret) return alert("Invalid or expired password link.");

    try {
      await account.updateRecovery(userId, secret, password);
      alert("Password updated successfully! Please log in again.");
      router.push("/authentication");
    } catch (error: any) {
      alert(error.message || "Failed to update password.");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md border rounded-lg p-6 shadow bg-white">
        {mode === "request" ? (
          <>
            <h1 className="text-2xl font-semibold mb-4 text-[#800000]">
              Forgot Password
            </h1>
            <p className="text-sm mb-4 text-gray-600">
              Enter your email and we’ll send you a password reset link.
            </p>
            <form onSubmit={handleRequestReset} className="space-y-4">
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border px-3 py-2 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="w-full bg-[#800000] text-white py-2 rounded hover:bg-[#600000]"
              >
                Send Reset Link
              </button>
            </form>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-semibold mb-4 text-[#800000]">
              Reset Password
            </h1>
            <form onSubmit={handleResetPassword} className="space-y-4">
              <input
                type="password"
                placeholder="Enter new password"
                className="w-full border px-3 py-2 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="submit"
                className="w-full bg-[#800000] text-white py-2 rounded hover:bg-[#600000]"
              >
                Update Password
              </button>
            </form>
          </>
        )}
      </div>
    </main>
  );
}
