from transformers import AutoModelForSeq2SeqLM, AutoTokenizer, pipeline

import config

__pipe = None
def get_pipeline():
    """Initializes pipeline model"""
    global __pipe
    if __pipe is None and config.MODEL:
        model_id = config.MODEL
        tokenizer = AutoTokenizer.from_pretrained(model_id)
        model = AutoModelForSeq2SeqLM.from_pretrained(
            model_id,
            device_map='auto'
        )
        __pipe = pipeline("text2text-generation", model=model, tokenizer=tokenizer)

    return __pipe

def generate_text(prompt: str) -> str:
    pipe = get_pipeline()
    summary = pipe(prompt)
    return summary[-1]['generated_text']

def get_results(prompt: str) -> str:
    print('\nPrompt:')
    print(prompt)
    content = generate_text(prompt)

    print('\nResults:')
    print(content)
    return content