import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Heart, MessageCircle, Eye, Clock, Calendar } from "lucide-react";

interface BlogPostProps {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
  views: number;
  likes: number;
  comments: number;
  isPreview?: boolean;
  onClick?: () => void;
}

export function BlogPost({ 
  title, 
  content, 
  category, 
  createdAt, 
  views, 
  likes, 
  comments, 
  isPreview = false,
  onClick
}: BlogPostProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card 
      className="bg-gradient-to-br from-slate-800 via-gray-800 to-slate-900 border-2 border-slate-700 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="p-6">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8 border-2 border-slate-600 shadow">
              <AvatarImage src="https://images.unsplash.com/photo-1725800066480-7ccf189e9513?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjBwcm9ncmFtbWluZyUyMGRldmVsb3BlcnxlbnwxfHx8fDE3NTg3NjUyMDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" />
              <AvatarFallback>개발자</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-200">레트로 개발자</span>
                <Badge 
                  variant="secondary" 
                  className="bg-purple-900/50 text-purple-300 border border-purple-700 text-xs"
                >
                  {category}
                </Badge>
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-400">
                <Calendar className="w-3 h-3" />
                {formatDate(createdAt)}
              </div>
            </div>
          </div>
        </div>

        {/* 제목 */}
        <h2 className="text-xl mb-3 text-slate-100 leading-relaxed">
          {title}
        </h2>

        {/* 내용 */}
        <div className="prose prose-sm max-w-none mb-4">
          {isPreview ? (
            <p className="text-slate-300 leading-relaxed">
              {content.slice(0, 200)}
              {content.length > 200 && (
                <span className="text-purple-400 cursor-pointer hover:underline ml-1">
                  ...더보기
                </span>
              )}
            </p>
          ) : (
            <div className="text-slate-300 leading-relaxed whitespace-pre-wrap">
              {content}
            </div>
          )}
        </div>

        {/* 코드 블록 예시 (실제 게시글에서는 마크다운 파싱 필요) */}
        {!isPreview && content.includes('```') && (
          <div className="bg-gray-900 rounded-lg p-4 mb-4 border border-gray-700">
            <pre className="text-green-400 text-sm overflow-x-auto">
              <code>{`const greeting = "Hello, Cyworld!";
console.log(greeting);`}</code>
            </pre>
          </div>
        )}

        {/* 하단 메타 정보 */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-700">
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {views}
            </span>
            <span className="flex items-center gap-1">
              <Heart className="w-4 h-4 text-pink-400" />
              {likes}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4 text-blue-400" />
              {comments}
            </span>
          </div>
          
          {isPreview && onClick && (
            <button 
              className="text-purple-400 hover:text-purple-300 text-sm hover:underline"
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
            >
              전체보기 →
            </button>
          )}
        </div>
      </div>
    </Card>
  );
}