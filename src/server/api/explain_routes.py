from fastapi import APIRouter, Depends
from pydantic import BaseModel
from api.rate_limiter import RateLimiter
import config
from lib import agent

router = APIRouter()

class Data(BaseModel):
    topic: str
    audience: str

@router.post('/explain')
def explain_route(data: Data, limiter = Depends(RateLimiter(requests_limit=2, time_window=10))):
    max_length = 200
    if(len(data.topic) > max_length or len(data.audience) > max_length):
        return {
            'result': "You're asking for too much!"
        }

    result = agent.eli25(data.topic, data.audience)
    return {
        'result': result
    }