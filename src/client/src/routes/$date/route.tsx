import { NewsPage } from '@/features/NewsPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/$date')({
    component: NewsPage,
    validateSearch: (search: Record<string, unknown>) => {
        return {
            item: search?.item ? parseInt(search.item as string) : 0,
            prev: search?.prev ? parseInt(search.prev as string) : 0
        };
    }
});
