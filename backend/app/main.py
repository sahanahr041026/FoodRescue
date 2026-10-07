"""
FoodRescue Backend — Main Application Entry Point
=================================================
This file creates and configures the FastAPI application instance.

What is FastAPI?
----------------
FastAPI is a modern, high-performance web framework for building APIs with Python 3.10+
based on standard Python type hints. It automatically validates incoming data,
converts responses to JSON, and generates interactive Swagger documentation at /docs.

What is CORS?
-------------
Cross-Origin Resource Sharing (CORS) is a browser security rule.
When your React frontend runs on http://localhost:5173 and tries to fetch data from
http://localhost:8000, the browser blocks the request unless the backend explicitly
whitelists the frontend's origin in CORS headers. We do that below with CORSMiddleware.
"""

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from app.config import get_settings
from app.routers import health, auth, listings, requests, admin
from app.utils.exceptions import FoodRescueException

# Load centralized settings
settings = get_settings()

# 1. Initialize FastAPI Application
app = FastAPI(
    title=settings.PROJECT_NAME,
    description="REST API for FoodRescue surplus food redistribution platform.",
    version=settings.VERSION,
    docs_url="/docs",      # Interactive Swagger UI documentation
    redoc_url="/redoc"    # Alternative ReDoc documentation
)

# 2. Configure CORS (Cross-Origin Resource Sharing)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,  # Whitelisted origins from settings (.env)
    allow_credentials=True,
    allow_methods=["*"],                  # Allow all HTTP methods: GET, POST, PUT, DELETE
    allow_headers=["*"],                  # Allow all request headers
)

# 3. Global Exception Handlers
@app.exception_handler(FoodRescueException)
async def domain_exception_handler(request: Request, exc: FoodRescueException):
    """
    Catches all custom FoodRescue domain exceptions and transforms them
    into a standardized, predictable JSON error envelope.
    """
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": {
                "code": exc.code,
                "message": exc.message,
                "details": exc.details,
            }
        },
    )


@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception):
    """
    Safety net: Catches any unhandled Python exception.
    Prevents leaking internal stack traces or database connection details to clients.
    """
    return JSONResponse(
        status_code=500,
        content={
            "error": {
                "code": "INTERNAL_SERVER_ERROR",
                "message": "An unexpected server error occurred. Please try again later.",
                "details": None,
            }
        },
    )

# 4. Mount Modular API Routers
# All API routers are mounted under the '/api' prefix
app.include_router(health.router, prefix="/api")
app.include_router(auth.router, prefix="/api")
app.include_router(listings.router, prefix="/api")
app.include_router(requests.router, prefix="/api")
app.include_router(admin.router, prefix="/api")

# 5. Root Endpoint
@app.get("/", tags=["General"])
def read_root():
    """
    Root endpoint: Provides a friendly welcome message and links to docs.
    """
    return {
        "message": "Welcome to FoodRescue API!",
        "documentation": "/docs",
        "health_check": "/api/health",
        "version": settings.VERSION
    }
