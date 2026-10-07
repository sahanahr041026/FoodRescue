"""
Custom Domain Exceptions
========================
Provides structured exception classes for FoodRescue.
These are caught by global exception handlers to return consistent JSON error envelopes.
"""

from typing import Any, Optional


class FoodRescueException(Exception):
    """Base exception for all FoodRescue domain errors"""

    def __init__(
        self,
        message: str,
        code: str = "INTERNAL_ERROR",
        status_code: int = 500,
        details: Optional[Any] = None,
    ):
        self.message = message
        self.code = code
        self.status_code = status_code
        self.details = details
        super().__init__(self.message)


class NotFoundException(FoodRescueException):
    """Raised when an entity (listing, user, request) does not exist (404)"""

    def __init__(self, message: str = "Resource not found", details: Optional[Any] = None):
        super().__init__(
            message=message,
            code="NOT_FOUND",
            status_code=404,
            details=details,
        )


class BadRequestException(FoodRescueException):
    """Raised when client input violates domain business rules (400)"""

    def __init__(self, message: str = "Bad request", details: Optional[Any] = None):
        super().__init__(
            message=message,
            code="BAD_REQUEST",
            status_code=400,
            details=details,
        )


class UnauthorizedException(FoodRescueException):
    """Raised when authentication credentials are missing or invalid (401)"""

    def __init__(self, message: str = "Authentication required", details: Optional[Any] = None):
        super().__init__(
            message=message,
            code="UNAUTHORIZED",
            status_code=401,
            details=details,
        )


class ForbiddenException(FoodRescueException):
    """Raised when an authenticated user lacks permissions for an action (403)"""

    def __init__(self, message: str = "Access forbidden", details: Optional[Any] = None):
        super().__init__(
            message=message,
            code="FORBIDDEN",
            status_code=403,
            details=details,
        )


class ConflictException(FoodRescueException):
    """Raised when attempting to create a duplicate resource like an email (409)"""

    def __init__(self, message: str = "Resource conflict", details: Optional[Any] = None):
        super().__init__(
            message=message,
            code="CONFLICT",
            status_code=409,
            details=details,
        )
