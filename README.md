# 🎨 AI Studio - Image Generation App

A beautiful, modern React application built with Next.js and TypeScript that simulates an AI-powered image generation studio. Transform your images with various artistic styles through an intuitive, accessible interface.

<!-- ![AI Studio Preview](https://via.placeholder.com/800x400/6366f1/ffffff?text=AI+Studio+Preview) -->

## ✨ Features

### 🖼️ **Image Management**

- ✅ **File upload with preview** - Drag & drop or click to upload PNG/JPG images
- ✅ **Smart client-side resizing** - Automatically downscales large images (>10MB) to ≤1920px
- ✅ **Real-time preview** - Live summary showing uploaded image + prompt + selected style
- ✅ **Format validation** - Supports PNG and JPG formats with proper error handling

### 🎯 **AI Generation Simulation**

- ✅ **Mock API with realistic delays** - Simulates 1.5-2.5 second generation times
- ✅ **20% error rate simulation** - Tests error handling with "Model overloaded" responses
- ✅ **Exponential backoff retry** - Automatically retries failed requests (max 3 attempts)
- ✅ **Abort functionality** - Cancel in-flight requests with proper cleanup

### 🎨 **Style Options**

- **Editorial** - Clean, professional aesthetic
- **Streetwear** - Urban, contemporary style
- **Vintage** - Classic, timeless look
- **Minimalist** - Simple, elegant design
- **Artistic** - Creative, expressive mood

### 💾 **Persistent History**

- ✅ **localStorage integration** - Saves last 5 generations locally
- ✅ **Click to restore** - Load previous generations back into the editor
- ✅ **Generation metadata** - Stores prompt, style, and creation timestamp

### ♿ **Accessibility & UX**

- ✅ **Full keyboard navigation** - Tab through all interactive elements
- ✅ **ARIA labels and roles** - Screen reader friendly
- ✅ **Visible focus states** - Clear focus indicators throughout
- ✅ **Error handling** - Comprehensive validation and user feedback
- ✅ **Loading states** - Visual feedback during operations

### 🎨 **Premium UI Design**

- **Modern gradient backgrounds** with smooth color transitions
- **Glassmorphism cards** with subtle shadows and borders
- **Smooth hover animations** and micro-interactions
- **Professional color scheme** using violet/purple accents
- **Responsive layout** that works on desktop and mobile
- **Clean typography** with proper spacing and hierarchy

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn package manager

### Installation

1. **Clone or download the project**

   ```bash
   # If you have the project in a repository
   git clone <your-repository-url>
   cd ai-studio

   # Or create a new Next.js project
   npx create-next-app@latest ai-studio --typescript --tailwind --eslint
   cd ai-studio
   ```

2. **Install dependencies**

   ```bash
   npm install lucide-react
   ```

3. **Add the AI Studio component**

   Create `components/AIStudio.tsx` and paste the TypeScript component code.

4. **Update your main page**

   Replace the content in `app/page.tsx` (App Router) or `pages/index.tsx` (Pages Router):

   ```typescript
   import AIStudio from "../components/AIStudio";

   export default function Home() {
     return (
       <main>
         <AIStudio />
       </main>
     );
   }
   ```

### Development

```bash
# Start the development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Run type checking
npx tsc --noEmit
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## 🛠️ Technology Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS for responsive design
- **Icons**: Lucide React for beautiful, consist
