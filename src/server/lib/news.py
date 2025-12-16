from datetime import date
import traceback

import config
from lib import agent
from lib.db.database_table import DatabaseTable
from lib.web import read_page
from service.news_service import get_top_articles
from lib.types import ArticleDBResult
from util.date_util import get_today_pst

articles_table = DatabaseTable(config.SUPABASE_ARTICLES_TABLE)

def process_daily_articles() -> list[ArticleDBResult]:
    """Processes daily articles"""
    today_date = get_today_pst()
    return process_articles(today_date)

def process_articles(target_date: date) -> list[ArticleDBResult]:
    """
    Retrieves list of articles from newsapi.org and summarizes them with a hugging face model.
    Results are stored in the db.
    If articles have already been processed, return results from the db.
    """

    target_date_str = str(target_date)
    print(f'Fetching articles for {target_date_str}')

    db_response = articles_table.get_table().select('date,article,summary').eq('date', target_date_str).execute()
    if db_response.data and len(db_response.data):
        print(f'Successfully fetched {len(db_response.data)} articles from database')
        return db_response.data
    else:
        articles = get_top_articles(config.MAX_PAGES)
        data = []
        for article in articles:
            try:
                content = read_page(article['url'])
                if content:
                    summary = agent.eli25(content)
                    data.append({ 
                        'date': target_date_str, 
                        'article': article,
                        'summary': summary
                    })
                    articles_table.insert(data[-1])
            except:
                traceback.print_exc()
                print(f'Failed to summarize {article['url']}')
                
        print(f'Successfully processed {len(data)} articles')
        return data