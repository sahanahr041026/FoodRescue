"""
Pickup Requests Router
======================
Handles NGO food pickup requests, approvals, and handover confirmations.
Will be fully implemented in Phase 10.
"""

from fastapi import APIRouter

router = APIRouter(prefix="/requests", tags=["Pickup Requests"])


@router.get("/status")
def requests_router_status():
    """Placeholder endpoint for requests subsystem"""
    return {"message": "Requests router initialized. Endpoints will be implemented in Phase 10."}
