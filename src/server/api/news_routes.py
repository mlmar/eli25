from fastapi import APIRouter
from lib.news import ArticleDBResult, get_latest_articles

router = APIRouter()

@router.get('/news')
def get_news() -> list[ArticleDBResult]:
    return get_latest_articles()