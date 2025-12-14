from pydantic import BaseModel, Field, field_validator
from typing import Optional
from datetime import datetime
from app.schemas.common import PaginatedResponse


class TagCreate(BaseModel):
    """创建标签的请求模型"""
    name: str = Field(..., min_length=1, max_length=50, description="标签名称")
    color: str = Field(default="#3B82F6", pattern="^#[0-9A-Fa-f]{6}$", description="标签颜色（十六进制）")

    @field_validator("name")
    @classmethod
    def validate_name(cls, v: str) -> str:
        """验证标签名称，去除首尾空格"""
        return v.strip()


class TagResponse(BaseModel):
    """标签响应模型"""
    id: int
    name: str
    color: str
    created_at: datetime
    ticket_count: Optional[int] = None

    class Config:
        from_attributes = True


class TagListResponse(PaginatedResponse[TagResponse]):
    """标签列表响应模型"""
    pass

