import traceback
from lib.news import process_daily_articles

print('------- PROCESSING DAILY ARTICLES -------')

try:
    process_daily_articles()
    print('------- SUCCESSFULLY PROCESSED DAILY ARTICLES -------')
except:
    print('FAILED: AN ERROR OCCURRED WHILE PROCESSING DAILY ARTICLES')
    traceback.print_exc()