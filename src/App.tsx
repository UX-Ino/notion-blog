"use client";
import { ProfileSection } from "./components/ProfileSection";
import { MainContent } from "./components/MainContent";

export type ViewKey = "home" | "diary" | "photos" | "guestbook" | "admin";

export default function App({ initialView = "home" }: { initialView?: ViewKey }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      {/* 싸이월드 스타일 배경 패턴 */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-4 h-4 bg-purple-500 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-6 h-6 bg-pink-500 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-40 w-5 h-5 bg-blue-500 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-20 w-3 h-3 bg-cyan-500 rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[320px_1fr] gap-8">
          {/* 좌측: 프로필 섹션 (미니홈피 스타일) */}
          <div className="lg:sticky lg:top-17 lg:h-fit">
            <ProfileSection />
          </div>

          {/* 우측: 메인 콘텐츠 */}
          <div className="min-h-screen">
            <MainContent initialView={initialView} />
          </div>
        </div>
      </div>

      {/* BGM 컨트롤 (장식용) */}
      <div className="fixed bottom-4 right-4 z-20">
        <div className="bg-slate-800/90 backdrop-blur-sm rounded-full p-3 shadow-lg border border-slate-700">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-purple-400">🎵</span>
            <span className="text-slate-300 hidden sm:inline">추억의 BGM</span>
            <button className="text-purple-400 hover:text-purple-300 transition-colors">⏸️</button>
          </div>
        </div>
      </div>

      {/* 하단 카피라이트 */}
      <footer className="relative z-10 text-center py-8 text-sm text-slate-400">
        <div className="container mx-auto px-4">
          <p>Made with 💜 • Inspired by Cyworld • Powered by React & TypeScript</p>
        </div>
      </footer>
    </div>
  );
}
