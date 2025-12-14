import trafilatura

def read_page(url: str) -> str | None:
    """Uses trafilatura library to read page"""
    content = trafilatura.fetch_url(url)
    if not content:
        return None

    text = trafilatura.extract(
        content,
        include_comments=False,
        include_tables=False
    )
    return text
