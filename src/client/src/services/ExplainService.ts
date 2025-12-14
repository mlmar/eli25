import { Config } from "@/services/Config";
import { HTTPService } from "@/services/HTTPService";

export class ExplainService {
    /**
     * Fetches explanation from server
     * @param {{ topic: string, audience: string }} data 
     * @returns {string}
     */
    static async explain(data: { topic: string, audience: string }): Promise<string> {
        try {
            const response = await HTTPService.post<typeof data, { result: string }>(Config.SERVER_URL + '/explain', data);
            return response.result;
        } catch (error) {
            console.error(error);
            return 'Something went wrong...';
        }
    }
}