import { Config } from "@/services/Config";
import { HTTPService } from "@/services/HTTPService";
import type { Article } from "@/types/Article";

export class NewsService {
    /**
     * Fetches explanation from server
     * @param {{ topic: string, audience: string }} data 
     * @returns {string}
     */
    static async getArticleCards(): Promise<Article[]> {
        const response = await HTTPService.get<null, Article[]>(Config.SERVER_URL + '/news');
        return response;
    }
}