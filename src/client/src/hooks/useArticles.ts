import { NewsService } from "@/services/NewsService";
import { useQuery } from "@tanstack/react-query";

type UseArticlesResult = {
    data: Awaited<ReturnType<typeof NewsService.getLatestArticles>>,
    isLoading: boolean,
    isError: boolean
}

export function useArticles(): UseArticlesResult {
    const { data = [], isLoading, isError } = useQuery({
        queryKey: ['news-articles'],
        queryFn: NewsService.getLatestArticles
    })

    return { data, isLoading, isError }
}