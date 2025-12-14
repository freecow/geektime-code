import pytest


class TestTagsAPI:
    """Tags API 测试"""

    def test_create_tag(self, client):
        """测试创建 Tag"""
        response = client.post(
            "/api/v1/tags",
            json={
                "name": "new-tag",
                "color": "#3B82F6"
            }
        )
        assert response.status_code == 201
        data = response.json()
        assert data["name"] == "new-tag"
        assert data["color"] == "#3B82F6"
        assert "id" in data

    def test_create_duplicate_tag(self, client, sample_tag):
        """测试创建重复名称的 Tag"""
        response = client.post(
            "/api/v1/tags",
            json={
                "name": sample_tag.name,
                "color": "#EF4444"
            }
        )
        assert response.status_code == 400

    def test_get_tags(self, client, sample_tag):
        """测试获取 Tags 列表"""
        response = client.get("/api/v1/tags")
        assert response.status_code == 200
        data = response.json()
        assert "data" in data
        assert "total" in data
        assert len(data["data"]) > 0

    def test_get_all_tags(self, client, sample_tag):
        """测试获取所有 Tags（不分页）"""
        response = client.get("/api/v1/tags/all")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) > 0

    def test_get_tag_by_id(self, client, sample_tag):
        """测试根据 ID 获取 Tag"""
        response = client.get(f"/api/v1/tags/{sample_tag.id}")
        assert response.status_code == 200
        data = response.json()
        assert data["id"] == sample_tag.id
        assert data["name"] == sample_tag.name

    def test_get_tag_not_found(self, client):
        """测试获取不存在的 Tag"""
        response = client.get("/api/v1/tags/99999")
        assert response.status_code == 404

    def test_delete_tag(self, client, sample_tag):
        """测试删除 Tag"""
        tag_id = sample_tag.id
        response = client.delete(f"/api/v1/tags/{tag_id}")
        assert response.status_code == 204

        # 验证已删除
        response = client.get(f"/api/v1/tags/{tag_id}")
        assert response.status_code == 404

