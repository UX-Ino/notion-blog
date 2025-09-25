import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Heart, Users, MessageCircle, Calendar } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function ProfileSection() {
  const todayVisitors = 42;
  const totalVisitors = 12834;
  const skillStack = ["React", "TypeScript", "Node.js", "Python", "PostgreSQL"];

  return (
    <div className="space-y-4">
      {/* 미니룸 */}
      <Card className="bg-gradient-to-br from-slate-800 via-gray-800 to-slate-900 border-2 border-slate-700 shadow-lg">
        <div className="p-6 text-center">
          <div className="relative inline-block mb-4">
            <Avatar className="w-20 h-20 border-4 border-slate-600 shadow-lg">
              <AvatarImage src="https://images.unsplash.com/photo-1725800066480-7ccf189e9513?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjBwcm9ncmFtbWluZyUyMGRldmVsb3BlcnxlbnwxfHx8fDE3NTg3NjUyMDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" />
              <AvatarFallback>개발자</AvatarFallback>
            </Avatar>
            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-1 shadow-md">
              ✨
            </div>
          </div>
          
          <h2 className="text-lg mb-2 text-slate-100">레트로 개발자의 미니홈피</h2>
          <p className="text-sm text-slate-300 mb-4">
            안녕하세요! 추억의 싸이월드 감성으로 개발 이야기를 들려드립니다 🌈
          </p>
          
          {/* 방문자 수 */}
          <div className="bg-slate-700/50 rounded-lg p-3 mb-4 border border-slate-600">
            <div className="flex justify-between items-center text-sm">
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4 text-purple-400" />
                <span className="text-slate-300">TODAY</span>
              </span>
              <span className="font-mono text-slate-100">{todayVisitors}</span>
            </div>
            <div className="flex justify-between items-center text-sm mt-1">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-purple-400" />
                <span className="text-slate-300">TOTAL</span>
              </span>
              <span className="font-mono text-slate-100">{totalVisitors.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* 기술 스택 */}
      <Card className="bg-gradient-to-r from-slate-800 to-gray-800 border-2 border-slate-700">
        <div className="p-4">
          <h3 className="mb-3 text-cyan-400 flex items-center gap-2">
            💻 My Tech Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {skillStack.map((skill) => (
              <Badge 
                key={skill} 
                variant="secondary" 
                className="bg-slate-700 text-cyan-300 border border-slate-600 hover:bg-slate-600 transition-colors"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </Card>

      {/* 메뉴 */}
      <Card className="bg-gradient-to-b from-slate-800 to-gray-800 border-2 border-slate-700">
        <div className="p-4">
          <h3 className="mb-3 text-orange-400">📋 Menu</h3>
          <nav className="space-y-2">
            <a href="#" className="block p-2 rounded-lg bg-slate-700/50 hover:bg-slate-600 transition-colors text-sm text-slate-200 hover:text-white">
              🏠 홈
            </a>
            <a href="#" className="block p-2 rounded-lg bg-slate-700/50 hover:bg-slate-600 transition-colors text-sm text-slate-200 hover:text-white">
              📝 다이어리
            </a>
            <a href="#" className="block p-2 rounded-lg bg-slate-700/50 hover:bg-slate-600 transition-colors text-sm text-slate-200 hover:text-white">
              📷 사진첩
            </a>
            <a href="#" className="block p-2 rounded-lg bg-slate-700/50 hover:bg-slate-600 transition-colors text-sm text-slate-200 hover:text-white">
              💌 방명록
            </a>
            <a href="#" className="block p-2 rounded-lg bg-slate-700/50 hover:bg-slate-600 transition-colors text-sm text-slate-200 hover:text-white">
              ⚙️ 관리
            </a>
          </nav>
        </div>
      </Card>

      {/* 최근 방명록 */}
      <Card className="bg-gradient-to-b from-slate-800 to-gray-800 border-2 border-slate-700">
        <div className="p-4">
          <h3 className="mb-3 text-emerald-400 flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            최근 방명록
          </h3>
          <div className="space-y-2 text-sm">
            <div className="bg-slate-700/50 p-2 rounded">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-emerald-300">김개발</span>
                <span className="text-xs text-slate-400">2시간 전</span>
              </div>
              <p className="text-slate-300">블로그 디자인 너무 예뻐요! 추억이 새록새록 🥹</p>
            </div>
            <div className="bg-slate-700/50 p-2 rounded">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-emerald-300">박프론트</span>
                <span className="text-xs text-slate-400">1일 전</span>
              </div>
              <p className="text-slate-300">TypeScript 포스팅 정말 도움됐어요!</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}