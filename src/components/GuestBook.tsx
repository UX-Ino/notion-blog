import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { GuestBookDetail } from "./GuestBookDetail";
import { Heart, MessageCircle, Lock, User } from "lucide-react";
import { useState } from "react";

interface GuestBookEntry {
  id: string;
  author: string;
  content: string;
  createdAt: string;
  isSecret: boolean;
  replies?: Array<{
    id: string;
    content: string;
    createdAt: string;
  }>;
}

export function GuestBook() {
  const [selectedMessageId, setSelectedMessageId] = useState<number | null>(null);
  const [newEntry, setNewEntry] = useState({
    author: "",
    content: "",
    isSecret: false
  });

  // 상세 페이지 표시
  if (selectedMessageId) {
    return <GuestBookDetail messageId={selectedMessageId} onBack={() => setSelectedMessageId(null)} />;
  }

  // 예시 방명록 데이터
  const entries: GuestBookEntry[] = [
    {
      id: "1",
      author: "김개발",
      content: "블로그 디자인이 정말 추억돋네요! 싸이월드 시절이 생각나서 너무 좋아요 ㅠㅠ 앞으로도 좋은 포스팅 기대할게요~",
      createdAt: "2024-01-15T10:30:00Z",
      isSecret: false,
      replies: [
        {
          id: "r1",
          content: "감사합니다! 저도 만들면서 추억이 새록새록 났어요 😊",
          createdAt: "2024-01-15T11:00:00Z"
        }
      ]
    },
    {
      id: "2",
      author: "박프론트",
      content: "React TypeScript 포스팅 정말 도움됐습니다! 특히 제네릭 부분이 이해가 잘 안됐는데 설명이 너무 좋았어요",
      createdAt: "2024-01-14T15:20:00Z",
      isSecret: false
    },
    {
      id: "3",
      author: "익명의 방문자",
      content: "비밀글입니다.",
      createdAt: "2024-01-13T09:15:00Z",
      isSecret: true
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 실제 방명록 저장 로직
    console.log("새 방명록:", newEntry);
    setNewEntry({ author: "", content: "", isSecret: false });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* 방명록 작성 폼 */}
      <Card className="bg-gradient-to-br from-slate-800 via-gray-800 to-slate-900 border-2 border-slate-700">
        <div className="p-6">
          <h3 className="text-lg mb-4 text-slate-200 flex items-center gap-2">
            💌 방명록 남기기
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="닉네임"
                value={newEntry.author}
                onChange={(e) => setNewEntry(prev => ({ ...prev, author: e.target.value }))}
                className="bg-slate-700/50 border-slate-600 text-slate-200 placeholder:text-slate-400"
              />
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="secret"
                  checked={newEntry.isSecret}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, isSecret: e.target.checked }))}
                  className="rounded border-slate-600"
                />
                <label htmlFor="secret" className="text-sm text-slate-300 flex items-center gap-1">
                  <Lock className="w-4 h-4" />
                  비밀글
                </label>
              </div>
            </div>
            <Textarea
              placeholder="따뜻한 메시지를 남겨주세요! ✨"
              value={newEntry.content}
              onChange={(e) => setNewEntry(prev => ({ ...prev, content: e.target.value }))}
              className="bg-slate-700/50 border-slate-600 text-slate-200 placeholder:text-slate-400 min-h-[100px]"
            />
            <Button 
              type="submit" 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              disabled={!newEntry.author || !newEntry.content}
            >
              💌 방명록 남기기
            </Button>
          </form>
        </div>
      </Card>

      {/* 방명록 목록 */}
      <div className="space-y-4">
        {entries.map((entry) => (
          <Card 
            key={entry.id} 
            className="bg-slate-800/80 border border-slate-700 shadow-md hover:border-slate-600 transition-colors cursor-pointer"
            onClick={() => setSelectedMessageId(parseInt(entry.id))}
          >
            <div className="p-4">
              <div className="flex items-start gap-3">
                <Avatar className="w-10 h-10 border-2 border-slate-600 shadow">
                  <AvatarFallback className="bg-gradient-to-br from-slate-700 to-gray-700 text-slate-300">
                    <User className="w-5 h-5" />
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-slate-200">{entry.author}</span>
                    {entry.isSecret && (
                      <Lock className="w-4 h-4 text-slate-400" />
                    )}
                    <span className="text-xs text-slate-400">{formatDate(entry.createdAt)}</span>
                  </div>
                  
                  <p className="text-slate-300 leading-relaxed mb-3">
                    {entry.isSecret ? "🔒 비밀글입니다." : entry.content}
                  </p>
                  
                  {!entry.isSecret && (
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="text-pink-400 hover:text-pink-300 hover:bg-pink-900/20 px-2 py-1 h-auto">
                        <Heart className="w-4 h-4 mr-1" />
                        공감
                      </Button>
                      <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300 hover:bg-purple-900/20 px-2 py-1 h-auto">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        답글
                      </Button>
                    </div>
                  )}
                  
                  {/* 답글 */}
                  {entry.replies && entry.replies.length > 0 && (
                    <div className="mt-4 pl-4 border-l-2 border-slate-600 space-y-2">
                      {entry.replies.map((reply) => (
                        <div key={reply.id} className="bg-slate-700/50 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm text-purple-300">👤 블로그 주인</span>
                            <span className="text-xs text-slate-400">{formatDate(reply.createdAt)}</span>
                          </div>
                          <p className="text-sm text-slate-300">{reply.content}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}