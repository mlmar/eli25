import os
from transformers import AutoModelForSeq2SeqLM, AutoTokenizer, pipeline

model_id = 'sshleifer/distilbart-cnn-12-6'
tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForSeq2SeqLM.from_pretrained(
    model_id,
    device_map='auto'
)

pipe = pipeline("text2text-generation", model=model, tokenizer=tokenizer)

def generate_text(prompt: str) -> str:
    summary = pipe(prompt)
    return summary[-1]['generated_text']

def get_results(prompt: str) -> str:
    print('\nPrompt:')
    print(prompt)
    content = generate_text(prompt)

    print('\nResults:')
    print(content)
    return content