"""
Food Listing SQLAlchemy ORM Model
=================================
Defines the `food_listings` table for surplus food posted by providers.
"""

from enum import Enum
from sqlalchemy import Column, Integer, String, Text, Float, Boolean, DateTime, ForeignKey, Enum as SQLEnum, func
from sqlalchemy.orm import relationship
from app.database import Base


class ListingStatus(str, Enum):
    """Lifecycle stages of a food listing"""
    AVAILABLE = "AVAILABLE"    # Food is posted and ready for discovery
    REQUESTED = "REQUESTED"    # An NGO has submitted a pickup request
    ACCEPTED = "ACCEPTED"      # Provider accepted the NGO's pickup request
    COLLECTED = "COLLECTED"    # Food was picked up by NGO
    COMPLETED = "COMPLETED"    # Handover finalized and confirmed
    EXPIRED = "EXPIRED"        # Pickup window or best-before time passed without collection


class FoodCategory(str, Enum):
    """Standard food categories"""
    COOKED = "cooked"          # Cooked meals, curries, rice, pasta
    BAKERY = "bakery"          # Breads, pastries, rolls
    PRODUCE = "produce"        # Fresh fruits, vegetables
    PACKAGED = "packaged"      # Canned, dry, or sealed food items
    DAIRY = "dairy"            # Milk, cheese, yogurt


class FoodListing(Base):
    __tablename__ = "food_listings"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    provider_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    
    food_name = Column(String(255), nullable=False)
    food_category = Column(SQLEnum(FoodCategory), nullable=False, default=FoodCategory.COOKED)
    description = Column(Text, nullable=True)
    quantity = Column(Float, nullable=False)
    quantity_unit = Column(String(50), nullable=False)  # e.g., "portions", "kg", "boxes"
    is_vegetarian = Column(Boolean, default=True, nullable=False)

    # Critical timestamps & pickup window
    prepared_at = Column(DateTime(timezone=True), nullable=False)
    best_before = Column(DateTime(timezone=True), nullable=False)
    pickup_start_time = Column(DateTime(timezone=True), nullable=False)
    pickup_end_time = Column(DateTime(timezone=True), nullable=False)

    # Location & geocoding fields
    pickup_address = Column(String(255), nullable=False)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)

    # Status tracking
    status = Column(SQLEnum(ListingStatus), default=ListingStatus.AVAILABLE, nullable=False, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    # Relationships
    # Many listings belong to one Provider
    provider = relationship("User", back_populates="listings")

    # One listing can receive pickup requests
    requests = relationship("PickupRequest", back_populates="listing", cascade="all, delete-orphan")

    def __repr__(self) -> str:
        return f"<FoodListing(id={self.id}, name='{self.food_name}', status='{self.status}')>"
