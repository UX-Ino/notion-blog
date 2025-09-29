"use client";

import { DiaryDetail } from '@/components/DiaryDetail';
import { useRouter } from 'next/navigation';

export default function DiaryDetailClient({ id }: { id: string }) {
  const router = useRouter();
  const postId = parseInt(id, 10);
  return <DiaryDetail postId={postId} onBack={() => router.back()} />;
}

