from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_read_root():
    """Verify root endpoint returns 200 OK and valid JSON"""
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert "message" in data
    assert data["message"] == "Welcome to FoodRescue API!"

def test_health_check():
    """Verify healthcheck endpoint returns status 'ok' and timestamp"""
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert data["service"] == "FoodRescue API"
    assert "timestamp" in data
