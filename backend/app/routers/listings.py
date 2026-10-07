"""
Food Listings Router
====================
Handles surplus food listing CRUD operations, searching, and filtering.
Will be fully implemented in Phase 8 & Phase 9.
"""

from fastapi import APIRouter

router = APIRouter(prefix="/listings", tags=["Food Listings"])


@router.get("/status")
def listings_router_status():
    """Placeholder endpoint for listings subsystem"""
    return {"message": "Listings router initialized. Endpoints will be implemented in Phase 8."}
