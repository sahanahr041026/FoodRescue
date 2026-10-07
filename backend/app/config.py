"""
Application Configuration & Settings
====================================
Uses Pydantic BaseSettings to read environment variables from a `.env` file or the system environment.

Why BaseSettings?
-----------------
1. Type Safety: Validates that integers are numbers (e.g., PORT=8000), URLs are valid strings, etc.
2. Fail-Fast: If a critical variable is missing or malformed, the app halts at boot with a clear error
   instead of failing mysteriously halfway through a user request.
3. 12-Factor App Compliance: Code remains identical across environments; only configuration changes.
"""

from functools import lru_cache
from typing import List, Union
from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # Project Metadata
    PROJECT_NAME: str = "FoodRescue API"
    VERSION: str = "0.1.0"
    ENVIRONMENT: str = "development"
    PORT: int = 8000

    # Cross-Origin Resource Sharing (CORS)
    # Whitelists domains that are permitted to make browser requests to this API
    CORS_ORIGINS: Union[List[str], str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
    ]

    # Database Configuration (PostgreSQL) - Phase 4
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/foodrescue_db"

    # Authentication & JWT Configuration - Phase 6
    SECRET_KEY: str = "foodrescue_dev_secret_key_change_in_production_123456"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440  # 24 hours

    # Validator to parse comma-separated string from .env into a list if needed
    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> List[str]:
        if isinstance(v, str) and not v.startswith("["):
            return [origin.strip() for origin in v.split(",") if origin.strip()]
        elif isinstance(v, list):
            return v
        return [str(v)]

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
    )


@lru_cache()
def get_settings() -> Settings:
    """
    Returns a cached Settings instance.
    Using @lru_cache ensures the .env file is read and parsed once,
    rather than on every single HTTP request.
    """
    return Settings()
