import pytest
from app.models import TicketStatus


class TestTicketsAPI:
    """Tickets API 测试"""

    def test_create_ticket(self, client):
        """测试创建 Ticket"""
        response = client.post(
            "/api/v1/tickets",
            json={
                "title": "New Test Ticket",
                "description": "Test description",
                "tag_ids": []
            }
        )
        assert response.status_code == 201
        data = response.json()
        assert data["title"] == "New Test Ticket"
        assert data["description"] == "Test description"
        assert data["status"] == TicketStatus.pending.value
        assert "id" in data

    def test_get_tickets(self, client, sample_ticket):
        """测试获取 Tickets 列表"""
        response = client.get("/api/v1/tickets")
        assert response.status_code == 200
        data = response.json()
        assert "data" in data
        assert "total" in data
        assert "page" in data
        assert len(data["data"]) > 0

    def test_get_ticket_by_id(self, client, sample_ticket):
        """测试根据 ID 获取 Ticket"""
        response = client.get(f"/api/v1/tickets/{sample_ticket.id}")
        assert response.status_code == 200
        data = response.json()
        assert data["id"] == sample_ticket.id
        assert data["title"] == sample_ticket.title

    def test_get_ticket_not_found(self, client):
        """测试获取不存在的 Ticket"""
        response = client.get("/api/v1/tickets/99999")
        assert response.status_code == 404

    def test_update_ticket(self, client, sample_ticket):
        """测试更新 Ticket"""
        response = client.put(
            f"/api/v1/tickets/{sample_ticket.id}",
            json={
                "title": "Updated Title",
                "description": "Updated Description"
            }
        )
        assert response.status_code == 200
        data = response.json()
        assert data["title"] == "Updated Title"
        assert data["description"] == "Updated Description"

    def test_delete_ticket(self, client, sample_ticket):
        """测试删除 Ticket"""
        ticket_id = sample_ticket.id
        response = client.delete(f"/api/v1/tickets/{ticket_id}")
        assert response.status_code == 204

        # 验证已删除
        response = client.get(f"/api/v1/tickets/{ticket_id}")
        assert response.status_code == 404

    def test_complete_ticket(self, client, sample_ticket):
        """测试完成 Ticket"""
        response = client.patch(f"/api/v1/tickets/{sample_ticket.id}/complete")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == TicketStatus.completed.value

    def test_uncomplete_ticket(self, client, sample_ticket):
        """测试取消完成 Ticket"""
        # 先完成
        client.patch(f"/api/v1/tickets/{sample_ticket.id}/complete")
        # 再取消完成
        response = client.patch(f"/api/v1/tickets/{sample_ticket.id}/uncomplete")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == TicketStatus.pending.value

    def test_filter_tickets_by_status(self, client, sample_ticket):
        """测试按状态过滤 Tickets"""
        response = client.get("/api/v1/tickets?status=pending")
        assert response.status_code == 200
        data = response.json()
        for ticket in data["data"]:
            assert ticket["status"] == TicketStatus.pending.value

    def test_search_tickets(self, client, sample_ticket):
        """测试搜索 Tickets"""
        response = client.get(f"/api/v1/tickets?search={sample_ticket.title}")
        assert response.status_code == 200
        data = response.json()
        assert len(data["data"]) > 0
        assert any(ticket["title"] == sample_ticket.title for ticket in data["data"])

    def test_filter_tickets_by_tags(self, client, sample_ticket, sample_tag):
        """测试按标签过滤 Tickets"""
        response = client.get(f"/api/v1/tickets?tag_ids={sample_tag.id}")
        assert response.status_code == 200
        data = response.json()
        assert len(data["data"]) > 0

    def test_add_tag_to_ticket(self, client, sample_ticket, db_session):
        """测试给 Ticket 添加标签"""
        from app.models import Tag
        new_tag = Tag(name="new-tag", color="#EF4444")
        db_session.add(new_tag)
        db_session.commit()

        response = client.post(
            f"/api/v1/tickets/{sample_ticket.id}/tags/{new_tag.id}"
        )
        assert response.status_code == 200
        data = response.json()
        assert len(data["tags"]) == 2  # 原有1个 + 新增1个

    def test_remove_tag_from_ticket(self, client, sample_ticket, sample_tag):
        """测试从 Ticket 移除标签"""
        response = client.delete(
            f"/api/v1/tickets/{sample_ticket.id}/tags/{sample_tag.id}"
        )
        assert response.status_code == 200
        data = response.json()
        assert len(data["tags"]) == 0

