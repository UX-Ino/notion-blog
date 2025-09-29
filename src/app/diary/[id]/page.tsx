import DiaryDetailClient from './DiaryDetailClient';

export const metadata = {
  title: 'Diary Detail | Retro Developer Blog PRD',
  description: '다이어리 상세',
};

export default function DiaryDetailPage({ params }: { params: { id: string } }) {
  return <DiaryDetailClient id={params.id} />;
}

