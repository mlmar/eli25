import { NewsPage } from '@/features/NewsPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/$date')({
    component: NewsPage
});
