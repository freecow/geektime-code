import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from fastapi.testclient import TestClient

from app.database import Base, get_db
from app.main import app
from app.models import Ticket, Tag, TicketStatus


# 测试数据库 URL（使用内存数据库 SQLite）
TEST_DATABASE_URL = "sqlite:///:memory:"

engine = create_engine(TEST_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


@pytest.fixture(scope="function")
def db_session():
    """创建测试数据库会话"""
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()
        Base.metadata.drop_all(bind=engine)


@pytest.fixture(scope="function")
def client(db_session):
    """创建测试客户端"""
    def override_get_db():
        try:
            yield db_session
        finally:
            pass

    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear()


@pytest.fixture
def sample_tag(db_session):
    """创建示例标签"""
    tag = Tag(name="test-tag", color="#3B82F6")
    db_session.add(tag)
    db_session.commit()
    db_session.refresh(tag)
    return tag


@pytest.fixture
def sample_ticket(db_session, sample_tag):
    """创建示例 Ticket"""
    ticket = Ticket(
        title="Test Ticket",
        description="Test Description",
        status=TicketStatus.pending
    )
    ticket.tags.append(sample_tag)
    db_session.add(ticket)
    db_session.commit()
    db_session.refresh(ticket)
    return ticket

