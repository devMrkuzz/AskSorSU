"use client";
import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  type?: "success" | "error" | "info";
}

export default function Modal({
  isOpen,
  onClose,
  title = "Notification",
  message,
  type = "info",
}: ModalProps) {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  const color =
    type === "success"
      ? "text-green-600"
      : type === "error"
      ? "text-red-600"
      : "text-[#800000]";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/40 backdrop-blur-sm z-50">
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
