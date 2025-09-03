import React from "react";
import { X, History, Trash2 } from "lucide-react";
import { Generation } from "../types/types";

interface Props {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
  history: Generation[];
  onRestore: (gen: Generation) => void;
  position?: "left" | "right";
}

const HistorySidebar: React.FC<Props> = ({
  open,
  onClose,
  onOpen,
  history,
  onRestore,
  position = "right",
}) => {
  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed top-0 ${position}-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 z-50
        ${
          open
            ? "translate-x-0"
            : position === "right"
            ? "translate-x-full"
            : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-gradient-to-r from-violet-50 to-purple-50">
          <h2 className="font-semibold text-slate-800 flex items-center gap-2">
            <History className="w-5 h-5 text-violet-600" /> History
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg"
            aria-label="Close history sidebar"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>
        <div className="overflow-y-auto h-full p-4 space-y-3">
          {history.map((item) => (
            <div
              key={item.id}
              className="p-3 border rounded-xl flex gap-3 items-center hover:shadow-sm transition cursor-pointer"
              onClick={() => onRestore(item)}
            >
              <img
                src={item.imageUrl}
                alt="gen"
                className="w-14 h-14 object-cover rounded-lg border"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 truncate">
                  {item.prompt}
                </p>
                <span className="text-xs text-slate-500 capitalize">
                  {item.style}
                </span>
              </div>
              <button
                className="p-1 hover:bg-red-50 rounded-full"
                aria-label="Delete history item"
              >
                <Trash2 className="w-4 h-4 text-slate-400 hover:text-red-500" />
              </button>
            </div>
          ))}
        </div>
      </aside>

      {/* Toggle Button */}
      {history.length > 0 && !open && (
        <button
          onClick={onOpen}
          className={`fixed top-1/2 ${
            position === "right"
              ? "right-0 rounded-l-xl"
              : "left-0 rounded-r-xl"
          } -translate-y-1/2 bg-white border p-4 shadow-md hover:shadow-lg`}
          aria-label="Open history sidebar"
        >
          <History className="w-7 h-7 text-violet-600" />
        </button>
      )}
    </>
  );
};

export default HistorySidebar;
