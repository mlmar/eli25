from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api import explain_routes, news_routes, static_routes
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

app.include_router(static_routes.router)
# app.include_router(explain_routes.router, prefix='/api')
app.include_router(news_routes.router, prefix='/api')


@app.get('/')
def root():
    return 'Root!'