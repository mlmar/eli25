import { NewsService } from "@/services/NewsService";
import { getTodaysDateString } from "@/util/date";
import { useQuery } from "@tanstack/react-query";

type UseArticlesResult = {
    data: Awaited<ReturnType<typeof NewsService.getLatestArticles>> | undefined,
    isLoading: boolean,
    isError: boolean
}

const DEFAULT_DATE = getTodaysDateString();
export function useArticles(date: string = DEFAULT_DATE): UseArticlesResult {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['news-articles', date],
        queryFn: async () => NewsService.getArticles(date)
    })

    return { data, isLoading, isError }
}