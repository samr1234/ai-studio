import { Generation } from "../types/types";

export const downscaleImage = (
  file: File,
  maxSize = 1920
): Promise<string | null> => {
  return new Promise((resolve) => {
    const img = new Image();
    const reader = new FileReader();
    reader.onload = (e) => {
      if (!e.target?.result) return resolve(null);
      img.src = e.target.result as string;
    };
    img.onload = () => {
      let { width, height } = img;
      if (width > maxSize || height > maxSize) {
        if (width > height) {
          height = Math.round((height * maxSize) / width);
          width = maxSize;
        } else {
          width = Math.round((width * maxSize) / height);
          height = maxSize;
        }
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL("image/jpeg", 0.9));
    };
    reader.readAsDataURL(file);
  });
};

export const mockApiCall = (
  image: string,
  prompt: string,
  style: string,
  signal: AbortSignal,
  attempt = 1
): Promise<Generation> => {
  return new Promise((resolve, reject) => {
    if (signal.aborted)
      return reject(new DOMException("Aborted", "AbortError"));

    setTimeout(() => {
      if (signal.aborted)
        return reject(new DOMException("Aborted", "AbortError"));

      // Simulate 20% error
      if (Math.random() < 0.2) {
        if (attempt < 3) {
          return resolve(
            mockApiCall(image, prompt, style, signal, attempt + 1)
          );
        }
        return reject({ message: "Model overloaded" });
      }

      const newItem: Generation = {
        id: Date.now().toString(),
        imageUrl: image,
        prompt,
        style,
        createdAt: new Date().toISOString(),
      };
      resolve(newItem);
    }, 1000 + Math.random() * 1000); // 1–2s delay
  });
};
