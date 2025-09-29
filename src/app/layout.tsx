export const metadata = {
  title: "Retro Developer Blog PRD",
  description: "Next.js app",
};

import "./globals.css";
import HeaderNav from "./HeaderNav";
import { ProfileSection } from "@/components/ProfileSection";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="bg-gradient-to-b from-slate-900 via-slate-900 to-gray-900 text-slate-200 min-h-screen relative">
        <HeaderNav />

        {/* 앱 배경 장식 */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-20 left-20 w-4 h-4 bg-purple-500 rounded-full animate-pulse" />
          <div className="absolute top-40 right-32 w-6 h-6 bg-pink-500 rounded-full animate-pulse delay-1000" />
          <div className="absolute bottom-32 left-40 w-5 h-5 bg-blue-500 rounded-full animate-pulse delay-2000" />
          <div className="absolute bottom-20 right-20 w-3 h-3 bg-cyan-500 rounded-full animate-pulse delay-500" />
        </div>

        <div className="relative z-10  mx-auto px-4 py-6 ">
          <div className="grid lg:grid-cols-[320px_1fr] gap-8 ming-h-screen">
            <aside className="lg:sticky lg:top-20 lg:h-fit">
              <ProfileSection />
            </aside>
            <main className="min-h-screen">{children}</main>
          </div>
        </div>

        {/* BGM 컨트롤 (장식용) */}
        <div className="fixed bottom-4 right-4 z-20">
          <div className="bg-slate-800/90 backdrop-blur-sm rounded-full p-3 shadow-lg border border-slate-700">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-purple-400">🎵</span>
              <span className="text-slate-300 hidden sm:inline">추억의 BGM</span>
              <button className="text-purple-400 hover:text-purple-300 transition-colors">
                ⏸️
              </button>
            </div>
          </div>
        </div>

        {/* 하단 카피라이트 */}
        <footer className="relative z-10 text-center py-8 text-sm text-slate-400">
          <div className="container mx-auto px-4">
            <p>Made with 💜 • Inspired by Cyworld • Powered by React & TypeScript</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
