from lib import hugging_face
from lib.prompt import get_prompt

def eli25(content: str) -> str:
    prompt = get_prompt(content)
    return hugging_face.get_results(prompt)