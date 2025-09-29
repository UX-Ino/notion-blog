"use client";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LoginForm } from "./LoginForm";
import {
  BarChart3,
  Users,
  FileText,
  MessageCircle,
  Heart,
  Eye,
  TrendingUp,
  Calendar,
  Edit,
  Trash2,
  Plus,
  Settings,
  LogOut,
} from "lucide-react";
import { useState } from "react";

export function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "posts" | "comments" | "guestbook" | "settings"
  >("dashboard");

  const handleLogin = (success: boolean) => {
    setIsLoggedIn(success);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab("dashboard");
  };

  // 로그인하지 않은 경우 로그인 폼 표시
  if (!isLoggedIn) {
    return (
      <div className="space-y-6">
        <Card className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 border border-slate-700">
          <div className="p-6 text-center">
            <h1 className="text-2xl mb-2 text-white">⚙️ 관리자 페이지</h1>
            <p className="text-slate-300">블로그 관리 기능에 접근하려면 로그인이 필요합니다</p>
          </div>
        </Card>
        <LoginForm onLogin={handleLogin} />
      </div>
    );
  }

  // 통계 데이터
  const stats = {
    totalVisitors: 12834,
    todayVisitors: 42,
    totalPosts: 15,
    totalComments: 87,
    totalGuestbookEntries: 23,
    popularPosts: [
      { title: "React 18의 새로운 기능들", views: 234, likes: 12 },
      { title: "TypeScript 타입 시스템", views: 189, likes: 15 },
      { title: "싸이월드 감성 블로그", views: 156, likes: 23 },
    ],
  };

  // 최근 댓글
  const recentComments = [
    {
      id: 1,
      author: "김개발",
      content: "정말 유용한 포스팅이네요!",
      postTitle: "React 18 기능들",
      createdAt: "2시간 전",
    },
    {
      id: 2,
      author: "박프론트",
      content: "설명이 너무 잘 되어있어요",
      postTitle: "TypeScript 타입",
      createdAt: "4시간 전",
    },
    {
      id: 3,
      author: "이백엔드",
      content: "코드 예시가 도움됐습니다",
      postTitle: "Node.js 최적화",
      createdAt: "1일 전",
    },
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* 통계 카드들 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">총 방문자</p>
                <p className="text-2xl text-white">{stats.totalVisitors.toLocaleString()}</p>
              </div>
              <Users className="w-8 h-8 text-blue-400" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">오늘 방문자</p>
                <p className="text-2xl text-white">{stats.todayVisitors}</p>
              </div>
              <Calendar className="w-8 h-8 text-green-400" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">총 게시글</p>
                <p className="text-2xl text-white">{stats.totalPosts}</p>
              </div>
              <FileText className="w-8 h-8 text-purple-400" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">총 댓글</p>
                <p className="text-2xl text-white">{stats.totalComments}</p>
              </div>
              <MessageCircle className="w-8 h-8 text-pink-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* 인기 게시물 */}
      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
        <div className="p-6">
          <h3 className="text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-orange-400" />
            인기 게시물
          </h3>
          <div className="space-y-3">
            {stats.popularPosts.map((post, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="text-orange-400 w-6">{index + 1}.</span>
                  <span className="text-slate-300">{post.title}</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1 text-slate-400">
                    <Eye className="w-4 h-4" />
                    {post.views}
                  </span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <Heart className="w-4 h-4" />
                    {post.likes}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* 최근 활동 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 최근 댓글 */}
        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
          <div className="p-6">
            <h3 className="text-white mb-4 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-blue-400" />
              최근 댓글
            </h3>
            <div className="space-y-3">
              {recentComments.map((comment) => (
                <div key={comment.id} className="p-3 bg-slate-700/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-300">{comment.author}</span>
                    <span className="text-xs text-slate-500">{comment.createdAt}</span>
                  </div>
                  <p className="text-sm text-slate-400 mb-1">{comment.content}</p>
                  <p className="text-xs text-slate-500">📝 {comment.postTitle}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* 빠른 작업 */}
        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
          <div className="p-6">
            <h3 className="text-white mb-4">빠른 작업</h3>
            <div className="space-y-3">
              <Button className="w-full justify-start bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                <Plus className="w-4 h-4 mr-2" />새 게시글 작성
              </Button>
              <Button className="w-full justify-start bg-slate-700 hover:bg-slate-600 text-white">
                <Settings className="w-4 h-4 mr-2" />
                블로그 설정
              </Button>
              <Button className="w-full justify-start bg-slate-700 hover:bg-slate-600 text-white">
                <BarChart3 className="w-4 h-4 mr-2" />
                상세 통계 보기
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderPostManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl text-white">게시글 관리</h2>
        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
          <Plus className="w-4 h-4 mr-2" />새 게시글
        </Button>
      </div>

      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
        <div className="p-6">
          <div className="space-y-4">
            {[1, 2, 3].map((post) => (
              <div
                key={post}
                className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg"
              >
                <div className="flex-1">
                  <h3 className="text-white mb-1">React 18의 새로운 기능들과 개발 환경 세팅하기</h3>
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <span>React</span>
                    <span>2024.01.15</span>
                    <span>조회 234회</span>
                    <Badge variant="secondary" className="bg-green-900 text-green-300">
                      Published
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-slate-400 hover:text-white hover:bg-slate-700"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return renderDashboard();
      case "posts":
        return renderPostManagement();
      case "comments":
        return <div className="text-white">댓글 관리 페이지</div>;
      case "guestbook":
        return <div className="text-white">방명록 관리 페이지</div>;
      case "settings":
        return <div className="text-white">설정 페이지</div>;
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <Card className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 border border-slate-700">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="text-center flex-1">
              <h1 className="text-2xl mb-2 text-white">⚙️ 관리자 대시보드</h1>
              <p className="text-slate-300">블로그 운영 현황을 한눈에 확인하고 관리하세요</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-slate-300 hover:text-white hover:bg-slate-700"
            >
              <LogOut className="w-4 h-4 mr-2" />
              로그아웃
            </Button>
          </div>
        </div>
      </Card>

      {/* 네비게이션 */}
      <Card className="bg-slate-800/80 border border-slate-700">
        <div className="p-4">
          <nav className="flex gap-2 flex-wrap">
            {[
              { key: "dashboard", label: "📊 대시보드" },
              { key: "posts", label: "📝 게시글" },
              { key: "comments", label: "💬 댓글" },
              { key: "guestbook", label: "💌 방명록" },
              { key: "settings", label: "⚙️ 설정" },
            ].map(({ key, label }) => (
              <Button
                key={key}
                variant={activeTab === key ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab(key as any)}
                className={
                  activeTab === key
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    : "text-slate-300 hover:bg-slate-700 hover:text-white"
                }
              >
                {label}
              </Button>
            ))}
          </nav>
        </div>
      </Card>

      {/* 메인 콘텐츠 */}
      {renderContent()}
    </div>
  );
}
