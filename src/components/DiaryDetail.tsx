"use client";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Eye,
  Heart,
  MessageCircle,
  Share,
  Bookmark,
  Tag,
  Edit,
  Code,
  Copy,
  Check,
} from "lucide-react";
import { useState } from "react";

interface DiaryDetailProps {
  postId: number;
  onBack: () => void;
}

interface BlogPost {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  createdAt: string;
  views: number;
  likes: number;
  comments: number;
  isLiked: boolean;
  isBookmarked: boolean;
  author: {
    name: string;
    avatar: string;
  };
}

export function DiaryDetail({ postId, onBack }: DiaryDetailProps) {
  const [post, setPost] = useState<BlogPost>({
    id: postId,
    title: "React 18의 새로운 기능들과 개발 환경 세팅하기",
    content: `React 18이 출시된 지 꽤 시간이 지났지만, 여전히 많은 개발자들이 새로운 기능들을 제대로 활용하지 못하고 있는 것 같아서 정리해보려고 합니다! 🚀

## 주요 새 기능들

### 1. Automatic Batching
React 18에서는 자동 배칭이 모든 업데이트에 적용됩니다. 이전 버전에서는 React 이벤트 핸들러 내에서만 배칭이 되었지만, 이제는 Promise, setTimeout, 네이티브 이벤트 핸들러에서도 자동으로 배칭됩니다.

\`\`\`javascript
// React 18에서는 이 두 setState가 자동으로 배칭됩니다
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // React는 한 번만 렌더링합니다 (배칭!)
}, 1000);
\`\`\`

### 2. Concurrent Features
Concurrent 기능들이 정식으로 도입되었습니다:

- **startTransition**: 급하지 않은 업데이트를 표시
- **useDeferredValue**: 값의 업데이트를 지연
- **Suspense**: 데이터 로딩 상태 관리

\`\`\`javascript
import { startTransition } from 'react';

// 급한 업데이트: 입력값 반영
setInputValue(input);

// 급하지 않은 업데이트: 검색 결과
startTransition(() => {
  setSearchQuery(input);
});
\`\`\`

### 3. Strict Mode 개선
개발 모드에서 컴포넌트가 두 번 마운트되어 부작용을 찾아낼 수 있도록 도와줍니다.

## 개발 환경 세팅

### Create React App 대신 Vite를 사용해보세요!

\`\`\`bash
npm create vite@latest my-react-app -- --template react-ts
cd my-react-app
npm install
npm run dev
\`\`\`

Vite의 장점:
- 매우 빠른 개발 서버 시작
- HMR (Hot Module Replacement) 성능 향상
- 번들 크기 최적화

### 필수 개발 도구들

1. **ESLint + Prettier 설정**
2. **TypeScript 적용**
3. **Husky + lint-staged** (커밋 전 코드 품질 검사)

## 마무리

React 18의 새로운 기능들을 활용하면 더 나은 사용자 경험을 제공할 수 있습니다. 특히 Concurrent 기능들은 대용량 앱에서 성능 향상에 큰 도움이 됩니다.

다음 포스팅에서는 Suspense와 함께 사용하는 데이터 페칭 패턴에 대해 더 자세히 다뤄보겠습니다! 🎯`,
    excerpt:
      "React 18의 주요 새 기능들과 개발 환경 세팅 방법을 자세히 알아보고, 실무에서 어떻게 활용할 수 있는지 살펴봅니다.",
    category: "React",
    tags: ["React", "JavaScript", "개발환경", "성능최적화"],
    createdAt: "2024.01.15",
    views: 1247,
    likes: 89,
    comments: 24,
    isLiked: false,
    isBookmarked: false,
    author: {
      name: "레트로 개발자",
      avatar:
        "https://images.unsplash.com/photo-1725800066480-7ccf189e9513?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjBwcm9ncmFtbWluZyUyMGRldmVsb3BlcnxlbnwxfHx8fDE3NTg3NjUyMDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  });

  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleLike = () => {
    setPost((prev) => ({
      ...prev,
      isLiked: !prev.isLiked,
      likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1,
    }));
  };

  const handleBookmark = () => {
    setPost((prev) => ({
      ...prev,
      isBookmarked: !prev.isBookmarked,
    }));
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const formatContent = (content: string) => {
    const parts = content.split(/(\`\`\`[\s\S]*?\`\`\`)/g);

    return parts.map((part, index) => {
      if (part.startsWith("```")) {
        const lines = part.split("\n");
        const language = lines[0].replace("```", "");
        const code = lines.slice(1, -1).join("\n");

        return (
          <div
            key={index}
            className="my-6 bg-gray-900 rounded-lg overflow-hidden border border-gray-700"
          >
            <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
              <span className="text-sm text-gray-400 flex items-center gap-2">
                <Code className="w-4 h-4" />
                {language || "code"}
              </span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => copyCode(code)}
                className="text-gray-400 hover:text-white hover:bg-gray-700 h-8 px-2"
              >
                {copiedCode === code ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
            <pre className="p-4 overflow-x-auto">
              <code className="text-green-400 text-sm">{code}</code>
            </pre>
          </div>
        );
      }

      // 일반 텍스트 처리 (마크다운 스타일)
      return (
        <div key={index} className="prose prose-slate prose-invert max-w-none">
          {part.split("\n").map((line, lineIndex) => {
            if (line.startsWith("## ")) {
              return (
                <h2 key={lineIndex} className="text-xl text-slate-100 mt-8 mb-4">
                  {line.replace("## ", "")}
                </h2>
              );
            }
            if (line.startsWith("### ")) {
              return (
                <h3 key={lineIndex} className="text-lg text-slate-200 mt-6 mb-3">
                  {line.replace("### ", "")}
                </h3>
              );
            }
            if (line.startsWith("- ") || line.startsWith("* ")) {
              return (
                <li key={lineIndex} className="text-slate-300 ml-4">
                  {line.replace(/^[*-] /, "")}
                </li>
              );
            }
            if (line.trim() === "") {
              return <br key={lineIndex} />;
            }

            // 인라인 코드 처리
            const codeRegex = /`([^`]+)`/g;
            const processedLine = line.replace(
              codeRegex,
              '<code class="bg-gray-800 text-cyan-400 px-1 py-0.5 rounded text-sm">$1</code>',
            );

            return (
              <p
                key={lineIndex}
                className="text-slate-300 leading-relaxed mb-3"
                dangerouslySetInnerHTML={{ __html: processedLine }}
              />
            );
          })}
        </div>
      );
    });
  };

  return (
    <div className="space-y-6">
      {/* 뒤로가기 버튼 */}
      <Button
        variant="ghost"
        onClick={onBack}
        className="text-slate-300 hover:text-white hover:bg-slate-700"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        목록으로 돌아가기
      </Button>

      {/* 포스트 헤더 */}
      <Card className="bg-gradient-to-br from-slate-800 via-gray-800 to-slate-900 border-2 border-slate-700">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <Avatar className="w-12 h-12 border-2 border-slate-600">
              <AvatarImage src={post.author.avatar} />
              <AvatarFallback>개발자</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-slate-200">{post.author.name}</span>
                <Badge
                  variant="secondary"
                  className="bg-purple-900/50 text-purple-300 border border-purple-700"
                >
                  {post.category}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {post.createdAt}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  5분 읽기
                </span>
              </div>
            </div>
          </div>

          <h1 className="text-3xl text-slate-100 mb-4 leading-tight">{post.title}</h1>
          <p className="text-lg text-slate-300 leading-relaxed mb-6">{post.excerpt}</p>

          {/* 태그 */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 text-sm bg-slate-700 text-slate-300 px-3 py-1 rounded-full"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>

          {/* 상호작용 버튼들 */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-700">
            <div className="flex items-center gap-4 text-sm text-slate-400">
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {post.views.toLocaleString()}
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                {post.comments}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className={`${
                  post.isLiked
                    ? "text-pink-400 hover:text-pink-300"
                    : "text-slate-400 hover:text-pink-400"
                } hover:bg-pink-900/20`}
              >
                <Heart className={`w-4 h-4 mr-1 ${post.isLiked ? "fill-current" : ""}`} />
                {post.likes}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleBookmark}
                className={`${
                  post.isBookmarked
                    ? "text-yellow-400 hover:text-yellow-300"
                    : "text-slate-400 hover:text-yellow-400"
                } hover:bg-yellow-900/20`}
              >
                <Bookmark className={`w-4 h-4 ${post.isBookmarked ? "fill-current" : ""}`} />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="text-slate-400 hover:text-blue-400 hover:bg-blue-900/20"
              >
                <Share className="w-4 h-4" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="text-slate-400 hover:text-green-400 hover:bg-green-900/20"
              >
                <Edit className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* 포스트 내용 */}
      <Card className="bg-slate-800/80 border border-slate-700">
        <div className="p-8">
          <div className="prose prose-slate prose-invert max-w-none">
            {formatContent(post.content)}
          </div>
        </div>
      </Card>

      {/* 다음/이전 포스트 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-slate-800/80 border border-slate-700 hover:border-slate-600 transition-colors">
          <div className="p-4">
            <div className="text-xs text-slate-400 mb-2">이전 포스트</div>
            <h3 className="text-slate-200 hover:text-white cursor-pointer">
              TypeScript 고급 타입 시스템 완전 정복
            </h3>
          </div>
        </Card>

        <Card className="bg-slate-800/80 border border-slate-700 hover:border-slate-600 transition-colors">
          <div className="p-4">
            <div className="text-xs text-slate-400 mb-2">다음 포스트</div>
            <h3 className="text-slate-200 hover:text-white cursor-pointer">
              Next.js 13 App Router 완전 가이드
            </h3>
          </div>
        </Card>
      </div>
    </div>
  );
}
