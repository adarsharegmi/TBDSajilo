import aiohttp
from core.config import settings
from datetime import datetime

async def get_weather_by_city(city: str, units: str = "metric"):
    """Get weather data for a specific city."""
    async with aiohttp.ClientSession() as session:
        params = {
            "q": city,
            "appid": settings.OPENWEATHERMAP_API_KEY,
            "units": units
        }
        
        async with session.get(f"{settings.OPENWEATHERMAP_BASE_URL}/weather", params=params) as response:
            if response.status != 200:
                raise Exception("Failed to fetch weather data")
            
            data = await response.json()
            return format_weather_data(data)

async def get_weather_by_coordinates(lat: float, lon: float, units: str = "metric"):
    """Get weather data for specific coordinates."""
    async with aiohttp.ClientSession() as session:
        params = {
            "lat": lat,
            "lon": lon,
            "appid": settings.OPENWEATHERMAP_API_KEY,
            "units": units
        }
        
        async with session.get(f"{settings.OPENWEATHERMAP_BASE_URL}/weather", params=params) as response:
            if response.status != 200:
                raise Exception("Failed to fetch weather data")
            
            data = await response.json()
            return format_weather_data(data)

def format_weather_data(data):
    """Format the weather data response."""
    return {
        "city": data["name"],
        "country": data.get("sys", {}).get("country", ""),
        "temperature": data["main"]["temp"],
        "feels_like": data["main"]["feels_like"],
        "humidity": data["main"]["humidity"],
        "pressure": data["main"]["pressure"],
        "weather_condition": data["weather"][0]["main"],
        "weather_description": data["weather"][0]["description"],
        "weather_icon": data["weather"][0]["icon"],
        "weather_id": data["weather"][0]["id"],
        "wind_speed": data["wind"]["speed"],
        "wind_direction": data["wind"].get("deg", 0),
        "cloudiness": data.get("clouds", {}).get("all", 0),
        "sunrise": datetime.fromtimestamp(data["sys"]["sunrise"]).strftime("%H:%M"),
        "sunset": datetime.fromtimestamp(data["sys"]["sunset"]).strftime("%H:%M"),
        "timezone": data["timezone"],
        "visibility": data.get("visibility", 0),
        "units": "metric" if data["main"]["temp"] < 50 else "imperial"
    }