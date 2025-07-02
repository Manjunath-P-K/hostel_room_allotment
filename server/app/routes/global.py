"""
Global (public) routes for the hostel room allotment system
"""

from fastapi import APIRouter

router = APIRouter(prefix="/global", tags=["Global"])


@router.get("/")
async def global_routes():
    """Public routes - currently empty but ready for future features"""
    return {
        "message": "Global public routes - available for future features",
        "available_endpoints": [],
        "note": "This section can be expanded with public features like room availability, general information, etc."
    }
