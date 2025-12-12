"use client";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

import { useState, useEffect, Suspense } from "react";
import { account } from "@/lib/appwrite";
import { useRouter, useSearchParams } from "next/navigation";

// --- Wrapper required for useSearchParams ---
export default function ForgotPasswordPageWrapper() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen text-[#800000]">
          Loading...
        </div>
      }
    >
      <ForgotPasswordPage />
    </Suspense>
  );
}

// --- Main Component ---
function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"request" | "reset">("request");
  const [userId, setUserId] = useState("");
  const [secret, setSecret] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  // Detect reset mode from query params (client-side only)
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

  // Handle "forgot password" request (send email)
  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await account.createRecovery(
        email,
        `${window.location.origin}/forgot-password`
      );
      alert("Password reset email sent! Please check your inbox.");
    } catch (error: any) {
      alert(error.message || "Failed to send password reset link.");
    }
  };

  // Handle password update (via reset link)
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !secret) {
      alert("Invalid or expired reset link.");
      return;
    }

    try {
      await account.updateRecovery(userId, secret, password);
      alert("Password updated successfully! You can now log in.");
      router.push("/authentication");
    } catch (error: any) {
      alert(error.message || "Failed to update password.");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white border rounded-xl shadow-lg p-6">
        {mode === "request" ? (
          <>
            <h1 className="text-2xl font-bold text-[#800000] mb-4">
              Forgot Password
            </h1>
            <p className="text-sm text-gray-600 mb-4">
              Enter your email below and we’ll send you a link to reset your
              password.
            </p>

            <form onSubmit={handleRequestReset} className="space-y-4">
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#800000]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="w-full bg-[#800000] text-white py-2 rounded hover:bg-[#600000] transition"
              >
                Send Reset Link
              </button>
            </form>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-[#800000] mb-4">
              Reset Password
            </h1>
            <form onSubmit={handleResetPassword} className="space-y-4">
              <input
                type="password"
                placeholder="Enter new password"
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#800000]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="submit"
                className="w-full bg-[#800000] text-white py-2 rounded hover:bg-[#600000] transition"
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
