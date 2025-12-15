from config import NEWS_API_TOKEN
from service.http_service import HTTPService
import time
from lib.types import Article

news_service = HTTPService('https://newsapi.org/v2')


def get_top_articles(pages: int = 1) -> list[Article]:
    articles = []
    for i in range(0, pages):
        print(f'Fetching page {i+1}')
        options = {
            'apiKey': NEWS_API_TOKEN,
            'country': 'us',
            'category': 'science',
            'page': i + 1
        }
        response = news_service.get('/top-headlines', options)
        for article in response['articles']:
            articles.append(article)

        time.sleep(0.6)

    print(f'Successfully fetched {len(articles)} articles ')
    return articles