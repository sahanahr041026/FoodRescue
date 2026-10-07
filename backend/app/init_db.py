"""
Database Initialization Utility
===============================
Creates all database tables defined in SQLAlchemy models if they do not already exist.

Usage:
    python -m app.init_db
"""

import sys
from app.database import engine, Base
from app.models import User, FoodListing, PickupRequest


def init_database() -> None:
    """Creates all database tables defined in metadata"""
    print("Connecting to database...")
    try:
        Base.metadata.create_all(bind=engine)
        print("✅ Database tables successfully created:")
        for table in Base.metadata.tables.keys():
            print(f"   - {table}")
    except Exception as e:
        print(f"❌ Error initializing database tables: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    init_database()
