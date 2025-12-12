"use client";
import { account } from "@/lib/appwrite";

export default function AuthenticationPage() {
  const handleGoogleSignIn = () => {
    account.createOAuth2Session(
      "google" as any, // or as OAuthProvider
      "http://localhost:3000/dashboard",
      "http://localhost:3000/authentication"
    );
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-amber-50 text-slate-800">
      <div className="border rounded-lg shadow p-6 bg-white max-w-md w-full text-center">
        <h1 className="text-2xl font-semibold mb-4 text-[#800000]">
          Welcome to AskSorSU
        </h1>
        <p className="text-slate-600 mb-6">
          Sign in with your Google account to continue.
        </p>
        <button
          onClick={handleGoogleSignIn}
          className="px-5 py-2 bg-[#800000] text-white font-medium rounded-lg hover:bg-[#5a0000] transition"
        >
          Continue with Google
        </button>
      </div>
    </main>
  );
}
