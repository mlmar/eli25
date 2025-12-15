from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api import news_routes, static_routes
import config

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        config.VITE_CLIENT_URL
    ],
    allow_credentials=True,  
    allow_methods=['*'],
    allow_headers=['*']
)

app.include_router(news_routes.router, prefix='/api')
app.include_router(static_routes.router)