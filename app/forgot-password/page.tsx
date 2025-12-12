"use client";

import { useState, useEffect } from "react";
import { account } from "@/lib/appwrite";
import { useSearchParams, useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"request" | "reset">("request");
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    // Detect if this is a password reset link (has userId + secret)
    const userId = searchParams.get("userId");
    const secret = searchParams.get("secret");
    if (userId && secret) setMode("reset");
  }, [searchParams]);

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await account.createRecovery(
        email,
        "http://localhost:3000/forgot-password"
      );
      alert("Password reset email sent! Check your inbox.");
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = searchParams.get("userId")!;
    const secret = searchParams.get("secret")!;

    try {
      await account.updateRecovery(userId, secret, password);
      alert("Password updated successfully!");
      router.push("/authentication");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md border rounded-lg p-6 shadow bg-white">
        {mode === "request" ? (
          <>
            <h1 className="text-2xl font-semibold mb-4">Forgot Password</h1>
            <p className="text-sm mb-4">
              Enter your email and we will send you a password reset link.
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
