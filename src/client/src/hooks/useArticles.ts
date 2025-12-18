import { NewsService } from "@/services/NewsService";
import { useQuery } from "@tanstack/react-query";

type UseArticlesResult = {
    data: Awaited<ReturnType<typeof NewsService.getLatestArticles>> | undefined,
    isLoading: boolean,
    isError: boolean
}

export function useArticles(date: string | null): UseArticlesResult {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['news-articles', date],
        queryFn: async () => NewsService.getLatestArticles(date)
    })

    return { data, isLoading, isError }
}