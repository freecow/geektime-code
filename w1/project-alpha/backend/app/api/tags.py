from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional

from app.database import get_db
from app.services.tag_service import TagService
from app.schemas.tag import (
    TagCreate,
    TagResponse,
    TagListResponse,
)

router = APIRouter(prefix="/tags", tags=["tags"])


@router.get("", response_model=TagListResponse)
async def get_tags(
    page: int = Query(1, ge=1, description="页码"),
    page_size: int = Query(100, ge=1, le=100, description="每页数量"),
    db: Session = Depends(get_db),
):
    """获取 Tag 列表"""
    tags, total = TagService.get_tags(db, page=page, page_size=page_size)
    total_pages = (total + page_size - 1) // page_size

    return TagListResponse(
        data=[TagResponse.model_validate(tag) for tag in tags],
        total=total,
        page=page,
        page_size=page_size,
        total_pages=total_pages,
    )


@router.get("/all", response_model=list[TagResponse])
async def get_all_tags(
    db: Session = Depends(get_db),
):
    """获取所有 Tag（不分页）"""
    tags = TagService.get_all_tags(db)
    return [TagResponse.model_validate(tag) for tag in tags]


@router.get("/{tag_id}", response_model=TagResponse)
async def get_tag(
    tag_id: int,
    db: Session = Depends(get_db),
):
    """根据 ID 获取 Tag"""
    tag = TagService.get_tag(db, tag_id)
    if not tag:
        raise HTTPException(status_code=404, detail="Tag 不存在")
    
    # 添加 ticket_count
    from app.models.ticket_tag import ticket_tags
    from sqlalchemy import func
    tag.ticket_count = db.query(func.count(ticket_tags.c.ticket_id)).filter(
        ticket_tags.c.tag_id == tag.id
    ).scalar() or 0
    
    return TagResponse.model_validate(tag)


@router.post("", response_model=TagResponse, status_code=201)
async def create_tag(
    tag_data: TagCreate,
    db: Session = Depends(get_db),
):
    """创建新的 Tag"""
    # 检查标签名称是否已存在
    from app.models.tag import Tag
    existing_tag = db.query(Tag).filter(Tag.name == tag_data.name).first()
    if existing_tag:
        raise HTTPException(status_code=400, detail="标签名称已存在")

    tag = TagService.create_tag(db, tag_data)
    return TagResponse.model_validate(tag)


@router.delete("/{tag_id}", status_code=204)
async def delete_tag(
    tag_id: int,
    db: Session = Depends(get_db),
):
    """删除 Tag"""
    success = TagService.delete_tag(db, tag_id)
    if not success:
        raise HTTPException(status_code=404, detail="Tag 不存在")
    return None

