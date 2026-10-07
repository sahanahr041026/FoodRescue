"""
User SQLAlchemy ORM Model
=========================
Defines the `users` table supporting role-based accounts (PROVIDER, NGO, ADMIN).
"""

from enum import Enum
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Enum as SQLEnum, func
from sqlalchemy.orm import relationship
from app.database import Base


class UserRole(str, Enum):
    """Supported user roles on the platform"""
    PROVIDER = "PROVIDER"  # Restaurants, bakeries, hostels, canteens
    NGO = "NGO"            # Charities, food banks, shelters
    ADMIN = "ADMIN"        # Platform moderation and oversight


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    name = Column(String(255), nullable=False)  # Business name or NGO organization name
    role = Column(SQLEnum(UserRole), nullable=False, default=UserRole.PROVIDER)
    phone = Column(String(50), nullable=True)
    address = Column(String(255), nullable=True)
    is_active = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    # Relationships
    # A Provider can create many food listings
    listings = relationship("FoodListing", back_populates="provider", cascade="all, delete-orphan")

    # An NGO can submit many pickup requests
    requests = relationship("PickupRequest", back_populates="ngo", cascade="all, delete-orphan")

    def __repr__(self) -> str:
        return f"<User(id={self.id}, email='{self.email}', role='{self.role}')>"
