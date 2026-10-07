from fastapi import APIRouter
from fastapi.testclient import TestClient
from app.main import app
from app.utils.exceptions import NotFoundException, ConflictException

# Test router to trigger exceptions (named mock_router to avoid pytest collection warning)
mock_router = APIRouter(prefix="/mock-errors")

@mock_router.get("/not-found")
def trigger_not_found():
    raise NotFoundException(message="Listing with ID 999 not found", details={"id": 999})

@mock_router.get("/conflict")
def trigger_conflict():
    raise ConflictException(message="Email already registered")

@mock_router.get("/unhandled")
def trigger_unhandled():
    raise ZeroDivisionError("Simulated server crash")

app.include_router(mock_router)

# Client with raise_server_exceptions=False to test HTTP 500 JSON handler
client = TestClient(app, raise_server_exceptions=False)

def test_not_found_exception_handling():
    """Verify NotFoundException returns 404 with standard error JSON"""
    response = client.get("/mock-errors/not-found")
    assert response.status_code == 404
    data = response.json()
    assert "error" in data
    assert data["error"]["code"] == "NOT_FOUND"
    assert data["error"]["message"] == "Listing with ID 999 not found"
    assert data["error"]["details"] == {"id": 999}

def test_conflict_exception_handling():
    """Verify ConflictException returns 409 with standard error JSON"""
    response = client.get("/mock-errors/conflict")
    assert response.status_code == 409
    data = response.json()
    assert "error" in data
    assert data["error"]["code"] == "CONFLICT"
    assert data["error"]["message"] == "Email already registered"

def test_unhandled_exception_handling():
    """Verify unhandled Python exceptions return 500 without leaking stack trace"""
    response = client.get("/mock-errors/unhandled")
    assert response.status_code == 500
    data = response.json()
    assert "error" in data
    assert data["error"]["code"] == "INTERNAL_SERVER_ERROR"
    assert "ZeroDivisionError" not in response.text
