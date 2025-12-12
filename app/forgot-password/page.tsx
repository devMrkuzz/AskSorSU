"use client";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { Suspense, useEffect, useState } from "react";
import { account } from "@/lib/appwrite";
import { useRouter, useSearchParams } from "next/navigation";

// Modal Component
function Modal({
  isOpen,
  onClose,
  title = "Notification",
  message,
  type = "info",
}: {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  type?: "success" | "error" | "info";
}) {
  if (!isOpen) return null;

  const color =
    type === "success"
      ? "text-green-600"
      : type === "error"
      ? "text-red-600"
      : "text-[#800000]";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/40 bg-blur-sm z-50">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-96 text-center border border-gray-200">
        <h2 className={`text-xl font-semibold mb-3 ${color}`}>{title}</h2>
        <p className="text-gray-700 mb-5">{message}</p>
        <button
          onClick={onClose}
          className="w-full bg-[#800000] text-white py-2 rounded hover:bg-[#600000] transition"
        >
          OK
        </button>
      </div>
    </div>
  );
}

// ✅ Wrapper (for Next.js 16 Suspense)
export default function ForgotPasswordPageWrapper() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-[#800000]">
          Loading...
        </div>
      }
    >
      <ForgotPasswordPage />
    </Suspense>
  );
}

// ✅ Main Forgot Password Page
function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"request" | "reset">("request");
  const [userId, setUserId] = useState("");
  const [secret, setSecret] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState<"success" | "error" | "info">(
    "info"
  );

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

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await account.createRecovery(
        email,
        `${window.location.origin}/forgot-password`
      );
      setModalMessage("Password reset link sent! Please check your inbox.");
      setModalType("success");
      setModalOpen(true);
    } catch (error: any) {
      setModalMessage(error.message || "Failed to send reset link.");
      setModalType("error");
      setModalOpen(true);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !secret) {
      setModalMessage("Invalid or expired password reset link.");
      setModalType("error");
      setModalOpen(true);
      return;
    }

    try {
      await account.updateRecovery(userId, secret, password);
      setModalMessage("Password updated successfully!");
      setModalType("success");
      setModalOpen(true);

      // Redirect to login page after closing modal
      setTimeout(() => router.push("/authentication"), 2500);
    } catch (error: any) {
      setModalMessage(error.message || "Failed to update password.");
      setModalType("error");
      setModalOpen(true);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md border rounded-xl p-6 bg-white shadow-lg">
        {mode === "request" ? (
          <>
            <h1 className="text-2xl font-bold text-[#800000] mb-4">
              Forgot Password
            </h1>
            <p className="text-sm text-gray-600 mb-4">
              Enter your email address to receive a password reset link.
            </p>
            <form onSubmit={handleRequestReset} className="space-y-4">
              <input
                type="email"
                placeholder="you@email.com"
                className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-[#800000]"
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
                className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-[#800000]"
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

      {/* ✅ Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        message={modalMessage}
        type={modalType}
      />
    </main>
  );
}
