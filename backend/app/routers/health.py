"""
Health & Monitoring Router
==========================
Handles application health checks and system status probes.
Mounts at `/api/health`.
"""

from datetime import datetime, timezone
from fastapi import APIRouter, Depends
from app.config import Settings, get_settings

router = APIRouter(prefix="/health", tags=["Monitoring"])


@router.get("", summary="System Health Status")
@router.get("/", summary="System Health Status (trailing slash)")
def health_check(settings: Settings = Depends(get_settings)):
    """
    Health Check Endpoint
    ---------------------
    Returns operational status, application version, active environment,
    and current UTC timestamp. Used by frontend health checks and monitoring probes.
    """
    return {
        "status": "ok",
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "environment": settings.ENVIRONMENT,
        "timestamp": datetime.now(timezone.utc).isoformat()
    }
