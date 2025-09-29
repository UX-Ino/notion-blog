import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  ArrowLeft,
  Calendar,
  Heart,
  MessageCircle,
  Reply,
  Trash2,
  Edit,
  Flag,
  Send,
} from "lucide-react";
import { useState } from "react";

interface GuestBookDetailProps {
  messageId: number;
  onBack: () => void;
}

interface GuestMessage {
  id: number;
  name: string;
  avatar: string;
  message: string;
  createdAt: string;
  likes: number;
  isLiked: boolean;
  replies: Reply[];
}

interface Reply {
  id: number;
  name: string;
  avatar: string;
  message: string;
  createdAt: string;
  isAuthor: boolean;
}

export function GuestBookDetail({ messageId, onBack }: GuestBookDetailProps) {
  const [message, setMessage] = useState<GuestMessage>({
    id: messageId,
    name: "코딩하는 고양이 🐱",
    avatar:
      "https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwY2F0fGVufDF8fHx8MTc1ODc2NTIwMXww&ixlib=rb-4.1.0&q=80&w=1080",
    message: `안녕하세요! 블로그 정말 잘 보고 있어요 ✨

React 18 포스트가 특히 도움이 많이 되었습니다. 제가 현재 진행하고 있는 프로젝트에 바로 적용해볼 수 있을 것 같아요!

앞으로도 좋은 글 많이 올려주세요~ 
그리고 TypeScript 관련 시리즈도 기대하고 있습니다 💪

화이팅! 🔥`,
    createdAt: "2024.01.16 오후 3:24",
    likes: 15,
    isLiked: false,
    replies: [
      {
        id: 1,
        name: "레트로 개발자",
        avatar:
          "https://images.unsplash.com/photo-1725800066480-7ccf189e9513?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjBwcm9ncmFtbWluZyUyMGRldmVsb3BlcnxlbnwxfHx8fDE3NTg3NjUyMDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
        message: "감사합니다! TypeScript 시리즈 곧 시작할 예정이에요. 많은 관심 부탁드려요~ 😊",
        createdAt: "2024.01.16 오후 4:12",
        isAuthor: true,
      },
      {
        id: 2,
        name: "프론트엔드 초보",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmFtbWluZyUyMGJvb2tzfGVufDF8fHx8MTc1ODc2NTIwMXww&ixlib=rb-4.1.0&q=80&w=1080",
        message: "저도 TypeScript 공부하고 있는데 정말 기대돼요!",
        createdAt: "2024.01.16 오후 5:33",
        isAuthor: false,
      },
    ],
  });

  const [replyText, setReplyText] = useState("");
  const [isReplying, setIsReplying] = useState(false);

  const handleLike = () => {
    setMessage((prev) => ({
      ...prev,
      isLiked: !prev.isLiked,
      likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1,
    }));
  };

  const handleReply = () => {
    if (!replyText.trim()) return;

    const newReply: Reply = {
      id: message.replies.length + 1,
      name: "방문자",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwYXZhdGFyfGVufDF8fHx8MTc1ODc2NTIwMXww&ixlib=rb-4.1.0&q=80&w=1080",
      message: replyText,
      createdAt:
        new Date()
          .toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })
          .replace(/\. /g, ".") + " 오후",
      isAuthor: false,
    };

    setMessage((prev) => ({
      ...prev,
      replies: [...prev.replies, newReply],
    }));

    setReplyText("");
    setIsReplying(false);
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
        방명록으로 돌아가기
      </Button>

      {/* 원본 메시지 */}
      <Card className="bg-gradient-to-br from-slate-800 via-gray-800 to-slate-900 border-2 border-slate-700">
        <div className="p-6">
          {/* 작성자 정보 */}
          <div className="flex items-start gap-4 mb-4">
            <Avatar className="w-12 h-12 border-2 border-slate-600">
              <AvatarImage src={message.avatar} />
              <AvatarFallback>{message.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-slate-200">{message.name}</span>
                <Badge
                  variant="secondary"
                  className="bg-purple-900/50 text-purple-300 border border-purple-700 text-xs"
                >
                  방문자
                </Badge>
              </div>
              <div className="flex items-center gap-1 text-sm text-slate-400">
                <Calendar className="w-4 h-4" />
                {message.createdAt}
              </div>
            </div>
          </div>

          {/* 메시지 내용 */}
          <div className="bg-slate-700/30 rounded-lg p-4 mb-4">
            <div className="text-slate-300 leading-relaxed whitespace-pre-line">
              {message.message}
            </div>
          </div>

          {/* 상호작용 버튼들 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className={`${
                  message.isLiked
                    ? "text-pink-400 hover:text-pink-300"
                    : "text-slate-400 hover:text-pink-400"
                } hover:bg-pink-900/20`}
              >
                <Heart className={`w-4 h-4 mr-1 ${message.isLiked ? "fill-current" : ""}`} />
                {message.likes}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsReplying(!isReplying)}
                className="text-slate-400 hover:text-blue-400 hover:bg-blue-900/20"
              >
                <MessageCircle className="w-4 h-4 mr-1" />
                댓글 {message.replies.length}
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-400 hover:text-orange-400 hover:bg-orange-900/20"
              >
                <Flag className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* 댓글 작성 폼 */}
      {isReplying && (
        <Card className="bg-slate-800/80 border border-slate-700">
          <div className="p-4">
            <h3 className="text-slate-200 mb-3 flex items-center gap-2">
              <Reply className="w-4 h-4" />
              댓글 작성
            </h3>
            <div className="space-y-3">
              <Textarea
                placeholder="따뜻한 댓글을 남겨주세요..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="bg-slate-700/50 border-slate-600 text-slate-200 placeholder:text-slate-400 min-h-[80px]"
              />
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsReplying(false)}
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  취소
                </Button>
                <Button
                  size="sm"
                  onClick={handleReply}
                  disabled={!replyText.trim()}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  <Send className="w-4 h-4 mr-1" />
                  댓글 작성
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* 댓글 목록 */}
      {message.replies.length > 0 && (
        <Card className="bg-slate-800/80 border border-slate-700">
          <div className="p-4">
            <h3 className="text-slate-200 mb-4 flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              댓글 {message.replies.length}개
            </h3>
            <div className="space-y-4">
              {message.replies.map((reply) => (
                <div key={reply.id} className="flex gap-3 p-3 bg-slate-700/30 rounded-lg">
                  <Avatar className="w-8 h-8 border border-slate-600">
                    <AvatarImage src={reply.avatar} />
                    <AvatarFallback>{reply.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-sm ${reply.isAuthor ? "text-purple-300" : "text-slate-300"}`}
                      >
                        {reply.name}
                      </span>
                      {reply.isAuthor && (
                        <Badge
                          variant="secondary"
                          className="bg-purple-900/50 text-purple-300 border border-purple-700 text-xs"
                        >
                          작성자
                        </Badge>
                      )}
                      <span className="text-xs text-slate-500">{reply.createdAt}</span>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">{reply.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* 관련 방명록 메시지들 */}
      <Card className="bg-slate-800/80 border border-slate-700">
        <div className="p-4">
          <h3 className="text-slate-200 mb-4">💌 다른 방명록 메시지들</h3>
          <div className="space-y-3">
            {[
              {
                id: 2,
                name: "자바스크립트 마스터",
                preview: "ES2024 새 기능들 정말 신기해요! 특히...",
                time: "2시간 전",
              },
              {
                id: 3,
                name: "리액트 러버",
                preview: "Suspense 활용법 포스트 언제 올라올까요?",
                time: "5시간 전",
              },
              {
                id: 4,
                name: "개발 공부중",
                preview: "초보자도 이해하기 쉽게 설명해주셔서...",
                time: "1일 전",
              },
            ].map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-2 bg-slate-700/30 rounded hover:bg-slate-700/50 cursor-pointer transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm text-slate-300">{item.name}</span>
                    <span className="text-xs text-slate-500">{item.time}</span>
                  </div>
                  <p className="text-sm text-slate-400 truncate">{item.preview}</p>
                </div>
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                  보기
                </Button>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
