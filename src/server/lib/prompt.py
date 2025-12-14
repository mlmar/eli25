def get_prompt(article: str) -> str:
    return f"""
    Task:
    - Summarize this article in 1-10 quick bullet points.

    Article:
    {article}
    """