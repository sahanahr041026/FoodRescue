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

from datetime import datetime, timezone
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# 1. Initialize FastAPI Application
app = FastAPI(
    title="FoodRescue API",
    description="REST API for FoodRescue surplus food redistribution platform.",
    version="0.1.0",
    docs_url="/docs",      # Interactive Swagger UI documentation
    redoc_url="/redoc"    # Alternative ReDoc documentation
)

# 2. Configure CORS (Cross-Origin Resource Sharing)
# In development, our Vite React frontend runs at http://localhost:5173
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,             # Which domains can talk to this backend
    allow_credentials=True,
    allow_methods=["*"],               # Allow all HTTP methods: GET, POST, PUT, DELETE
    allow_headers=["*"],               # Allow all request headers (e.g. Authorization)
)

# 3. Root Endpoint
@app.get("/", tags=["General"])
def read_root():
    """
    Root endpoint: Provides a friendly welcome message and links to docs.
    """
    return {
        "message": "Welcome to FoodRescue API!",
        "documentation": "/docs",
        "health_check": "/api/health",
        "version": "0.1.0"
    }

# 4. Health Check Endpoint
@app.get("/api/health", tags=["Monitoring"])
def health_check():
    """
    Health Check Endpoint:
    Used by frontend, monitoring tools, or container orchestrators
    to verify that the backend server is running and responsive.
    """
    return {
        "status": "ok",
        "service": "FoodRescue API",
        "version": "0.1.0",
        "timestamp": datetime.now(timezone.utc).isoformat()
    }
