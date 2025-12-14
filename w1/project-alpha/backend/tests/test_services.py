import pytest
from app.services.ticket_service import TicketService
from app.services.tag_service import TagService
from app.models import TicketStatus
from app.schemas.ticket import TicketCreate, TicketUpdate
from app.schemas.tag import TagCreate


class TestTicketService:
    """TicketService 测试"""

    def test_create_ticket(self, db_session):
        """测试创建 Ticket"""
        ticket_data = TicketCreate(
            title="Test Ticket",
            description="Test Description",
            tag_ids=[]
        )
        ticket = TicketService.create_ticket(db_session, ticket_data)
        assert ticket.title == "Test Ticket"
        assert ticket.status == TicketStatus.pending
        assert ticket.id is not None

    def test_get_ticket(self, db_session, sample_ticket):
        """测试获取 Ticket"""
        ticket = TicketService.get_ticket(db_session, sample_ticket.id)
        assert ticket is not None
        assert ticket.id == sample_ticket.id

    def test_get_tickets_with_filters(self, db_session, sample_ticket):
        """测试获取 Tickets 列表（带过滤）"""
        from app.schemas.ticket import TicketFilters

        filters = TicketFilters(
            status=TicketStatus.pending.value,
            page=1,
            page_size=20
        )
        tickets, total = TicketService.get_tickets(db_session, filters)
        assert total > 0
        assert len(tickets) > 0
        assert all(t.status == TicketStatus.pending for t in tickets)

    def test_update_ticket(self, db_session, sample_ticket):
        """测试更新 Ticket"""
        update_data = TicketUpdate(title="Updated Title")
        ticket = TicketService.update_ticket(db_session, sample_ticket.id, update_data)
        assert ticket.title == "Updated Title"

    def test_delete_ticket(self, db_session, sample_ticket):
        """测试删除 Ticket"""
        ticket_id = sample_ticket.id
        result = TicketService.delete_ticket(db_session, ticket_id)
        assert result is True

        ticket = TicketService.get_ticket(db_session, ticket_id)
        assert ticket is None

    def test_complete_ticket(self, db_session, sample_ticket):
        """测试完成 Ticket"""
        ticket = TicketService.complete_ticket(db_session, sample_ticket.id)
        assert ticket.status == TicketStatus.completed

    def test_uncomplete_ticket(self, db_session, sample_ticket):
        """测试取消完成 Ticket"""
        # 先完成
        TicketService.complete_ticket(db_session, sample_ticket.id)
        # 再取消完成
        ticket = TicketService.uncomplete_ticket(db_session, sample_ticket.id)
        assert ticket.status == TicketStatus.pending


class TestTagService:
    """TagService 测试"""

    def test_create_tag(self, db_session):
        """测试创建 Tag"""
        tag_data = TagCreate(name="new-tag", color="#3B82F6")
        tag = TagService.create_tag(db_session, tag_data)
        assert tag.name == "new-tag"
        assert tag.color == "#3B82F6"
        assert tag.id is not None

    def test_get_tag(self, db_session, sample_tag):
        """测试获取 Tag"""
        tag = TagService.get_tag(db_session, sample_tag.id)
        assert tag is not None
        assert tag.id == sample_tag.id

    def test_get_tags(self, db_session, sample_tag):
        """测试获取 Tags 列表"""
        tags, total = TagService.get_tags(db_session, page=1, page_size=20)
        assert total > 0
        assert len(tags) > 0

    def test_get_all_tags(self, db_session, sample_tag):
        """测试获取所有 Tags"""
        tags = TagService.get_all_tags(db_session)
        assert len(tags) > 0

    def test_delete_tag(self, db_session, sample_tag):
        """测试删除 Tag"""
        tag_id = sample_tag.id
        result = TagService.delete_tag(db_session, tag_id)
        assert result is True

        tag = TagService.get_tag(db_session, tag_id)
        assert tag is None

