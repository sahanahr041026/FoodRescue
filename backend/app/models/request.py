"""
Pickup Request SQLAlchemy ORM Model
===================================
Defines the `pickup_requests` table for NGO pickup claims on food listings.
"""

from enum import Enum
from sqlalchemy import Column, Integer, Text, Float, DateTime, ForeignKey, Enum as SQLEnum, func
from sqlalchemy.orm import relationship
from app.database import Base


class RequestStatus(str, Enum):
    """Lifecycle stages of a pickup request"""
    PENDING = "PENDING"        # Request submitted, waiting for provider response
    ACCEPTED = "ACCEPTED"      # Provider agreed to the pickup request
    REJECTED = "REJECTED"      # Provider declined the request
    CANCELLED = "CANCELLED"    # NGO withdrew their request before pickup
    COLLECTED = "COLLECTED"    # NGO marked as collected on-site
    COMPLETED = "COMPLETED"    # Handover finalized by provider


class PickupRequest(Base):
    __tablename__ = "pickup_requests"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    listing_id = Column(Integer, ForeignKey("food_listings.id", ondelete="CASCADE"), nullable=False, index=True)
    ngo_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)

    requested_quantity = Column(Float, nullable=False)
    message = Column(Text, nullable=True)  # Message from NGO with vehicle / volunteer arrival details
    status = Column(SQLEnum(RequestStatus), default=RequestStatus.PENDING, nullable=False, index=True)

    # Auditing timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    accepted_at = Column(DateTime(timezone=True), nullable=True)
    collected_at = Column(DateTime(timezone=True), nullable=True)

    # Relationships
    listing = relationship("FoodListing", back_populates="requests")
    ngo = relationship("User", back_populates="requests")

    def __repr__(self) -> str:
        return f"<PickupRequest(id={self.id}, listing_id={self.listing_id}, status='{self.status}')>"
