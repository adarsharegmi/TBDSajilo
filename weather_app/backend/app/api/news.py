from fastapi import APIRouter, HTTPException, Query
from backend.app.services.service import get_news_by_city, get_news_by_coordinates
from typing import Optional

router = APIRouter()

@router.get("/city/{city}")
async def get_city_news(city: str, units: Optional[str] = "metric"):
    """Get news for a specific city"""
    try:
        news_data = await get_news_by_city(city, units)
        return news_data
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"City not found: {str(e)}")

@router.get("/coordinates")
async def get_coordinates_news(
    lat: float = Query(..., description="Latitude of the location"), 
    lon: float = Query(..., description="Longitude of the location"), 
    category: Optional[str] = Query(None, description="Category of news to filter by")
):
    """Get weather for specified coordinates"""
    try:
        news_data = await get_news_by_coordinates(lat, lon, category)
        return news_data
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Location not found: {str(e)}")
    
@router.get("/location/coordinates")
async def get_location_by_coordinates(
    lat: float = Query(..., description="Latitude of the location"), 
    lon: float = Query(..., description="Longitude of the location")
):
    """Get location data for specified coordinates"""
    try:
        location_data = await get_location_by_coordinates(lat, lon)
        return location_data
    except Exception as e:
            raise HTTPException(status_code=404, detail=f"Location not found: {str(e)}")
    
@router.get("/location/city/{city}")
async def get_location_by_city(
    city: str 
):
    """Get location data for specified city"""
    try:
        location_data = await get_location_by_city(city)
        return location_data
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Location not found: {str(e)}")