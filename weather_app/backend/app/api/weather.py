from fastapi import APIRouter, HTTPException, Query
from backend.app.services.service import get_weather_by_city, get_weather_by_coordinates
from typing import Optional

router = APIRouter()

@router.get("/city/{city}")
async def get_city_weather(city: str, units: Optional[str] = "metric"):
    """Get weather for a specific city"""
    try:
        weather_data = await get_weather_by_city(city, units)
        return weather_data
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"City not found: {str(e)}")

@router.get("/coordinates")
async def get_coordinates_weather(
    lat: float = Query(..., description="Latitude of the location"), 
    lon: float = Query(..., description="Longitude of the location"), 
    units: str = Query("metric", description="Units for temperature")
):
    """Get weather for specified coordinates"""
    try:
        weather_data = await get_weather_by_coordinates(lat, lon, units)
        return weather_data
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Location not found: {str(e)}")