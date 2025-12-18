import { Config } from "@/services/Config";
import { HTTPService } from "@/services/HTTPService";
import type { NewsResult } from "@/types/NewsResult";

export class NewsService {
    /**
     * Fetches explanation from server
     * @returns {NewsResult}
     */
    static async getLatestArticles(date: string | null): Promise<NewsResult> {
        const params = date ? { date } : null;
        const response = await HTTPService.get<{ date: string | null }, NewsResult>(Config.SERVER_URL + '/news', params);
        return response;
    }
}