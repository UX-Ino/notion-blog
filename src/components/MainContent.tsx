import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { BlogPost } from "./BlogPost";
import { GuestBook } from "./GuestBook";
import { AdminDashboard } from "./AdminDashboard";
import { PhotoAlbum } from "./PhotoAlbum";
import { DiaryDetail } from "./DiaryDetail";
import { Search, Calendar, Tag, TrendingUp } from "lucide-react";

export function MainContent() {
  const [currentView, setCurrentView] = useState<'home' | 'diary' | 'photos' | 'guestbook' | 'admin'>('home');
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // 예시 블로그 포스트 데이터
  const blogPosts = [
    {
      id: "1",
      title: "React 18의 새로운 기능들과 개발 환경 세팅하기 🚀",
      content: `안녕하세요! 오늘은 React 18에서 새롭게 추가된 기능들에 대해 알아보겠습니다.

특히 Concurrent Features와 자동 배칭, Suspense의 개선사항들이 인상적이었는데요. 

실제 프로젝트에 적용해보면서 느낀 점들을 공유해드릴게요!

\`\`\`tsx
import { createRoot } from 'react-dom/client';

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);
\`\`\`

위와 같이 createRoot API를 사용하면 Concurrent Features를 활용할 수 있습니다.`,
      category: "React",
      createdAt: "2024-01-15T14:30:00Z",
      views: 234,
      likes: 12,
      comments: 8
    },
    {
      id: "2",
      title: "TypeScript 타입 시스템 깊이 파헤치기 💪",
      content: `TypeScript를 사용하면서 가장 어려웠던 부분 중 하나가 제네릭과 유니온 타입을 활용하는 것이었습니다.

오늘은 실무에서 자주 사용하는 타입 패턴들을 정리해보았어요.

\`\`\`typescript
// 조건부 타입 활용
type ApiResponse<T> = T extends string 
  ? { message: T } 
  : { data: T };
\`\`\`

이런 패턴들을 알아두면 정말 유용해요!`,
      category: "TypeScript",
      createdAt: "2024-01-12T09:15:00Z",
      views: 189,
      likes: 15,
      comments: 6
    },
    {
      id: "3",
      title: "CSS Grid vs Flexbox: 언제 무엇을 써야 할까? 🤔",
      content: `레이아웃을 구성할 때 CSS Grid와 Flexbox 중 어떤 것을 써야 할지 고민이 많으시죠?

두 기술의 특징과 적절한 사용 사례를 정리해보았습니다.

**Grid는 2차원 레이아웃에**
**Flexbox는 1차원 레이아웃에**

이 기본 원칙만 기억해도 80% 해결됩니다!`,
      category: "CSS",
      createdAt: "2024-01-10T16:45:00Z",
      views: 156,
      likes: 9,
      comments: 4
    },
    {
      id: "4",
      title: "개발자를 위한 생산성 도구 추천 ⚡",
      content: `개발 생산성을 크게 향상시켜준 도구들을 소개합니다.

1. VS Code Extensions
2. Terminal 설정
3. Git Aliases
4. 자동화 스크립트

이 도구들로 하루에 2시간은 절약할 수 있어요!`,
      category: "개발도구",
      createdAt: "2024-01-08T11:20:00Z",
      views: 298,
      likes: 23,
      comments: 11
    },
    {
      id: "5",
      title: "Next.js 13 App Router 완전 정복하기 🎯",
      content: `Next.js 13에서 도입된 App Router는 정말 혁신적입니다.

기존 Pages Router와 비교하여 어떤 점이 좋아졌는지, 
실제 마이그레이션 과정에서 주의할 점들을 정리했어요.

Server Components와 Client Components의 구분이 핵심입니다!`,
      category: "Next.js",
      createdAt: "2024-01-05T13:30:00Z",
      views: 267,
      likes: 18,
      comments: 7
    }
  ];

  const categories = ["React", "TypeScript", "CSS", "Next.js", "개발도구"];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\. /g, '.');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'guestbook':
        return <GuestBook />;
      case 'admin':
        return <AdminDashboard />;
      case 'photos':
        return <PhotoAlbum />;
      case 'diary':
        // 특정 포스트를 선택한 경우 상세 페이지 표시
        if (selectedPostId) {
          return <DiaryDetail postId={selectedPostId} onBack={() => setSelectedPostId(null)} />;
        }
        // 아니면 블로그 목록 표시
        return (
          <div className="space-y-6">
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

            {/* 인기 게시물 */}
            <Card className="bg-gradient-to-r from-slate-800 to-gray-800 border-2 border-slate-700">
              <div className="p-4">
                <h3 className="text-orange-400 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  🔥 인기 게시물
                </h3>
                <div className="space-y-2">
                  {blogPosts
                    .sort((a, b) => b.views - a.views)
                    .slice(0, 3)
                    .map((post, index) => (
                      <div key={post.id} className="flex items-center gap-3 p-2 bg-slate-700/50 rounded-lg">
                        <span className="text-orange-400 font-mono w-6">{index + 1}.</span>
                        <span className="flex-1 text-sm text-slate-300 truncate">{post.title}</span>
                        <span className="text-xs text-slate-400">👀 {post.views}</span>
                      </div>
                    ))}
                </div>
              </div>
            </Card>

            {/* 블로그 포스트 목록 */}
            <div className="space-y-6">
              {blogPosts.map((blogPost) => (
                <BlogPost 
                  key={blogPost.id} 
                  {...blogPost} 
                  isPreview={true} 
                  onClick={() => setSelectedPostId(parseInt(blogPost.id))}
                />
              ))}
            </div>

            {/* 더보기 버튼 */}
            <div className="text-center">
              <Button 
                variant="outline" 
                onClick={() => setSelectedPostId(1)}
                className="bg-gradient-to-r from-slate-800 to-gray-800 border-slate-600 text-slate-300 hover:from-slate-700 hover:to-gray-700 hover:text-white"
              >
                더 많은 게시물 보기 📝
              </Button>
            </div>
          </div>
        );
      case 'home':
      default:
        return (
          <div className="space-y-6">
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

            {/* 인기 게시물 */}
            <Card className="bg-gradient-to-r from-slate-800 to-gray-800 border-2 border-slate-700">
              <div className="p-4">
                <h3 className="text-orange-400 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  🔥 인기 게시물
                </h3>
                <div className="space-y-2">
                  {blogPosts
                    .sort((a, b) => b.views - a.views)
                    .slice(0, 3)
                    .map((post, index) => (
                      <div 
                        key={post.id} 
                        className="flex items-center gap-3 p-2 bg-slate-700/50 rounded-lg hover:bg-slate-700/70 cursor-pointer transition-colors"
                        onClick={() => {
                          setCurrentView('diary');
                          setSelectedPostId(parseInt(post.id));
                        }}
                      >
                        <span className="text-orange-400 font-mono w-6">{index + 1}.</span>
                        <span className="flex-1 text-sm text-slate-300 truncate">{post.title}</span>
                        <span className="text-xs text-slate-400">👀 {post.views}</span>
                      </div>
                    ))}
                </div>
              </div>
            </Card>

            {/* 최신 블로그 포스트 미리보기 */}
            <div className="space-y-6">
              {blogPosts.slice(0, 3).map((post) => (
                <BlogPost 
                  key={post.id} 
                  {...post} 
                  isPreview={true} 
                  onClick={() => {
                    setCurrentView('diary');
                    setSelectedPostId(parseInt(post.id));
                  }}
                />
              ))}
            </div>

            {/* 더보기 버튼 */}
            <div className="text-center">
              <Button 
                variant="outline" 
                onClick={() => setCurrentView('diary')}
                className="bg-gradient-to-r from-slate-800 to-gray-800 border-slate-600 text-slate-300 hover:from-slate-700 hover:to-gray-700 hover:text-white"
              >
                더 많은 게시물 보기 📝
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <Card className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 border-2 border-slate-700">
        <div className="p-6 text-center">
          <h1 className="text-2xl mb-2 text-slate-100">
            🌈 레트로 개발자의 다이어리
          </h1>
          <p className="text-slate-300">
            추억 속 싸이월드에서 전하는 따뜻한 개발 이야기
          </p>
        </div>
      </Card>

      {/* 네비게이션 */}
      <Card className="bg-slate-800/80 border border-slate-700">
        <div className="p-4">
          <nav className="flex gap-2 flex-wrap justify-center">
            {[
              { key: 'home', label: '🏠 홈', icon: '' },
              { key: 'diary', label: '📝 다이어리', icon: '' },
              { key: 'photos', label: '📷 사진첩', icon: '' },
              { key: 'guestbook', label: '💌 방명록', icon: '' },
              { key: 'admin', label: '⚙️ 관리', icon: '' },
            ].map(({ key, label }) => (
              <Button
                key={key}
                variant={currentView === key ? "default" : "ghost"}
                size="sm"
                onClick={() => {
                  setCurrentView(key as any);
                  setSelectedPostId(null); // 페이지 변경 시 선택된 포스트 초기화
                }}
                className={
                  currentView === key
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