from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Optional
from math import ceil

from app.models.tag import Tag
from app.models.ticket_tag import ticket_tags
from app.schemas.tag import TagCreate


class TagService:
    """Tag 业务逻辑服务"""

    @staticmethod
    def create_tag(db: Session, tag_data: TagCreate) -> Tag:
        """创建新的 Tag"""
        tag = Tag(
            name=tag_data.name,
            color=tag_data.color
        )
        db.add(tag)
        db.commit()
        db.refresh(tag)
        return tag

    @staticmethod
    def get_tag(db: Session, tag_id: int) -> Optional[Tag]:
        """根据 ID 获取 Tag"""
        return db.query(Tag).filter(Tag.id == tag_id).first()

    @staticmethod
    def get_tags(
        db: Session,
        page: int = 1,
        page_size: int = 100
    ) -> tuple[List[Tag], int]:
        """获取 Tag 列表（带分页）"""
        query = db.query(Tag)

        # 获取总数
        total = query.count()

        # 排序（按创建时间倒序）
        query = query.order_by(Tag.created_at.desc())

        # 分页
        offset = (page - 1) * page_size
        tags = query.offset(offset).limit(page_size).all()

        # 为每个标签添加 ticket_count
        for tag in tags:
            tag.ticket_count = db.query(func.count(ticket_tags.c.ticket_id)).filter(
                ticket_tags.c.tag_id == tag.id
            ).scalar() or 0

        return tags, total

    @staticmethod
    def get_all_tags(db: Session) -> List[Tag]:
        """获取所有 Tag（不分页）"""
        tags = db.query(Tag).order_by(Tag.created_at.desc()).all()

        # 为每个标签添加 ticket_count
        for tag in tags:
            tag.ticket_count = db.query(func.count(ticket_tags.c.ticket_id)).filter(
                ticket_tags.c.tag_id == tag.id
            ).scalar() or 0

        return tags

    @staticmethod
    def delete_tag(db: Session, tag_id: int) -> bool:
        """删除 Tag"""
        tag = db.query(Tag).filter(Tag.id == tag_id).first()
        if not tag:
            return False

        db.delete(tag)
        db.commit()
        return True

