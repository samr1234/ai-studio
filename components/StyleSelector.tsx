import React from "react";
import { StyleOption } from "../types/types";

interface Props {
  styles: StyleOption[];
  value: string;
  onChange: (val: string) => void;
}

const StyleSelector: React.FC<Props> = ({ styles, value, onChange }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
      <h2 className="text-xl font-semibold mb-4 text-slate-800">Style</h2>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-4 border border-slate-200 rounded-xl focus:border-violet-300 focus:ring-4 focus:ring-violet-100 bg-white text-slate-800"
      >
        {styles.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StyleSelector;
