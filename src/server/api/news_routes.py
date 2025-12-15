from fastapi import APIRouter
import config
from lib.db.database_table import DatabaseTable
from lib.news import ArticleDBResult

router = APIRouter()

@router.get('/news')
def get_news() -> list[ArticleDBResult]:
    return get_latest_articles()

articles_table = DatabaseTable(config.SUPABASE_ARTICLES_TABLE)
def get_latest_articles()  -> list[ArticleDBResult]:
    """Fetches latest article results from the db"""
    date_response = articles_table.get_table().select('date').order('date', desc=True).limit(1).execute()
    if date_response and len(date_response.data) > 0:
        latest_date = date_response.data[0]['date']
        db_response = articles_table.get_table().select('date,article,summary').eq('date', latest_date).execute()
        print(f'Successfulyl fetched {len(db_response.data)} articles for {latest_date} from the db')
        return db_response.data

    return []