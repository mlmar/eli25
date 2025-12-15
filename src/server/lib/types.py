from typing import Optional
from pydantic import BaseModel

class ArticleSource(BaseModel):
    id: Optional[str] = None
    name: Optional[str] = None

class Article(BaseModel):
    url: Optional[str] = None
    title: Optional[str] = None
    author: Optional[str] = None
    source: Optional[ArticleSource]
    content: Optional[str] = None
    urlToImage: Optional[str] = None
    publishedAt: Optional[str] = None
    summary: Optional[str] = None

class ArticleDBResult(BaseModel): 
    article: Article
    summary: str
    date: str