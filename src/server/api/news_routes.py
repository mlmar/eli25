from fastapi import APIRouter

import config
from lib import agent
from lib.db.database_table import DatabaseTable
from lib.web import read_page
from service.news_service import get_top_articles
from util.date_util import get_today_pst

router = APIRouter()
articles_table = DatabaseTable(config.SUPABASE_ARTICLES_TABLE)

@router.get('/news')
def get_news():
    """
    Retrieves list of articles from newsapi.org and summarizes them with a hugging face model.
    Results are stored in the db.
    If articles have already been processed, return results from the db.
    """

    today_date = str(get_today_pst())
    print(f'Fetching articles for {today_date}')

    db_response = articles_table.get_table().select('date,article,summary').eq('date', today_date).execute()
    if db_response.data and len(db_response.data):
        print(f'Successfully fetched {len(db_response.data)} articles from database')
        return db_response.data
    else:
        articles = get_top_articles(config.MAX_PAGES)
        data = []
        for article in articles:
            content = read_page(article['url'])
            if content:
                summary = agent.eli25(content)
                data.append({ 
                    'date': today_date, 
                    'article': article,
                    'summary': summary
                })
            else:
                print(f'Skipping article {article['url']}')
                
        articles_table.insert(data)
        return data