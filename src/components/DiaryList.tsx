"use client";

import { useMemo } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { BlogPost } from "./BlogPost";
import { TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DiaryList() {
  const router = useRouter();

  const blogPosts = useMemo(
    () => [
      {
        id: "1",
        title: "React 18의 새로운 기능들과 개발 환경 세팅하기 🚀",
        content: `안녕하세요! 오늘은 React 18에서 새롭게 추가된 기능들에 대해 알아보겠습니다.\n\n특히 Concurrent Features와 자동 배칭, Suspense의 개선사항들이 인상적이었는데요. \n\n실제 프로젝트에 적용해보면서 느낀 점들을 공유해드릴게요!\n\n\`\`\`tsx\nimport { createRoot } from 'react-dom/client';\n\nconst container = document.getElementById('app');\nconst root = createRoot(container);\nroot.render(<App />);\n\`\`\`\n\n위와 같이 createRoot API를 사용하면 Concurrent Features를 활용할 수 있습니다.`,
        category: "React",
        createdAt: "2024-01-15T14:30:00Z",
        views: 234,
        likes: 12,
        comments: 8,
      },
      {
        id: "2",
        title: "TypeScript 타입 시스템 깊이 파헤치기 💪",
        content: `TypeScript를 사용하면서 가장 어려웠던 부분 중 하나가 제네릭과 유니온 타입을 활용하는 것이었습니다.\n\n오늘은 실무에서 자주 사용하는 타입 패턴들을 정리해보았어요.\n\n\`\`\`typescript\n// 조건부 타입 활용\ntype ApiResponse<T> = T extends string \n  ? { message: T } \n  : { data: T };\n\`\`\`\n\n이런 패턴들을 알아두면 정말 유용해요!`,
        category: "TypeScript",
        createdAt: "2024-01-12T09:15:00Z",
        views: 189,
        likes: 15,
        comments: 6,
      },
      {
        id: "3",
        title: "CSS Grid vs Flexbox: 언제 무엇을 써야 할까? 🤔",
        content: `레이아웃을 구성할 때 CSS Grid와 Flexbox 중 어떤 것을 써야 할지 고민이 많으시죠?\n\n두 기술의 특징과 적절한 사용 사례를 정리해보았습니다.\n\n**Grid는 2차원 레이아웃에**\n**Flexbox는 1차원 레이아웃에**\n\n이 기본 원칙만 기억해도 80% 해결됩니다!`,
        category: "CSS",
        createdAt: "2024-01-10T16:45:00Z",
        views: 156,
        likes: 9,
        comments: 4,
      },
      {
        id: "4",
        title: "개발자를 위한 생산성 도구 추천 ⚡",
        content: `개발 생산성을 크게 향상시켜준 도구들을 소개합니다.\n\n1. VS Code Extensions\n2. Terminal 설정\n3. Git Aliases\n4. 자동화 스크립트\n\n이 도구들로 하루에 2시간은 절약할 수 있어요!`,
        category: "개발도구",
        createdAt: "2024-01-08T11:20:00Z",
        views: 298,
        likes: 23,
        comments: 11,
      },
      {
        id: "5",
        title: "Next.js 13 App Router 완전 정복하기 🎯",
        content: `Next.js 13에서 도입된 App Router는 정말 혁신적입니다.\n\n기존 Pages Router와 비교하여 어떤 점이 좋아졌는지, \n실제 마이그레이션 과정에서 주의할 점들을 정리했어요.\n\nServer Components와 Client Components의 구분이 핵심입니다!`,
        category: "Next.js",
        createdAt: "2024-01-05T13:30:00Z",
        views: 267,
        likes: 18,
        comments: 7,
      },
    ],
    [],
  );

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <Card className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 border-2 border-slate-700">
        <div className="p-6 text-center">
          <h1 className="text-2xl mb-2 text-slate-100">🌈 레트로 개발자의 다이어리</h1>
          <p className="text-slate-300">추억 속 싸이월드에서 전하는 따뜻한 개발 이야기</p>
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
              .slice()
              .sort((a, b) => b.views - a.views)
              .slice(0, 3)
              .map((post, index) => (
                <div
                  key={post.id}
                  className="flex items-center gap-3 p-2 bg-slate-700/50 rounded-lg hover:bg-slate-700/70 cursor-pointer transition-colors"
                  onClick={() => router.push(`/diary/${post.id}`)}
                >
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
        {blogPosts.map((post) => (
          <BlogPost
            key={post.id}
            {...post}
            isPreview={true}
            onClick={() => router.push(`/diary/${post.id}`)}
          />
        ))}
      </div>

      {/* 더보기 버튼 (예시: 페이지네이션/로드모어 자리) */}
      <div className="text-center">
        <Button
          variant="outline"
          className="bg-gradient-to-r from-slate-800 to-gray-800 border-slate-600 text-slate-300 hover:from-slate-700 hover:to-gray-700 hover:text-white"
        >
          더 많은 게시물 로드 🔽
        </Button>
      </div>
    </div>
  );
}
