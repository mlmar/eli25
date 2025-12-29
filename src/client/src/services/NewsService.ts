import { Config } from "@/services/Config";
import { HTTPService } from "@/services/HTTPService";
import type { NewsResult } from "@/types/NewsResult";
import { addDaysToDate, getTodaysDate, parseDateString, stringifyDate } from "@/util/date";

type GraphQLResponse = {
    data: {
        articlesCollection: {
            edges: {
                node: {
                    date: string, article: string, summary: string
                }
            }[]
        }
    }
}

export class NewsService {
    /**
     * Fetches explanation from server
     * @returns {NewsResult}
     */
    static async getLatestArticles(date: string | null): Promise<NewsResult> {
        const params = date ? { date } : null;
        const response = await HTTPService.get<{ date: string } | null, NewsResult>(Config.SERVER_URL + '/news', params);
        return response;
    }

    static async getArticles(date: string): Promise<NewsResult> {
        const response = await HTTPService.post<{ query: string }, GraphQLResponse>(Config.SERVER_URL + '/graphql', {
            query: `
                query {
                    articlesCollection(filter: { date: {eq: "${date}"}}) {
                            edges {
                            node {
                                date,
                                article,
                                summary
                            }
                        }
                    }
                }
            `
        });
        const results = response.data.articlesCollection.edges.map(({ node }) => {
            return {
                date: node.date,
                article: JSON.parse(node.article),
                summary: node.summary
            }
        });

        const dateObj = parseDateString(date);
        const hasNext = getTodaysDate() > dateObj;

        return {
            results,
            date,
            prev_date: stringifyDate(addDaysToDate(dateObj, -1)),
            next_date: hasNext ? stringifyDate(addDaysToDate(dateObj, 1)) : null
        };
    }
}