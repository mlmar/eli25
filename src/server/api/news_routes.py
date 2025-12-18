from fastapi import APIRouter
from pydantic import BaseModel
import config
from lib.db.client import get_client
from lib.db.database_table import DatabaseTable
from lib.types import ArticleDBResult

class NewsResult(BaseModel):
    results: list[ArticleDBResult]
    date: str | None
    prev_date: str | None
    next_date: str | None

router = APIRouter()

@router.get('/news')
def get_news(date: str | None = None) -> NewsResult:
    if date:
        return get_articles(date)
    else:
        return get_latest_articles()

articles_table = DatabaseTable(config.SUPABASE_ARTICLES_TABLE)
def get_latest_articles() -> NewsResult:
    """Fetches latest article results from the db"""
    date_response = articles_table.get_table().select('date').order('date', desc=True).limit(1).execute()
    if date_response and len(date_response.data) > 0:
        latest_date = date_response.data[0]['date']
        return get_articles(latest_date)

    return {
        'results': [],
        'date': None,
        'prev_date': None,
        'next_date': None
    }

def get_articles(target_date: str) -> NewsResult:
    dates_response = get_client().rpc('get_dates').execute()

    dates = []
    if dates_response  and len(dates_response.data) > 0:
        dates = [row['date'] for row in dates_response.data]

    if target_date in dates:
        target_date_index = dates.index(target_date)
        db_response = articles_table.get_table().select('date,article,summary').eq('date', target_date).execute()
        print(f'Successfully fetched {len(db_response.data)} articles for {target_date} from the db')
        return {
            'results': db_response.data,
            'date': target_date,
            'prev_date': dates[target_date_index - 1] if (target_date_index - 1) >= 0 else None,
            'next_date': dates[target_date_index + 1] if (target_date_index + 1) < len(dates) else None
        }