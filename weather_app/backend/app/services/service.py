import aiohttp # type: ignore
from backend.app.core.config import settings
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
        "temperature_min": data["main"]["temp_min"],
        "temperature_max": data["main"]["temp_max"],
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

#  get_news_by_city, get_news_by_coordinates
async def get_news_by_city(city: str, units: str = "metric"):
    """Get news data for a specific city."""
    async with aiohttp.ClientSession() as session:
        post_data = {
            "$query": {
                "locationUri": f"http://en.wikipedia.org/wiki/{city}"
            },
            "$filter": {
                "forceMaxDataTimeWindow": "31"
            },
            "apiKey": settings.NEWSAPI_API_KEY,
            "articlesCount": 10,
            "articlesSortBy": "date",
            "resultType": "articles",
            }
        
    #    mock data
    
        data =  {
            "events": [{
            "uri": "8576672100",
            "lang": "eng",
            "isDuplicate": True,
            "date": "2025-03-05",
            "time": "15:15:45",
            "dateTime": "2025-03-05T15:15:45Z",
            "dateTimePub": "2025-03-05T14:45:00Z",
            "dataType": "news",
            "sim": 0,
            "url": "https://aninews.in/videos/world/us-deports-batch-of-8-nepali-nationals-on-first-chartered-flight/",
            "title": "Asia's Leading News Site - India News, Business & Political, National & International, Bollywood, Sports | ANI News",
            "body": "Kathmandu, Nepal, March 5, (ANI): Following the executive order by US President Donald Trump to deport illegal immigrants, a batch of 8 Nepali nationals has been deported back to Kathmandu in a chartered aircraft on March 5, Wednesday. The Gryphon Air's Gulfstream aircraft arrived Tribhuvan ...",
            "source": "aninews.in",
            "authors": "ANI",
            "concepts": "news",
            "image": "https://d3lzcn6mbbadaf.cloudfront.net/media/details/anilogo.jpg",
            "eventUri": None,
            "shares": 0,
            "sentiment": -0.2941176470588235,
            "wgt": 478883745,
            "relevance": 1
        }],
            "totalResults": 480,
            "page": 1,
            "count": 100,
            "pages": 5
        }
        return data 

def format_news_data(data):
    """Format the news data response."""
    return {
        "city": data["name"],
        "country": data.get("sys", {}).get("country", ""),  
        "articles": data.get("articles", []),
        "totalResults": data.get("totalResults", 0),
        "status": data.get("status", ""),
        "articles": [
            {
                "source": data.get("source", {}),
                "author": data.get("author", ""),
                "title": data.get("title", ""),
                "description": data.get("description", ""),
                "url": data.get("url", ""),
                "urlToImage": data.get("urlToImage", ""),
                "publishedAt": data.get("publishedAt", ""),
                "content": data.get("content", ""),
            }
        ]
    }

async def get_news_by_coordinates(lat: float, lon: float, units: str = "metric"):
    """Get news data for specific coordinates."""
    async with aiohttp.ClientSession() as session:
        params = {
            "lat": lat,
            "lon": lon,
            "appid": settings.NEWSAPI_API_KEY,
            "units": units
        }
        
        async with session.get(f"{settings.NEWSAPI_BASE_URL}/coordinates", params=params) as response:
            if response.status != 200:
                raise Exception("Failed to fetch news data")
            data = await response.json()
            return format_news_data(data)   
        