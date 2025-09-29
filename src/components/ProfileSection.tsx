"use client";
import { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Heart, Users, MessageCircle, Calendar, Tag, Search } from "lucide-react";

// Note: AvatarImage uses a plain <img> under the hood; acceptable for avatar.

export function ProfileSection() {
  const todayVisitors = 42;
  const totalVisitors = 12834;
  const skillStack = ["React", "TypeScript", "Node.js", "Python", "PostgreSQL"];
  const categories = ["React", "TypeScript", "CSS", "Next.js", "개발도구"];
  const [searchQuery, setSearchQuery] = useState("");

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

      {/* 검색 및 필터 */}
      <Card className="bg-gradient-to-r from-slate-800 to-gray-800 border-2 border-slate-700">
        <div className="p-4">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="블로그 내 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-700/50 border-slate-600 text-slate-200 placeholder:text-slate-400"
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-blue-400 flex items-center gap-1">
                <Tag className="w-4 h-4" />
                카테고리:
              </span>
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant="secondary"
                  className="bg-slate-700 text-blue-300 border border-slate-600 hover:bg-slate-600 cursor-pointer transition-colors"
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
