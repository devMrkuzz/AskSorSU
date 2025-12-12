"use client";
import { useState, useEffect } from "react";
import { account } from "@/lib/appwrite";

export default function Topbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    account
      .get()
      .then(setUser)
      .catch(() => {});
  }, []);

  return (
    <header className="w-full bg-white border-b p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-[#800000]">Dashboard</h1>
      {user && (
        <div className="flex items-center gap-3">
          <span className="font-medium">{user.name || user.email}</span>
          <div className="w-9 h-9 flex items-center justify-center rounded-full bg-[#800000] text-white font-bold">
            {user.name ? user.name[0].toUpperCase() : "U"}
          </div>
        </div>
      )}
    </header>
  );
}
