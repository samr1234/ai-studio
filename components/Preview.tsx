import React from "react";
import { Image as ImageIcon } from "lucide-react";
import { Generation } from "../types/types";

interface Props {
  uploadedImage: string | null;
  prompt: string;
  style: string;
  currentGen: Generation | null;
}

const PreviewSection: React.FC<Props> = ({
  uploadedImage,
  prompt,
  style,
  currentGen,
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
      <h2 className="text-xl font-semibold mb-4 text-slate-800">Preview</h2>
      <div className="flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 overflow-hidden relative min-h-[300px]">
        {uploadedImage ? (
          <img
            src={currentGen?.imageUrl || uploadedImage}
            alt="Preview"
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="text-center text-slate-400">
            <ImageIcon className="w-12 h-12 mx-auto mb-2" />
            <p>No image uploaded</p>
          </div>
        )}
      </div>
      {/* Summary */}
      {uploadedImage && (
        <div className="mt-4 text-sm text-slate-600">
          <p>
            <span className="font-semibold">Prompt:</span> {prompt || "—"}
          </p>
          <p>
            <span className="font-semibold">Style:</span> {style}
          </p>
        </div>
      )}
    </div>
  );
};

export default PreviewSection;
