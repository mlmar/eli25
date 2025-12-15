import { Config } from "@/services/Config";
import { HTTPService } from "@/services/HTTPService";
import type { ArticleResult } from "@/types/ArticleResult";

export class NewsService {
    /**
     * Fetches explanation from server
     * @returns {ArticleResult[]}
     */
    static async getLatestArticles(): Promise<ArticleResult[]> {
        const response = await HTTPService.get<null, ArticleResult[]>(Config.SERVER_URL + '/news');
        return response;
    }
}