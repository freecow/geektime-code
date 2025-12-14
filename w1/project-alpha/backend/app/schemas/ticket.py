from pydantic import BaseModel, Field, field_validator
from typing import Optional, List
from datetime import datetime
from app.models.ticket import TicketStatus
from app.schemas.common import PaginatedResponse
from app.schemas.tag import TagResponse


class TicketCreate(BaseModel):
    """创建 Ticket 的请求模型"""
    title: str = Field(..., min_length=1, max_length=200, description="Ticket 标题")
    description: Optional[str] = Field(None, description="Ticket 描述")
    tag_ids: Optional[List[int]] = Field(default=[], description="关联的标签 ID 列表")

    @field_validator("title")
    @classmethod
    def validate_title(cls, v: str) -> str:
        """验证标题，去除首尾空格"""
        return v.strip()

    @field_validator("description")
    @classmethod
    def validate_description(cls, v: Optional[str]) -> Optional[str]:
        """验证描述"""
        if v is not None:
            return v.strip() if v.strip() else None
        return None


class TicketUpdate(BaseModel):
    """更新 Ticket 的请求模型"""
    title: Optional[str] = Field(None, min_length=1, max_length=200, description="Ticket 标题")
    description: Optional[str] = Field(None, description="Ticket 描述")

    @field_validator("title")
    @classmethod
    def validate_title(cls, v: Optional[str]) -> Optional[str]:
        """验证标题"""
        if v is not None:
            return v.strip() if v.strip() else None
        return None

    @field_validator("description")
    @classmethod
    def validate_description(cls, v: Optional[str]) -> Optional[str]:
        """验证描述"""
        if v is not None:
            return v.strip() if v.strip() else None
        return None


class TicketResponse(BaseModel):
    """Ticket 响应模型"""
    id: int
    title: str
    description: Optional[str]
    status: TicketStatus
    tags: List[TagResponse]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class TicketListResponse(PaginatedResponse[TicketResponse]):
    """Ticket 列表响应模型"""
    pass


class TicketFilters(BaseModel):
    """Ticket 过滤条件"""
    status: Optional[str] = Field(None, description="状态过滤：pending, completed, 或 all")
    tag_ids: Optional[List[int]] = Field(None, description="标签 ID 列表")
    search: Optional[str] = Field(None, description="标题搜索关键词")
    page: int = Field(default=1, ge=1, description="页码")
    page_size: int = Field(default=20, ge=1, le=100, description="每页数量")

