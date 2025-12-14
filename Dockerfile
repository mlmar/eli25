FROM python:3.13-slim
WORKDIR /app/server

# Install runtime dependencies
COPY src/server/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Run 
CMD ["python", "process_daily_articles"]