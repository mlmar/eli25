from fastapi import APIRouter
from pydantic import BaseModel

import config
from service.http_service import HTTPService

router = APIRouter()

graphql_service = HTTPService(config.SUPABASE_URL)

class Data(BaseModel):
    query: str

@router.post('/graphql')
def graphql(data: Data):
    response = graphql_service.post('/graphql/v1', 
        data={
            'query': data.query
        }, 
        headers={
            'apiKey': config.SUPABASE_KEY,
        }
    )
    return response