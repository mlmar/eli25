from dotenv import load_dotenv
import os

load_dotenv()
DEV = os.environ.get('DEV')
VITE_CLIENT_URL = os.environ.get('VITE_CLIENT_URL')
NEWS_API_TOKEN = os.environ.get('NEWS_API_TOKEN')
SUPABASE_URL = os.environ.get('SUPABASE_URL')
SUPABASE_KEY = os.environ.get('SUPABASE_KEY')
HF_TOKEN = os.environ.get('HF_TOKEN')
MODEL = os.environ.get('MODEL')

SUPABASE_ARTICLES_TABLE = 'articles'
MAX_PAGES = 2

print('Config loaded')
print(f'VITE_CLIENT_URL: {VITE_CLIENT_URL}')
print(f'MODEL: {MODEL}')