import React from "react";

interface Props {
  value: string;
  onChange: (val: string) => void;
}

const PromptSection: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
      <h2 className="text-xl font-semibold mb-4 text-slate-800">Prompt</h2>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        maxLength={500}
        placeholder="Describe the style or transformation you want..."
        className="w-full p-4 rounded-xl border border-slate-200 focus:border-violet-300 focus:ring-4 focus:ring-violet-100 resize-none text-slate-800 outline-none"
      />
      <div className="flex justify-between mt-2 text-sm text-slate-500">
        <span>Be specific for better results</span>
        <span>{value.length}/500</span>
      </div>
    </div>
  );
};

export default PromptSection;
