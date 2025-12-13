"use client";

import { useState, useEffect } from "react";
import { account } from "@/lib/appwrite";
import { useRouter } from "next/navigation";

// ✅ Reusable Modal Component
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

export default function AuthenticationPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState<"success" | "error" | "info">(
    "info"
  );

  // ✅ Automatically redirect if already logged in
  useEffect(() => {
    const checkSession = async () => {
      try {
        await account.getSession("current");
        router.push("/dashboard");
      } catch {
        // no session
      }
    };
    checkSession();
  }, [router]);

  // ✅ Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await account.deleteSession("current").catch(() => {});
      await account.createEmailPasswordSession(email, password);
      router.push("/dashboard");
    } catch (err: any) {
      setModalMessage(
        err.message || "Login failed. Please check your credentials."
      );
      setModalType("error");
      setModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Registration handler
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await account.create("unique()", email, password, name);
      setModalMessage("Account created successfully! You can now log in.");
      setModalType("success");
      setModalOpen(true);
      setIsRegistering(false);
    } catch (err: any) {
      setModalMessage(err.message || "Failed to create account.");
      setModalType("error");
      setModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Forgot password handler
  const handleForgotPassword = async () => {
    if (!email) {
      setModalMessage("Please enter your email first.");
      setModalType("error");
      setModalOpen(true);
      return;
    }

    try {
      await account.createRecovery(
        email,
        "https://ask-sor-1i68izwp4-send2hiremark-4461s-projects.vercel.app/forgot-password"
      );
      setModalMessage("Password reset link sent to your email.");
      setModalType("success");
      setModalOpen(true);

      setTimeout(() => {
        setModalOpen(false);
        setModalMessage("");
      }, 2500);
    } catch (err: any) {
      setModalMessage(err.message || "Failed to send password reset link.");
      setModalType("error");
      setModalOpen(true);
    }
  };

  // ✅ Google Sign-In
  const handleGoogleSignin = async () => {
    try {
      await account.deleteSession("current");
    } catch {}
    account.createOAuth2Session(
      "google" as any,
      "https://ask-sor-1i68izwp4-send2hiremark-4461s-projects.vercel.app/dashboard",
      "https://ask-sor-1i68izwp4-send2hiremark-4461s-projects.vercel.app/authentication"
    );
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-amber-50 text-slate-800 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-[#800000] mb-4">
          {isRegistering ? "Create an Account" : "Welcome to AskSorSU"}
        </h1>
        <p className="text-sm mb-6 text-slate-600">
          {isRegistering
            ? "Sign up using your email to create a new account."
            : "Sign in with your Google account or email credentials."}
        </p>

        <form
          onSubmit={isRegistering ? handleRegister : handleLogin}
          className="space-y-4 text-left"
        >
          {isRegistering && (
            <div>
              <label htmlFor="name" className="block mb-1 font-medium">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block mb-1 font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#800000] text-white py-2 rounded hover:bg-[#5a0000] transition disabled:opacity-70"
          >
            {loading
              ? isRegistering
                ? "Creating account..."
                : "Signing in..."
              : isRegistering
              ? "Sign Up"
              : "Sign In"}
          </button>
        </form>

        {!isRegistering && (
          <button
            onClick={handleForgotPassword}
            className="mt-3 text-[#800000] underline text-sm hover:text-[#5a0000]"
          >
            Forgot Password?
          </button>
        )}

        <div className="mt-4">
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-sm text-slate-600 hover:text-[#800000]"
          >
            {isRegistering
              ? "Already have an account? Sign in"
              : "Don't have an account? Create one"}
          </button>
        </div>

        <div className="mt-6 border-t pt-4">
          <button
            onClick={handleGoogleSignin}
            className="w-full bg-white border border-gray-300 py-2 rounded hover:bg-gray-50 transition text-[#800000] font-medium"
          >
            Continue with Google
          </button>
        </div>
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
