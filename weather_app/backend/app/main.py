from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import uvicorn
from backend.app.api import weather
from backend.app.core.config import settings
import os
import fire
from backend.app.api import news


app = FastAPI(title="Weather App API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(weather.router, prefix="/api/weather", tags=["weather"])
app.include_router(news.router, prefix="/api/news", tags=["news"])

frontend_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "../frontend")
if os.path.exists(frontend_dir):
    app.mount("/", StaticFiles(directory=frontend_dir, html=True), name="frontend")

@app.get("/health")
def health_check():
    return {"status": "ok"}

def runserver():
    """
    Run the FastAPI server using uvicorn.
    """
    uvicorn.run("backend.app.main:app", host="0.0.0.0", port=8000, reload=True)

if __name__ == "__main__":
    fire.Fire({"runserver": runserver})
