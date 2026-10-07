from datetime import datetime, timezone, timedelta
import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.database import Base
from app.models import User, UserRole, FoodListing, ListingStatus, FoodCategory, PickupRequest, RequestStatus

# Use an isolated in-memory SQLite database for fast unit testing
TEST_DATABASE_URL = "sqlite:///:memory:"
test_engine = create_engine(TEST_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=test_engine)

@pytest.fixture(scope="function")
def db_session():
    """Fixture providing a fresh database session with tables created per test"""
    Base.metadata.create_all(bind=test_engine)
    session = TestingSessionLocal()
    try:
        yield session
    finally:
        session.close()
        Base.metadata.drop_all(bind=test_engine)

def test_create_user_and_roles(db_session):
    """Verify Provider and NGO users can be persisted with proper roles"""
    provider = User(
        email="bakery@test.com",
        hashed_password="hashed_pw_123",
        name="Artisan Bakery",
        role=UserRole.PROVIDER,
        phone="555-0101",
        address="12 Main St"
    )
    ngo = User(
        email="shelter@test.com",
        hashed_password="hashed_pw_456",
        name="Hope Shelter",
        role=UserRole.NGO,
        phone="555-0202",
        address="44 Hope Ave"
    )
    db_session.add_all([provider, ngo])
    db_session.commit()

    saved_provider = db_session.query(User).filter_by(email="bakery@test.com").first()
    saved_ngo = db_session.query(User).filter_by(email="shelter@test.com").first()

    assert saved_provider is not None
    assert saved_provider.role == UserRole.PROVIDER
    assert saved_ngo.role == UserRole.NGO
    assert saved_provider.is_active is True

def test_listing_relationships_and_constraints(db_session):
    """Verify FoodListing persists and links to Provider via foreign key"""
    provider = User(
        email="canteen@test.com",
        hashed_password="pw",
        name="Campus Canteen",
        role=UserRole.PROVIDER
    )
    db_session.add(provider)
    db_session.commit()

    now = datetime.now(timezone.utc)
    listing = FoodListing(
        provider_id=provider.id,
        food_name="Veg Rice Bowls",
        food_category=FoodCategory.COOKED,
        quantity=25.0,
        quantity_unit="portions",
        is_vegetarian=True,
        prepared_at=now,
        best_before=now + timedelta(hours=6),
        pickup_start_time=now + timedelta(hours=1),
        pickup_end_time=now + timedelta(hours=4),
        pickup_address="Gate 3 Canteen Kitchen",
        status=ListingStatus.AVAILABLE
    )
    db_session.add(listing)
    db_session.commit()

    # Verify bidirectional relationship
    assert listing.provider.email == "canteen@test.com"
    assert len(provider.listings) == 1
    assert provider.listings[0].food_name == "Veg Rice Bowls"

def test_pickup_request_workflow_and_cascade(db_session):
    """Verify PickupRequest links Listing + NGO, and cascades properly on delete"""
    provider = User(email="p@test.com", hashed_password="pw", name="P", role=UserRole.PROVIDER)
    ngo = User(email="ngo@test.com", hashed_password="pw", name="NGO", role=UserRole.NGO)
    db_session.add_all([provider, ngo])
    db_session.commit()

    now = datetime.now(timezone.utc)
    listing = FoodListing(
        provider_id=provider.id,
        food_name="Bread Loaves",
        food_category=FoodCategory.BAKERY,
        quantity=10.0,
        quantity_unit="loaves",
        prepared_at=now,
        best_before=now + timedelta(days=1),
        pickup_start_time=now,
        pickup_end_time=now + timedelta(hours=5),
        pickup_address="Bakery St",
        status=ListingStatus.AVAILABLE
    )
    db_session.add(listing)
    db_session.commit()

    # NGO requests the listing
    request = PickupRequest(
        listing_id=listing.id,
        ngo_id=ngo.id,
        requested_quantity=10.0,
        message="Can pick up in 30 mins",
        status=RequestStatus.PENDING
    )
    db_session.add(request)
    db_session.commit()

    # Verify foreign key linkages
    assert request.listing.food_name == "Bread Loaves"
    assert request.ngo.name == "NGO"
    assert len(listing.requests) == 1
    assert len(ngo.requests) == 1

    # Verify cascade delete: deleting the listing cascades to the request
    db_session.delete(listing)
    db_session.commit()

    remaining_requests = db_session.query(PickupRequest).filter_by(listing_id=listing.id).all()
    assert len(remaining_requests) == 0
