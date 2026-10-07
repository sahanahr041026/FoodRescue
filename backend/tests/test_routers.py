from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_auth_router_mounted():
    """Verify auth router is mounted under /api/auth"""
    response = client.get("/api/auth/status")
    assert response.status_code == 200
    assert "Auth router initialized" in response.json()["message"]

def test_listings_router_mounted():
    """Verify listings router is mounted under /api/listings"""
    response = client.get("/api/listings/status")
    assert response.status_code == 200
    assert "Listings router initialized" in response.json()["message"]

def test_requests_router_mounted():
    """Verify requests router is mounted under /api/requests"""
    response = client.get("/api/requests/status")
    assert response.status_code == 200
    assert "Requests router initialized" in response.json()["message"]

def test_admin_router_mounted():
    """Verify admin router is mounted under /api/admin"""
    response = client.get("/api/admin/status")
    assert response.status_code == 200
    assert "Admin router initialized" in response.json()["message"]
