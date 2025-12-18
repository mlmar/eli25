# eli25 (explain like i'm 25)

<img width="1920" height="931" alt="image" src="https://github.com/user-attachments/assets/07e7904f-456e-4457-89f9-999d1bb08371" />

-   Hosted at https://eli25.vercel.app
-   Articles are pulled daily from [NewsAPI](https://newsapi.org/)
-   Summarized with hugging face model [sshleifer/distilbart-cnn-12-6](https://huggingface.co/sshleifer/distilbart-cnn-12-6)
-   Results are processed and saved to a Supabase database with Github actions and Docker

## Stack

-   Frontend

    -   [React](https://react.dev/learn)
    -   [TypeScript](typescriptlang.org/cheatsheets/)
    -   [@tanstack/query](https://tanstack.com/query/latest)
    -   [tailwindcss](https://tailwindcss.com/)

-   Backend
    -   Services
        -   [x] Retrieve news articles from newsapi.org
    -   Supabase
        -   [x] articles table - Save articles and summaries to Postgres db
    -   Summaries
        -   [x] Parse article text with [trafilatura](https://trafilatura.readthedocs.io/en/latest/)
        -   [x] Summarize article text with hugging face model [sshleifer/distilbart-cnn-12-6](https://huggingface.co/sshleifer/distilbart-cnn-12-6)
    -   Automation
        -   [x] Run Docker compose or process_daily_articles.py script to process daily articles
        -   [x] Automate daily summaries with Github actions
    -   fastapi routes for:
        -   [x] Latest articles and summaries
        -   [x] Static site

## Installation

Use the package manager [pip](https://pip.pypa.io/en/stable/) to install.

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r src/server/requirements.txt
pip install
npm install --prefix ./src/client
```

Create an .env file in the root directory with the folllowing contents:

```properties
DEV=True
VITE_CLIENT_URL=https://localhost:3000
VITE_SERVER_URL=https://localhost:3300/api
PYTHONPATH=./src/server
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
HF_TOKEN=YOUR_HF_TOKEN
NEWS_API_TOKEN=YOUR_NEWS_API_TOKEN
SUPABASE_URL=YOUR_SUPABASE_URL
SUPABASE_KEY=YOUR_SUPABASE_KEY
```

## Run Server

```bash
cd src/server
fastapi dev main.py --port 3300
```

## Run Client

```bash
cd src/client
npm run dev
```
