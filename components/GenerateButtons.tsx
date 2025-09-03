import React from "react";
import { Wand2, X } from "lucide-react";

interface Props {
  isGenerating: boolean;
  onGenerate: () => void;
  onAbort: () => void;
}

const GenerateButtons: React.FC<Props> = ({
  isGenerating,
  onGenerate,
  onAbort,
}) => {
  return (
    <div>
      {isGenerating ? (
        <button
          onClick={onAbort}
          className="w-full py-4 px-6 rounded-xl font-medium text-white bg-red-500 shadow-md hover:shadow-lg transition-all"
        >
          <div className="flex items-center justify-center gap-2">
            <X className="w-5 h-5" /> Abort
          </div>
        </button>
      ) : (
        <button
          onClick={onGenerate}
          className="w-full py-4 px-6 rounded-xl font-medium text-white bg-gradient-to-r from-violet-600 to-purple-600 shadow-md hover:shadow-lg hover:scale-[1.01] transition-all"
        >
          <div className="flex items-center justify-center gap-2">
            <Wand2 className="w-5 h-5" /> Generate
          </div>
        </button>
      )}
    </div>
  );
};

export default GenerateButtons;
