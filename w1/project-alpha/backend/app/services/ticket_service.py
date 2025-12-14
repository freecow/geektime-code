from sqlalchemy.orm import Session, joinedload
from sqlalchemy import or_, and_, func
from typing import List, Optional
from math import ceil

from app.models.ticket import Ticket, TicketStatus
from app.models.tag import Tag
from app.schemas.ticket import TicketCreate, TicketUpdate, TicketFilters


class TicketService:
    """Ticket 业务逻辑服务"""

    @staticmethod
    def create_ticket(db: Session, ticket_data: TicketCreate) -> Ticket:
        """创建新的 Ticket"""
        # 创建 Ticket
        ticket = Ticket(
            title=ticket_data.title,
            description=ticket_data.description,
            status=TicketStatus.pending
        )
        db.add(ticket)
        db.flush()  # 获取 ticket.id

        # 关联标签
        if ticket_data.tag_ids:
            tags = db.query(Tag).filter(Tag.id.in_(ticket_data.tag_ids)).all()
            ticket.tags.extend(tags)

        db.commit()
        db.refresh(ticket)
        return ticket

    @staticmethod
    def get_ticket(db: Session, ticket_id: int) -> Optional[Ticket]:
        """根据 ID 获取 Ticket"""
        return db.query(Ticket).options(joinedload(Ticket.tags)).filter(Ticket.id == ticket_id).first()

    @staticmethod
    def get_tickets(
        db: Session,
        filters: TicketFilters
    ) -> tuple[List[Ticket], int]:
        """获取 Ticket 列表（带过滤和分页）"""
        query = db.query(Ticket)

        # 状态过滤
        if filters.status and filters.status != "all":
            try:
                status = TicketStatus(filters.status)
                query = query.filter(Ticket.status == status)
            except ValueError:
                pass  # 无效的状态值，忽略

        # 标签过滤
        if filters.tag_ids:
            # 使用 join 和 filter 来查找包含所有指定标签的 tickets
            query = query.join(Ticket.tags).filter(
                Tag.id.in_(filters.tag_ids)
            ).group_by(Ticket.id).having(
                func.count(Tag.id.distinct()) == len(filters.tag_ids)
            )

        # 标题搜索
        if filters.search:
            search_term = f"%{filters.search.strip()}%"
            query = query.filter(Ticket.title.ilike(search_term))

        # 获取总数
        total = query.distinct().count()

        # 排序（按创建时间倒序）
        query = query.order_by(Ticket.created_at.desc())

        # 预加载 tags 关联数据
        query = query.options(joinedload(Ticket.tags))

        # 分页
        offset = (filters.page - 1) * filters.page_size
        tickets = query.distinct().offset(offset).limit(filters.page_size).all()

        return tickets, total

    @staticmethod
    def update_ticket(
        db: Session,
        ticket_id: int,
        ticket_data: TicketUpdate
    ) -> Optional[Ticket]:
        """更新 Ticket"""
        ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
        if not ticket:
            return None

        # 更新字段
        if ticket_data.title is not None:
            ticket.title = ticket_data.title
        if ticket_data.description is not None:
            ticket.description = ticket_data.description

        db.commit()
        db.refresh(ticket)
        return ticket

    @staticmethod
    def delete_ticket(db: Session, ticket_id: int) -> bool:
        """删除 Ticket"""
        ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
        if not ticket:
            return False

        db.delete(ticket)
        db.commit()
        return True

    @staticmethod
    def complete_ticket(db: Session, ticket_id: int) -> Optional[Ticket]:
        """完成 Ticket"""
        ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
        if not ticket:
            return None

        ticket.status = TicketStatus.completed
        db.commit()
        db.refresh(ticket)
        return ticket

    @staticmethod
    def uncomplete_ticket(db: Session, ticket_id: int) -> Optional[Ticket]:
        """取消完成 Ticket"""
        ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
        if not ticket:
            return None

        ticket.status = TicketStatus.pending
        db.commit()
        db.refresh(ticket)
        return ticket

    @staticmethod
    def add_tag_to_ticket(
        db: Session,
        ticket_id: int,
        tag_id: int
    ) -> Optional[Ticket]:
        """给 Ticket 添加标签"""
        ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
        if not ticket:
            return None

        tag = db.query(Tag).filter(Tag.id == tag_id).first()
        if not tag:
            return None

        # 检查是否已经关联
        if tag not in ticket.tags:
            ticket.tags.append(tag)
            db.commit()
            db.refresh(ticket)

        return ticket

    @staticmethod
    def remove_tag_from_ticket(
        db: Session,
        ticket_id: int,
        tag_id: int
    ) -> Optional[Ticket]:
        """从 Ticket 移除标签"""
        ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
        if not ticket:
            return None

        tag = db.query(Tag).filter(Tag.id == tag_id).first()
        if not tag:
            return None

        # 移除关联
        if tag in ticket.tags:
            ticket.tags.remove(tag)
            db.commit()
            db.refresh(ticket)

        return ticket

