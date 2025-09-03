"use client";
import { useRef } from "react";
import { Upload, Image as ImageIcon, Check } from "lucide-react";

interface UploadProps {
  uploadedImage: string | null;
  onUpload: (file: File) => void;
}

export default function UploadSection({ uploadedImage, onUpload }: UploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onUpload(file);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
      <h2
        className="text-xl font-semibold mb-4 flex items-center gap-2 text-slate-800"
        id="upload-label"
      >
        <Upload className="w-5 h-5 text-violet-600" /> Upload Image
      </h2>
      <div
        onClick={() => fileInputRef.current?.click()}
        role="button"
        aria-labelledby="upload-label"
        tabIndex={0}
        className={`rounded-xl border-2 border-dashed p-8 text-center cursor-pointer transition-all hover:border-violet-400 hover:bg-violet-50 ${
          uploadedImage
            ? "border-violet-300 bg-violet-50"
            : "border-slate-300"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        {uploadedImage ? (
          <div className="flex flex-col items-center space-y-2">
            <Check className="w-8 h-8 text-violet-600" />
            <p className="font-medium text-violet-700">Image uploaded</p>
            <span className="text-sm text-slate-500">Click to replace</span>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-2">
            <ImageIcon className="w-12 h-12 text-slate-400" />
            <p className="font-medium text-slate-600">Drop or click to browse</p>
            <span className="text-sm text-slate-500">PNG or JPG, up to 10MB</span>
          </div>
        )}
      </div>
    </div>
  );
}
