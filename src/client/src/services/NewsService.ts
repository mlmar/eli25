import { Config } from "@/services/Config";
import { HTTPService } from "@/services/HTTPService";
import type { ArticleResult } from "@/types/ArticleResult";

export class NewsService {
    /**
     * Fetches explanation from server
     * @param {{ topic: string, audience: string }} data 
     * @returns {string}
     */
    static async getArticleCards(): Promise<ArticleResult[]> {
        const response = await HTTPService.get<null, ArticleResult[]>(Config.SERVER_URL + '/news');
        return response;
    }
}