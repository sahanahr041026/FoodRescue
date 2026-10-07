from app.config import get_settings

def test_settings_load():
    """Verify that settings are loaded properly with expected defaults"""
    settings = get_settings()
    assert settings.PROJECT_NAME == "FoodRescue API"
    assert settings.VERSION == "0.1.0"
    assert "http://localhost:5173" in settings.CORS_ORIGINS
    assert settings.PORT == 8000
