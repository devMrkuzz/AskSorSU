"use client";
import { useEffect, useState } from "react";
import { account } from "@/lib/appwrite";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    account
      .get()
      .then((res) => setUser(res))
      .catch(() => router.push("/authentication"));
  }, [router]);

  const handleLogout = async () => {
    await account.deleteSession("current");
    router.push("/authentication");
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white text-slate-800">
      {user ? (
        <>
          <h1 className="text-2xl font-semibold mb-3">
            Welcome, {user.name || user.email}
          </h1>
          <p className="mb-6">You are logged in via Appwrite.</p>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-[#800000] text-white rounded hover:bg-[#5a0000]"
          >
            Logout
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
}
