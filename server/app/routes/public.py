"""
Public routes for the hostel room allotment system
"""

from fastapi import APIRouter
from ..utils import get_allotment_data, get_room_status

router = APIRouter(prefix="/global", tags=["Public"])


@router.get("/")
async def public_routes():
    """Public routes - currently empty but ready for future features"""
    return {
        "message": "Global public routes - available for future features",
        "available_endpoints": ["/allotment-data", "/room-status"],
        "note": "This section can be expanded with public features like room availability, general information, etc."
    }


@router.get("/allotment-data")
async def get_public_allotment_data():
    """Get room allotment data for public viewing (read-only)"""
    return get_allotment_data()


@router.get("/room-status")
async def get_public_room_status():
    """Get room status for public viewing (read-only)"""
    return get_room_status()
