from pydantic import BaseModel
from config import NEWS_API_TOKEN
from service.http_service import HTTPService
import time
from util.date_util import get_today_pst

news_service = HTTPService('https://newsapi.org/v2')

class ArticleSource(BaseModel):
    id: str = None
    name: str = None

class Article(BaseModel):
    url: str = None
    title: str = None
    author: str = None
    source: ArticleSource
    content: str = None
    urlToImage: str = None
    publishedAt: str = None
    summary: str = None

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