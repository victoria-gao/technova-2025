"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="fixed top-4 left-4 flex items-center gap-2 px-4 py-2 rounded-md bg-white/90 hover:bg-emerald-100 text-emerald-700 shadow-lg transition z-50 border border-emerald-200"
      aria-label="Go back"
      type="button"
      tabIndex={0}
    >
      <ArrowLeft className="h-5 w-5" aria-hidden="true" />
      <span className="font-semibold">Back</span>
    </button>
  );
}