import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import DiaryList from '@/components/DiaryList';

export const metadata = {
  title: 'Diary | Retro Developer Blog PRD',
  description: '다이어리 목록/상세',
};

const categories = ['React', 'TypeScript', 'CSS', 'Next.js', '개발도구'];

export default function DiaryPage() {
  return (
    <div className="space-y-6">
      {/* 페이지 상단 검색/필터 래퍼 (서버 컴포넌트, 링크 기반) */}
      <Card className="bg-gradient-to-r from-slate-800 to-gray-800 border-2 border-slate-700">
        <div className="p-4">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                readOnly
                value="검색은 준비 중입니다"
                className="pl-10 bg-slate-700/50 border-slate-600 text-slate-200 placeholder:text-slate-400 cursor-not-allowed"
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-blue-400">카테고리:</span>
              {categories.map((c) => (
                <Link key={c} href={`/diary?category=${encodeURIComponent(c)}`}>
                  <Badge className="bg-slate-700 text-blue-300 border border-slate-600 hover:bg-slate-600 cursor-pointer">
                    {c}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* 목록 + 트렌딩 + 헤더는 DiaryList 내부에 포함 */}
      <DiaryList />
    </div>
  );
}

