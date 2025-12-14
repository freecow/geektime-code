from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional, List

from app.database import get_db
from app.services.ticket_service import TicketService
from app.schemas.ticket import (
    TicketCreate,
    TicketUpdate,
    TicketResponse,
    TicketListResponse,
    TicketFilters,
)

router = APIRouter(prefix="/tickets", tags=["tickets"])


@router.get("", response_model=TicketListResponse)
async def get_tickets(
    status: Optional[str] = Query(None, description="状态过滤：pending, completed, 或 all"),
    tag_ids: Optional[str] = Query(None, description="标签 ID 列表，逗号分隔"),
    search: Optional[str] = Query(None, description="标题搜索关键词"),
    page: int = Query(1, ge=1, description="页码"),
    page_size: int = Query(20, ge=1, le=100, description="每页数量"),
    db: Session = Depends(get_db),
):
    """获取 Ticket 列表"""
    # 解析 tag_ids
    tag_ids_list = None
    if tag_ids:
        try:
            tag_ids_list = [int(tid.strip()) for tid in tag_ids.split(",") if tid.strip()]
        except ValueError:
            raise HTTPException(status_code=400, detail="无效的标签 ID 格式")

    filters = TicketFilters(
        status=status,
        tag_ids=tag_ids_list,
        search=search,
        page=page,
        page_size=page_size,
    )

    tickets, total = TicketService.get_tickets(db, filters)
    total_pages = (total + page_size - 1) // page_size

    return TicketListResponse(
        data=[TicketResponse.model_validate(ticket) for ticket in tickets],
        total=total,
        page=page,
        page_size=page_size,
        total_pages=total_pages,
    )


@router.get("/{ticket_id}", response_model=TicketResponse)
async def get_ticket(
    ticket_id: int,
    db: Session = Depends(get_db),
):
    """根据 ID 获取 Ticket"""
    ticket = TicketService.get_ticket(db, ticket_id)
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket 不存在")
    return TicketResponse.model_validate(ticket)


@router.post("", response_model=TicketResponse, status_code=201)
async def create_ticket(
    ticket_data: TicketCreate,
    db: Session = Depends(get_db),
):
    """创建新的 Ticket"""
    # 验证标签是否存在
    if ticket_data.tag_ids:
        from app.models.tag import Tag
        existing_tags = db.query(Tag).filter(Tag.id.in_(ticket_data.tag_ids)).all()
        if len(existing_tags) != len(ticket_data.tag_ids):
            raise HTTPException(status_code=400, detail="部分标签不存在")

    ticket = TicketService.create_ticket(db, ticket_data)
    return TicketResponse.model_validate(ticket)


@router.put("/{ticket_id}", response_model=TicketResponse)
async def update_ticket(
    ticket_id: int,
    ticket_data: TicketUpdate,
    db: Session = Depends(get_db),
):
    """更新 Ticket"""
    ticket = TicketService.update_ticket(db, ticket_id, ticket_data)
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket 不存在")
    return TicketResponse.model_validate(ticket)


@router.delete("/{ticket_id}", status_code=204)
async def delete_ticket(
    ticket_id: int,
    db: Session = Depends(get_db),
):
    """删除 Ticket"""
    success = TicketService.delete_ticket(db, ticket_id)
    if not success:
        raise HTTPException(status_code=404, detail="Ticket 不存在")
    return None


@router.patch("/{ticket_id}/complete", response_model=TicketResponse)
async def complete_ticket(
    ticket_id: int,
    db: Session = Depends(get_db),
):
    """完成 Ticket"""
    ticket = TicketService.complete_ticket(db, ticket_id)
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket 不存在")
    return TicketResponse.model_validate(ticket)


@router.patch("/{ticket_id}/uncomplete", response_model=TicketResponse)
async def uncomplete_ticket(
    ticket_id: int,
    db: Session = Depends(get_db),
):
    """取消完成 Ticket"""
    ticket = TicketService.uncomplete_ticket(db, ticket_id)
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket 不存在")
    return TicketResponse.model_validate(ticket)


@router.post("/{ticket_id}/tags/{tag_id}", response_model=TicketResponse)
async def add_tag_to_ticket(
    ticket_id: int,
    tag_id: int,
    db: Session = Depends(get_db),
):
    """给 Ticket 添加标签"""
    ticket = TicketService.add_tag_to_ticket(db, ticket_id, tag_id)
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket 或 Tag 不存在")
    return TicketResponse.model_validate(ticket)


@router.delete("/{ticket_id}/tags/{tag_id}", response_model=TicketResponse)
async def remove_tag_from_ticket(
    ticket_id: int,
    tag_id: int,
    db: Session = Depends(get_db),
):
    """从 Ticket 移除标签"""
    ticket = TicketService.remove_tag_from_ticket(db, ticket_id, tag_id)
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket 或 Tag 不存在")
    return TicketResponse.model_validate(ticket)

