"""
Authentication & Authorization Router
=====================================
Handles user registration, login, and profile fetching.
Will be fully implemented in Phase 5 & Phase 6.
"""

from fastapi import APIRouter

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.get("/status")
def auth_router_status():
    """Placeholder endpoint for auth subsystem"""
    return {"message": "Auth router initialized. Endpoints will be implemented in Phase 5."}
