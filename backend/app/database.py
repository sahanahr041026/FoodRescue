"""
Database Connection & Session Factory
=====================================
Configures SQLAlchemy ORM engine, session lifecycle, and declarative base.

Key Concepts:
- Engine: The core interface to the database. Manages the connection pool.
- SessionLocal: A session factory. Each HTTP request gets its own independent database session.
- Base: Declarative base class from which all ORM models inherit.
- get_db(): A dependency generator that yields a database session and guarantees
  it is closed when the request finishes (even if an error occurs).
"""

from typing import Generator
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker, Session
from app.config import get_settings

settings = get_settings()

# Engine configuration
# If using SQLite (e.g. for testing), connect_args={"check_same_thread": False} is required.
is_sqlite = settings.DATABASE_URL.startswith("sqlite")
connect_args = {"check_same_thread": False} if is_sqlite else {}

engine = create_engine(
    settings.DATABASE_URL,
    connect_args=connect_args,
    pool_pre_ping=True,  # Automatically reconnects if a connection in the pool has gone stale
    echo=(settings.ENVIRONMENT == "development" and False),  # Set to True to log raw SQL queries
)

# Session factory bound to the engine
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)

# Declarative base class for models
Base = declarative_base()


def get_db() -> Generator[Session, None, None]:
    """
    FastAPI Dependency:
    Yields a database session to a route handler and guarantees that the session
    is cleanly closed after the request is finished.

    Usage in a route:
        @router.get("/items")
        def read_items(db: Session = Depends(get_db)):
            return db.query(Item).all()
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
