"use client";

import { useState, useEffect, useRef } from "react";
import UploadSection from "./UploadSection";
import PromptSection from "./Prompt";

import { downscaleImage, mockApiCall } from "../utils/util";
import { StyleOption, Generation } from "../types/types";
import HistorySidebar from "./HistorySidebar";
import StyleSelector from "./StyleSelector";
import PreviewSection from "./Preview";
import GenerateButtons from "./GenerateButtons";

const styles: StyleOption[] = [
  { value: "editorial", label: "Editorial" },
  { value: "streetwear", label: "Streetwear" },
  { value: "vintage", label: "Vintage" },
];

export default function AIStudio() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState(styles[0].value);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentGen, setCurrentGen] = useState<Generation | null>(null);
  const [history, setHistory] = useState<Generation[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const abortControllerRef = useRef<AbortController | null>(null);

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("ai-gen-history");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  // Save history to localStorage
  useEffect(() => {
    localStorage.setItem("ai-gen-history", JSON.stringify(history));
  }, [history]);

  const handleUpload = async (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      alert("File too large (max 10MB).");
      return;
    }
    const downscaled = await downscaleImage(file);
    if (downscaled) setUploadedImage(downscaled);
  };

  const handleGenerate = async () => {
    if (!uploadedImage || !prompt) {
      alert("Please upload an image and enter a prompt.");
      return;
    }
    setIsGenerating(true);
    abortControllerRef.current = new AbortController();

    try {
      const gen = await mockApiCall(
        uploadedImage,
        prompt,
        selectedStyle,
        abortControllerRef.current.signal
      );
      setCurrentGen(gen);

      // Save only last 5
      setHistory((prev) => [gen, ...prev].slice(0, 5));
    } catch (err: any) {
      if (err.name === "AbortError") {
        console.log("Request aborted");
      } else {
        alert(err.message || "Failed to generate");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAbort = () => {
    abortControllerRef.current?.abort();
    setIsGenerating(false);
  };

  const handleRestore = (gen: Generation) => {
    setUploadedImage(gen.imageUrl);
    setPrompt(gen.prompt);
    setSelectedStyle(gen.style);
    setCurrentGen(gen);
    setSidebarOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <HistorySidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onOpen={() => setSidebarOpen(true)}
        history={history}
        onRestore={handleRestore}
        position="left" // or "right"
      />

      {/* Main Content */}
      <div className="flex-1">
        <header className="py-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
            AI Studio
          </h1>
          <p className="text-slate-600 mt-2 text-lg">
            Transform your images with AI-powered style generation
          </p>
        </header>

        <main className="container mx-auto px-4 pb-20 max-w-6xl grid lg:grid-cols-2 gap-8">
          {/* Controls */}

          <section className="space-y-6">
            <UploadSection
              uploadedImage={uploadedImage}
              onUpload={handleUpload}
            />
            <PromptSection value={prompt} onChange={setPrompt} />
            <StyleSelector
              styles={styles}
              value={selectedStyle}
              onChange={setSelectedStyle}
            />
            <GenerateButtons
              isGenerating={isGenerating}
              onGenerate={handleGenerate}
              onAbort={handleAbort}
            />
          </section>

          {/* Preview */}
          <section>
            <PreviewSection
              uploadedImage={uploadedImage}
              prompt={prompt}
              style={selectedStyle}
              currentGen={currentGen}
            />
          </section>
        </main>
      </div>
    </div>
  );
}
