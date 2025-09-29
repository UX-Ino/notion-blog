"use client";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import Image from "next/image";
import {
  Camera,
  Heart,
  MessageCircle,
  Calendar,
  Image as ImageIcon,
  Download,
  Share,
  Filter,
} from "lucide-react";
import { useState } from "react";
// Note: images are loaded from Unsplash via remote URLs configured in next.config.mjs

interface Photo {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  createdAt: string;
  likes: number;
  comments: number;
  tags: string[];
}

export function PhotoAlbum() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  // 더미 데이터
  const photos: Photo[] = [
    {
      id: 1,
      title: "코딩하는 일상",
      description: "오늘도 열심히 개발 중! TypeScript와 React로 프로젝트 만들기 ✨",
      imageUrl:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjBjb21wdXRlciUyMHNldHVwfGVufDF8fHx8MTc1ODc2NTIwMXww&ixlib=rb-4.1.0&q=80&w=1080",
      category: "개발",
      createdAt: "2024.01.15",
      likes: 42,
      comments: 8,
      tags: ["코딩", "개발환경", "TypeScript"],
    },
    {
      id: 2,
      title: "개발자 워크스페이스",
      description: "깔끔하게 정리된 나의 개발 공간 🖥️",
      imageUrl:
        "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RlciUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NTg3NjUyMDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "워크스페이스",
      createdAt: "2024.01.12",
      likes: 28,
      comments: 5,
      tags: ["워크스페이스", "개발환경", "모니터"],
    },
    {
      id: 3,
      title: "프로젝트 완성!",
      description: "드디어 완성한 리액트 프로젝트 🎉 몇 주간의 노력이 결실을 맺었어요",
      imageUrl:
        "https://images.unsplash.com/photo-1559028006-448665bd7c7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmFtbWluZyUyMGNlbGVicmF0aW9ufGVufDF8fHx8MTc1ODc2NTIwMXww&ixlib=rb-4.1.0&q=80&w=1080",
      category: "성취",
      createdAt: "2024.01.10",
      likes: 67,
      comments: 12,
      tags: ["프로젝트", "완성", "성취감"],
    },
    {
      id: 4,
      title: "개발 서적들",
      description: "항상 공부하는 개발자가 되기 위해 📚",
      imageUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmFtbWluZyUyMGJvb2tzfGVufDF8fHx8MTc1ODc2NTIwMXww&ixlib=rb-4.1.0&q=80&w=1080",
      category: "공부",
      createdAt: "2024.01.08",
      likes: 35,
      comments: 7,
      tags: ["독서", "공부", "개발서적"],
    },
    {
      id: 5,
      title: "팀 프로젝트 모임",
      description: "함께하는 개발이 더 재미있어요! 팀원들과의 소중한 시간 👥",
      imageUrl:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwbWVldGluZyUyMGRldmVsb3BlcnN8ZW58MXx8fHwxNzU4NzY1MjAxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "팀워크",
      createdAt: "2024.01.05",
      likes: 53,
      comments: 15,
      tags: ["팀워크", "협업", "미팅"],
    },
    {
      id: 6,
      title: "커피와 코딩",
      description: "개발자의 필수템 ☕ 코딩할 때 빠질 수 없는 커피",
      imageUrl:
        "https://images.unsplash.com/photo-1542831371-29b0f74f9713?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBjb2RpbmclMjBkZXNrfGVufDF8fHx8MTc1ODc2NTIwMXww&ixlib=rb-4.1.0&q=80&w=1080",
      category: "일상",
      createdAt: "2024.01.03",
      likes: 41,
      comments: 9,
      tags: ["커피", "일상", "휴식"],
    },
  ];

  const categories = ["all", "개발", "워크스페이스", "성취", "공부", "팀워크", "일상"];

  const filteredPhotos =
    selectedCategory === "all"
      ? photos
      : photos.filter((photo) => photo.category === selectedCategory);

  const formatDate = (dateString: string) => {
    return dateString;
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <Card className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 border-2 border-slate-700">
        <div className="p-6 text-center">
          <h1 className="text-2xl mb-2 text-slate-100 flex items-center justify-center gap-2">
            📷 추억의 사진첩
          </h1>
          <p className="text-slate-300">개발자의 일상과 성장의 순간들을 담았습니다</p>
        </div>
      </Card>

      {/* 카테고리 필터 */}
      <Card className="bg-slate-800/80 border border-slate-700">
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-sm text-slate-300">카테고리</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                size="sm"
                variant={selectedCategory === category ? "default" : "ghost"}
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    : "text-slate-300 hover:bg-slate-700 hover:text-white"
                }
              >
                {category === "all" ? "전체" : category}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* 사진 갤러리 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPhotos.map((photo) => (
          <Card
            key={photo.id}
            className="bg-slate-800/80 border border-slate-700 hover:border-slate-600 transition-all cursor-pointer group"
            onClick={() => setSelectedPhoto(photo)}
          >
            <div className="aspect-square relative overflow-hidden rounded-t-lg">
              <Image
                src={photo.imageUrl}
                alt={photo.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                priority={photo.id <= 3}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-3 text-white text-sm">
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {photo.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      {photo.comments}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Badge
                  variant="secondary"
                  className="bg-purple-900/50 text-purple-300 border border-purple-700 text-xs"
                >
                  {photo.category}
                </Badge>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {photo.createdAt}
                </span>
              </div>

              <h3 className="text-slate-200 mb-2">{photo.title}</h3>
              <p className="text-sm text-slate-400 line-clamp-2">{photo.description}</p>

              <div className="flex flex-wrap gap-1 mt-3">
                {photo.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* 사진 상세 모달 */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="bg-slate-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto border border-slate-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <Image
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.title}
                width={1600}
                height={900}
                className="w-full h-64 md:h-96 object-cover rounded-t-lg"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-slate-700/80 hover:bg-slate-600"
                >
                  <Share className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-slate-700/80 hover:bg-slate-600"
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Badge
                    variant="secondary"
                    className="bg-purple-900/50 text-purple-300 border border-purple-700"
                  >
                    {selectedPhoto.category}
                  </Badge>
                  <span className="text-sm text-slate-400 flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {selectedPhoto.createdAt}
                  </span>
                </div>
              </div>

              <h2 className="text-xl text-slate-100 mb-3">{selectedPhoto.title}</h2>
              <p className="text-slate-300 leading-relaxed mb-4">{selectedPhoto.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {selectedPhoto.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm bg-slate-700 text-slate-300 px-3 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-pink-400 hover:text-pink-300 hover:bg-pink-900/20"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    {selectedPhoto.likes}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {selectedPhoto.comments}
                  </Button>
                </div>

                <Button
                  variant="outline"
                  onClick={() => setSelectedPhoto(null)}
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  닫기
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 사진 업로드 버튼 */}
      <div className="text-center">
        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
          <Camera className="w-4 h-4 mr-2" />새 사진 업로드
        </Button>
      </div>
    </div>
  );
}
