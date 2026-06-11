"use client";

import { useRef, useState } from "react";
import { ImagePlus, Loader2 } from "lucide-react";
import { uploadToCloudinary } from "@/lib/cloudinary";

type Props = {
  onUploaded: (url: string) => void;
  label?: string;
  className?: string;
};

export default function ImageUploadButton({
  onUploaded,
  label = "Upload",
  className,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setBusy(true);
    setError("");
    try {
      onUploaded(await uploadToCloudinary(file));
    } catch {
      setError("Upload failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <span className="inline-flex items-center gap-2">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={busy}
        className={
          className ??
          "inline-flex items-center gap-1.5 px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-xl text-xs font-medium text-neutral-300 hover:text-white transition-colors disabled:opacity-60"
        }>
        {busy ? (
          <Loader2 size={14} className="animate-spin" />
        ) : (
          <ImagePlus size={14} />
        )}
        {label}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleFile}
      />
      {error && <span className="text-xs text-red-400">{error}</span>}
    </span>
  );
}
