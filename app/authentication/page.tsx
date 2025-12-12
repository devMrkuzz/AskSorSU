"use client";

import { useState, useEffect } from "react";
import { account } from "@/lib/appwrite";
import { useRouter } from "next/navigation";

export default function AuthenticationPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // ✅ Automatically redirect if already logged in
  useEffect(() => {
    const checkSession = async () => {
      try {
        await account.getSession("current");
        router.push("/dashboard");
      } catch {
        // no session, stay on login
      }
    };
    checkSession();
  }, [router]);

  // ✅ Login handler with session cleanup
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Delete any existing session before login
      try {
        await account.deleteSession("current");
      } catch {
        // ignore if none
      }

      await account.createEmailPasswordSession(email, password);
      router.push("/dashboard");
    } catch (err: any) {
      alert(err.message || "Login failed. Please check your credentials.");
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
      alert("Account created successfully! You can now log in.");
      setIsRegistering(false);
    } catch (err: any) {
      alert(err.message || "Failed to create account.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Forgot password handler
  const handleForgotPassword = async () => {
    if (!email) return alert("Please enter your email first.");
    try {
      await account.createRecovery(
        email,
        "http://localhost:3000/forgot-password"
      );
      alert("Password reset link sent to your email.");
    } catch (err: any) {
      alert(err.message || "Failed to send password reset link.");
    }
  };

  // ✅ Google Sign-In (safe session cleanup)
  const handleGoogleSignin = async () => {
    try {
      await account.deleteSession("current");
    } catch {
      // ignore if none
    }
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
              placeholder="you@example.com"
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
    </main>
  );
}
