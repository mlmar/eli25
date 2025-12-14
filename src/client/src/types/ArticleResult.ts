export type ArticleResult = {
    article: {
        url: string;
        title: string;
        author: string;
        source: {
            id: string;
            name: string;
        }
        content: string;
        urlToImage: string;
        publishedAt: string;
    };
    date: string;
    summary: string
}