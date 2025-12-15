from pathlib import Path
from fastapi import APIRouter
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
import config

router = APIRouter()

# Override routes for static files if production
if not config.DEV:
    frontend_path = Path(__file__).parent.parent / 'static'
    router.mount('/static', StaticFiles(directory=frontend_path, html=True), name='static')

    # Serve index.html for all other non-API routes
    @router.get('/{full_path:path}')
    async def serve_frontend(full_path: str):
        index_html = FileResponse(frontend_path / 'index.html')
        if full_path or full_path.startswith('api'):
            # If static file exists then return it, otherwise return index
            if (frontend_path / full_path).exists():
                return FileResponse(frontend_path / full_path)
            else:
                return index_html
        return index_html