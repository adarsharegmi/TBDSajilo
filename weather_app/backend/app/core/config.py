
import os
from dotenv import load_dotenv
from pydantic-settings import BaseSettings

load_dotenv()

class Settings(BaseSettings):
    OPENWEATHERMAP_API_KEY: str = os.getenv("OPENWEATHERMAP_API_KEY", "")
    OPENWEATHERMAP_BASE_URL: str = "https://api.openweathermap.org/data/2.5"
    OPENWEATHERMAP_GEO_URL: str = "http://api.openweathermap.org/geo/1.0"
    DEFAULT_UNITS: str = "metric"

    class Config:
        env_file = ".env"

settings = Settings()