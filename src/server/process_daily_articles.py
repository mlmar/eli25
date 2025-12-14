from dotenv import load_dotenv
from lib.news import process_daily_articles

load_dotenv()
process_daily_articles()