# Project Alpha - 详细实施计划

## 文档信息
- **项目名称**: Project Alpha
- **文档版本**: v1.0
- **创建日期**: 2025-12-12
- **文档类型**: 实施计划
- **基于规格**: 0001-spec.md v1.0

---

## 目录
1. [项目概览](#1-项目概览)
2. [开发环境准备](#2-开发环境准备)
3. [数据库设计与实施](#3-数据库设计与实施)
4. [后端开发实施](#4-后端开发实施)
5. [前端开发实施](#5-前端开发实施)
6. [集成与联调](#6-集成与联调)
7. [测试实施](#7-测试实施)
8. [部署实施](#8-部署实施)
9. [质量保证与优化](#9-质量保证与优化)
10. [项目时间线](#10-项目时间线)

---

## 1. 项目概览

### 1.1 项目目标
开发一个轻量级的票务标签管理系统，提供直观的用户界面来管理任务票据，通过标签系统实现灵活的分类和筛选功能。

### 1.2 技术栈总结
- **后端**: FastAPI + PostgreSQL + SQLAlchemy + Alembic
- **前端**: TypeScript + React + Vite + Tailwind CSS + Shadcn UI
- **开发工具**: uv (Python包管理), npm/pnpm (前端包管理)
- **数据库**: PostgreSQL (使用已有容器)

### 1.3 实施原则
1. **增量开发**: 按功能模块逐步实现
2. **测试驱动**: 关键功能先写测试
3. **文档同步**: 代码与文档同步更新
4. **代码审查**: 重要模块需要代码审查
5. **持续集成**: 每日集成和测试

---

## 2. 开发环境准备

### 2.1 基础环境要求

#### 2.1.1 必需软件清单
- [ ] Python 3.11+ (推荐使用 uv 管理)
- [ ] Node.js 18+ 
- [ ] PostgreSQL 客户端工具 (psql)
- [ ] Git
- [ ] VS Code 或其他 IDE
- [ ] Docker Desktop (用于运行 PostgreSQL)

#### 2.1.2 推荐的 IDE 插件
**VS Code 扩展**:
- Python
- Pylance
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- PostgreSQL
- Thunder Client / REST Client (API 测试)

### 2.2 项目目录结构创建

```bash
# 在 project-alpha 目录下创建项目结构
project-alpha/
├── backend/                 # 后端项目
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── config.py
│   │   ├── database.py
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── api/
│   │   ├── services/
│   │   └── utils/
│   ├── alembic/
│   ├── tests/
│   ├── requirements.txt
│   ├── .env.example
│   └── README.md
├── frontend/                # 前端项目
│   ├── src/
│   │   ├── components/
│   │   ├── api/
│   │   ├── hooks/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── public/
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── tailwind.config.js
├── .specs/                  # 规格文档
└── README.md
```

### 2.3 后端环境配置

#### 2.3.1 创建后端项目
```bash
cd project-alpha
mkdir -p backend
cd backend

# 使用 uv 初始化 Python 项目
uv init
uv venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
```

#### 2.3.2 安装后端依赖
创建 `requirements.txt`:
```txt
fastapi==0.109.0
uvicorn[standard]==0.27.0
sqlalchemy==2.0.25
psycopg2-binary==2.9.9
alembic==1.13.1
pydantic==2.5.0
pydantic-settings==2.1.0
python-dotenv==1.0.0
python-multipart==0.0.6

# 开发依赖
pytest==7.4.3
pytest-asyncio==0.21.1
httpx==0.26.0
black==23.12.1
flake8==7.0.0
mypy==1.8.0
```

安装依赖:
```bash
uv pip install -r requirements.txt
```

#### 2.3.3 配置环境变量
创建 `.env.example`:
```env
# Database
DATABASE_URL=postgresql://alpha_user:alpha_pass@localhost:5432/project_alpha

# Application
DEBUG=True
API_V1_PREFIX=/api/v1
PROJECT_NAME=Project Alpha

# CORS
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

复制并创建实际的 `.env`:
```bash
cp .env.example .env
```

### 2.4 前端环境配置

#### 2.4.1 创建前端项目
```bash
cd project-alpha
npm create vite@latest frontend -- --template react-ts
cd frontend
npm install
```

#### 2.4.2 安装前端依赖

**核心依赖**:
```bash
npm install react-router-dom axios date-fns clsx tailwind-merge
npm install react-hook-form @hookform/resolvers zod
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu
npm install @radix-ui/react-checkbox @radix-ui/react-select
npm install @radix-ui/react-label @radix-ui/react-toast
npm install lucide-react
```

**开发依赖**:
```bash
npm install -D tailwindcss postcss autoprefixer
npm install -D @types/node
npm install -D eslint prettier eslint-config-prettier
npm install -D @testing-library/react @testing-library/jest-dom vitest
```

#### 2.4.3 配置 Tailwind CSS
```bash
npx tailwindcss init -p
```

编辑 `tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

#### 2.4.4 集成 Shadcn UI
```bash
npx shadcn-ui@latest init
```

安装常用组件:
```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add input
npx shadcn-ui@latest add label
npx shadcn-ui@latest add checkbox
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add card
npx shadcn-ui@latest add select
npx shadcn-ui@latest add toast
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add skeleton
```

#### 2.4.5 配置环境变量
创建 `.env.local`:
```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

### 2.5 数据库连接验证

#### 2.5.1 验证数据库可用性
```bash
# 测试数据库连接
psql -h localhost -p 5432 -U alpha_user -d project_alpha

# 或使用 Python 脚本测试
python -c "
import psycopg2
conn = psycopg2.connect('postgresql://alpha_user:alpha_pass@localhost:5432/project_alpha')
print('Database connection successful!')
conn.close()
"
```

### 2.6 开发工具配置

#### 2.6.1 Git 配置
创建 `.gitignore`:
```gitignore
# Python
__pycache__/
*.py[cod]
*$py.class
.venv/
venv/
*.egg-info/
.pytest_cache/

# Node
node_modules/
dist/
.env.local

# IDE
.vscode/
.idea/
*.swp

# Environment
.env
!.env.example

# Database
*.db
*.sqlite
```

#### 2.6.2 代码格式化配置
创建 `.prettierrc` (前端):
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2
}
```

创建 `pyproject.toml` (后端):
```toml
[tool.black]
line-length = 100
target-version = ['py311']

[tool.mypy]
python_version = "3.11"
warn_return_any = true
warn_unused_configs = true
```

---

## 3. 数据库设计与实施

### 3.1 数据库初始化

#### 3.1.1 配置 Alembic
```bash
cd backend
alembic init alembic
```

编辑 `alembic.ini`:
```ini
# 注释掉 sqlalchemy.url 行
# sqlalchemy.url = driver://user:pass@localhost/dbname
```

编辑 `alembic/env.py`:
```python
from app.config import settings
from app.database import Base
from app.models import ticket, tag  # 导入所有模型

# 设置数据库 URL
config.set_main_option("sqlalchemy.url", settings.DATABASE_URL)

# 设置 target_metadata
target_metadata = Base.metadata
```

### 3.2 创建数据库模型

#### 3.2.1 基础配置 (app/database.py)
```python
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.config import settings

engine = create_engine(settings.DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

#### 3.2.2 配置模型 (app/config.py)
```python
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str
    DEBUG: bool = False
    API_V1_PREFIX: str = "/api/v1"
    PROJECT_NAME: str = "Project Alpha"
    CORS_ORIGINS: list[str] = ["http://localhost:5173"]
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
```

#### 3.2.3 Ticket 模型 (app/models/ticket.py)
```python
from sqlalchemy import Column, Integer, String, Text, Enum, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from app.database import Base

class TicketStatus(str, enum.Enum):
    PENDING = "pending"
    COMPLETED = "completed"

class Ticket(Base):
    __tablename__ = "tickets"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False, index=True)
    description = Column(Text, nullable=True)
    status = Column(
        Enum(TicketStatus, name="ticket_status"),
        default=TicketStatus.PENDING,
        nullable=False,
        index=True
    )
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow, nullable=False)
    updated_at = Column(
        DateTime(timezone=True),
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False
    )
    
    # 关系
    tags = relationship("Tag", secondary="ticket_tags", back_populates="tickets")
```

#### 3.2.4 Tag 模型 (app/models/tag.py)
```python
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class Tag(Base):
    __tablename__ = "tags"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), unique=True, nullable=False, index=True)
    color = Column(String(7), default="#3B82F6", nullable=False)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow, nullable=False)
    
    # 关系
    tickets = relationship("Ticket", secondary="ticket_tags", back_populates="tags")
```

#### 3.2.5 关联表 (app/models/ticket_tag.py)
```python
from sqlalchemy import Column, Integer, ForeignKey, DateTime, Table
from datetime import datetime
from app.database import Base

ticket_tags = Table(
    'ticket_tags',
    Base.metadata,
    Column('ticket_id', Integer, ForeignKey('tickets.id', ondelete='CASCADE'), primary_key=True),
    Column('tag_id', Integer, ForeignKey('tags.id', ondelete='CASCADE'), primary_key=True),
    Column('created_at', DateTime(timezone=True), default=datetime.utcnow, nullable=False)
)
```

#### 3.2.6 模型导出 (app/models/__init__.py)
```python
from app.models.ticket import Ticket, TicketStatus
from app.models.tag import Tag
from app.models.ticket_tag import ticket_tags

__all__ = ["Ticket", "TicketStatus", "Tag", "ticket_tags"]
```

### 3.3 执行数据库迁移

#### 3.3.1 创建初始迁移
```bash
cd backend
alembic revision --autogenerate -m "Initial schema: tickets, tags, ticket_tags"
```

#### 3.3.2 检查迁移脚本
查看生成的迁移文件 `alembic/versions/xxxx_initial_schema.py`，确认：
- 三个表的创建语句
- 索引的创建
- 外键约束
- 枚举类型的定义

#### 3.3.3 执行迁移
```bash
alembic upgrade head
```

#### 3.3.4 验证表结构
```bash
psql -h localhost -U alpha_user -d project_alpha -c "\dt"
psql -h localhost -U alpha_user -d project_alpha -c "\d tickets"
psql -h localhost -U alpha_user -d project_alpha -c "\d tags"
psql -h localhost -U alpha_user -d project_alpha -c "\d ticket_tags"
```

### 3.4 创建测试数据（可选）

创建 `backend/scripts/seed_data.py`:
```python
from app.database import SessionLocal
from app.models import Ticket, Tag, TicketStatus
from datetime import datetime

def seed_data():
    db = SessionLocal()
    
    try:
        # 创建标签
        tags = [
            Tag(name="bug", color="#EF4444"),
            Tag(name="feature", color="#10B981"),
            Tag(name="frontend", color="#3B82F6"),
            Tag(name="backend", color="#8B5CF6"),
            Tag(name="urgent", color="#F59E0B"),
        ]
        db.add_all(tags)
        db.commit()
        
        # 创建票务
        ticket1 = Ticket(
            title="修复登录页面样式问题",
            description="移动端显示不正常",
            status=TicketStatus.PENDING
        )
        ticket1.tags = [tags[0], tags[2]]  # bug, frontend
        
        ticket2 = Ticket(
            title="实现数据导出功能",
            description="支持 CSV 和 Excel 格式",
            status=TicketStatus.COMPLETED
        )
        ticket2.tags = [tags[1], tags[3]]  # feature, backend
        
        db.add_all([ticket1, ticket2])
        db.commit()
        
        print("Test data seeded successfully!")
        
    except Exception as e:
        print(f"Error: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_data()
```

---

## 4. 后端开发实施

### 4.1 Pydantic Schema 定义

#### 4.1.1 Tag Schemas (app/schemas/tag.py)
```python
from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class TagBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=50)
    color: str = Field(..., pattern="^#[0-9A-Fa-f]{6}$")

class TagCreate(TagBase):
    pass

class TagUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=50)
    color: Optional[str] = Field(None, pattern="^#[0-9A-Fa-f]{6}$")

class TagResponse(TagBase):
    id: int
    created_at: datetime
    ticket_count: Optional[int] = None
    
    class Config:
        from_attributes = True

class TagListResponse(BaseModel):
    data: list[TagResponse]
    total: int
```

#### 4.1.2 Ticket Schemas (app/schemas/ticket.py)
```python
from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional
from app.schemas.tag import TagResponse

class TicketBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    description: Optional[str] = None

class TicketCreate(TicketBase):
    tag_ids: Optional[list[int]] = []

class TicketUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    description: Optional[str] = None

class TicketResponse(TicketBase):
    id: int
    status: str
    tags: list[TagResponse]
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

class TicketListResponse(BaseModel):
    data: list[TicketResponse]
    total: int
    page: int
    page_size: int
    total_pages: int

class TicketStatusToggleResponse(BaseModel):
    id: int
    status: str
    updated_at: datetime

class TicketTagsAdd(BaseModel):
    tag_ids: Optional[list[int]] = None
    tag_names: Optional[list[dict]] = None  # [{"name": "...", "color": "..."}]
```

#### 4.1.3 Schemas 导出 (app/schemas/__init__.py)
```python
from app.schemas.ticket import (
    TicketCreate,
    TicketUpdate,
    TicketResponse,
    TicketListResponse,
    TicketStatusToggleResponse,
    TicketTagsAdd
)
from app.schemas.tag import (
    TagCreate,
    TagUpdate,
    TagResponse,
    TagListResponse
)

__all__ = [
    "TicketCreate", "TicketUpdate", "TicketResponse", "TicketListResponse",
    "TicketStatusToggleResponse", "TicketTagsAdd",
    "TagCreate", "TagUpdate", "TagResponse", "TagListResponse"
]
```

### 4.2 Service 层实现

#### 4.2.1 Tag Service (app/services/tag_service.py)
```python
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import Optional
from app.models import Tag, ticket_tags
from app.schemas import TagCreate, TagUpdate

class TagService:
    @staticmethod
    def get_tags(db: Session, with_count: bool = False) -> list[Tag]:
        query = db.query(Tag)
        
        if with_count:
            query = query.outerjoin(ticket_tags).group_by(Tag.id)
            # 添加 ticket_count 属性
            query = query.add_columns(
                func.count(ticket_tags.c.ticket_id).label("ticket_count")
            )
            results = query.all()
            # 将 ticket_count 附加到 Tag 对象
            tags = []
            for tag, count in results:
                tag.ticket_count = count
                tags.append(tag)
            return tags
        
        return query.all()
    
    @staticmethod
    def get_tag(db: Session, tag_id: int) -> Optional[Tag]:
        return db.query(Tag).filter(Tag.id == tag_id).first()
    
    @staticmethod
    def get_tag_by_name(db: Session, name: str) -> Optional[Tag]:
        return db.query(Tag).filter(Tag.name == name).first()
    
    @staticmethod
    def create_tag(db: Session, tag_data: TagCreate) -> Tag:
        tag = Tag(**tag_data.model_dump())
        db.add(tag)
        db.commit()
        db.refresh(tag)
        return tag
    
    @staticmethod
    def update_tag(db: Session, tag_id: int, tag_data: TagUpdate) -> Optional[Tag]:
        tag = TagService.get_tag(db, tag_id)
        if not tag:
            return None
        
        update_data = tag_data.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(tag, field, value)
        
        db.commit()
        db.refresh(tag)
        return tag
    
    @staticmethod
    def delete_tag(db: Session, tag_id: int) -> bool:
        tag = TagService.get_tag(db, tag_id)
        if not tag:
            return False
        
        db.delete(tag)
        db.commit()
        return True
```

#### 4.2.2 Ticket Service (app/services/ticket_service.py)
```python
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import or_, func
from typing import Optional
from datetime import datetime
from app.models import Ticket, Tag, TicketStatus, ticket_tags
from app.schemas import TicketCreate, TicketUpdate

class TicketService:
    @staticmethod
    def get_tickets(
        db: Session,
        status: Optional[str] = None,
        tag_ids: Optional[list[int]] = None,
        search: Optional[str] = None,
        skip: int = 0,
        limit: int = 50
    ) -> tuple[list[Ticket], int]:
        query = db.query(Ticket).options(joinedload(Ticket.tags))
        
        # 状态过滤
        if status and status != "all":
            query = query.filter(Ticket.status == status)
        
        # 标签过滤 (AND 逻辑)
        if tag_ids:
            for tag_id in tag_ids:
                query = query.filter(Ticket.tags.any(Tag.id == tag_id))
        
        # 标题搜索
        if search:
            query = query.filter(Ticket.title.ilike(f"%{search}%"))
        
        # 总数
        total = query.count()
        
        # 分页
        tickets = query.order_by(Ticket.created_at.desc()).offset(skip).limit(limit).all()
        
        return tickets, total
    
    @staticmethod
    def get_ticket(db: Session, ticket_id: int) -> Optional[Ticket]:
        return db.query(Ticket).options(joinedload(Ticket.tags)).filter(Ticket.id == ticket_id).first()
    
    @staticmethod
    def create_ticket(db: Session, ticket_data: TicketCreate) -> Ticket:
        # 创建票务
        ticket_dict = ticket_data.model_dump(exclude={"tag_ids"})
        ticket = Ticket(**ticket_dict)
        
        # 关联标签
        if ticket_data.tag_ids:
            tags = db.query(Tag).filter(Tag.id.in_(ticket_data.tag_ids)).all()
            ticket.tags = tags
        
        db.add(ticket)
        db.commit()
        db.refresh(ticket)
        return ticket
    
    @staticmethod
    def update_ticket(db: Session, ticket_id: int, ticket_data: TicketUpdate) -> Optional[Ticket]:
        ticket = TicketService.get_ticket(db, ticket_id)
        if not ticket:
            return None
        
        update_data = ticket_data.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(ticket, field, value)
        
        ticket.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(ticket)
        return ticket
    
    @staticmethod
    def delete_ticket(db: Session, ticket_id: int) -> bool:
        ticket = TicketService.get_ticket(db, ticket_id)
        if not ticket:
            return False
        
        db.delete(ticket)
        db.commit()
        return True
    
    @staticmethod
    def toggle_status(db: Session, ticket_id: int) -> Optional[Ticket]:
        ticket = TicketService.get_ticket(db, ticket_id)
        if not ticket:
            return None
        
        # 切换状态
        ticket.status = (
            TicketStatus.COMPLETED
            if ticket.status == TicketStatus.PENDING
            else TicketStatus.PENDING
        )
        ticket.updated_at = datetime.utcnow()
        
        db.commit()
        db.refresh(ticket)
        return ticket
    
    @staticmethod
    def add_tags(
        db: Session,
        ticket_id: int,
        tag_ids: Optional[list[int]] = None,
        tag_names: Optional[list[dict]] = None
    ) -> Optional[Ticket]:
        ticket = TicketService.get_ticket(db, ticket_id)
        if not ticket:
            return None
        
        # 添加已存在的标签
        if tag_ids:
            tags = db.query(Tag).filter(Tag.id.in_(tag_ids)).all()
            for tag in tags:
                if tag not in ticket.tags:
                    ticket.tags.append(tag)
        
        # 创建并添加新标签
        if tag_names:
            from app.services.tag_service import TagService
            from app.schemas import TagCreate
            
            for tag_data in tag_names:
                # 检查标签是否已存在
                existing_tag = TagService.get_tag_by_name(db, tag_data["name"])
                if existing_tag:
                    if existing_tag not in ticket.tags:
                        ticket.tags.append(existing_tag)
                else:
                    # 创建新标签
                    new_tag = TagService.create_tag(db, TagCreate(**tag_data))
                    ticket.tags.append(new_tag)
        
        ticket.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(ticket)
        return ticket
    
    @staticmethod
    def remove_tag(db: Session, ticket_id: int, tag_id: int) -> bool:
        ticket = TicketService.get_ticket(db, ticket_id)
        if not ticket:
            return False
        
        tag = db.query(Tag).filter(Tag.id == tag_id).first()
        if not tag or tag not in ticket.tags:
            return False
        
        ticket.tags.remove(tag)
        ticket.updated_at = datetime.utcnow()
        db.commit()
        return True
```

### 4.3 API 路由实现

#### 4.3.1 依赖注入 (app/api/deps.py)
```python
from typing import Generator
from fastapi import Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal

def get_db() -> Generator:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

#### 4.3.2 标签路由 (app/api/tags.py)
```python
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.api.deps import get_db
from app.services.tag_service import TagService
from app.schemas import TagCreate, TagUpdate, TagResponse, TagListResponse

router = APIRouter(prefix="/tags", tags=["tags"])

@router.get("", response_model=TagListResponse)
def get_tags(
    with_count: bool = False,
    db: Session = Depends(get_db)
):
    tags = TagService.get_tags(db, with_count=with_count)
    return TagListResponse(data=tags, total=len(tags))

@router.get("/{tag_id}", response_model=TagResponse)
def get_tag(tag_id: int, db: Session = Depends(get_db)):
    tag = TagService.get_tag(db, tag_id)
    if not tag:
        raise HTTPException(status_code=404, detail="Tag not found")
    return tag

@router.post("", response_model=TagResponse, status_code=status.HTTP_201_CREATED)
def create_tag(tag_data: TagCreate, db: Session = Depends(get_db)):
    # 检查标签名称是否已存在
    existing_tag = TagService.get_tag_by_name(db, tag_data.name)
    if existing_tag:
        raise HTTPException(
            status_code=409,
            detail="Tag with this name already exists"
        )
    
    tag = TagService.create_tag(db, tag_data)
    return tag

@router.put("/{tag_id}", response_model=TagResponse)
def update_tag(
    tag_id: int,
    tag_data: TagUpdate,
    db: Session = Depends(get_db)
):
    tag = TagService.update_tag(db, tag_id, tag_data)
    if not tag:
        raise HTTPException(status_code=404, detail="Tag not found")
    return tag

@router.delete("/{tag_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_tag(tag_id: int, db: Session = Depends(get_db)):
    success = TagService.delete_tag(db, tag_id)
    if not success:
        raise HTTPException(status_code=404, detail="Tag not found")
```

#### 4.3.3 票务路由 (app/api/tickets.py)
```python
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import Optional
from math import ceil
from app.api.deps import get_db
from app.services.ticket_service import TicketService
from app.schemas import (
    TicketCreate,
    TicketUpdate,
    TicketResponse,
    TicketListResponse,
    TicketStatusToggleResponse,
    TicketTagsAdd
)

router = APIRouter(prefix="/tickets", tags=["tickets"])

@router.get("", response_model=TicketListResponse)
def get_tickets(
    status: Optional[str] = Query(None, regex="^(pending|completed|all)$"),
    tag_ids: Optional[str] = None,  # 逗号分隔的 ID 列表
    search: Optional[str] = None,
    page: int = Query(1, ge=1),
    page_size: int = Query(50, ge=1, le=100),
    db: Session = Depends(get_db)
):
    # 解析 tag_ids
    tag_id_list = None
    if tag_ids:
        try:
            tag_id_list = [int(id.strip()) for id in tag_ids.split(",")]
        except ValueError:
            raise HTTPException(status_code=400, detail="Invalid tag_ids format")
    
    skip = (page - 1) * page_size
    tickets, total = TicketService.get_tickets(
        db,
        status=status,
        tag_ids=tag_id_list,
        search=search,
        skip=skip,
        limit=page_size
    )
    
    total_pages = ceil(total / page_size) if total > 0 else 1
    
    return TicketListResponse(
        data=tickets,
        total=total,
        page=page,
        page_size=page_size,
        total_pages=total_pages
    )

@router.get("/{ticket_id}", response_model=TicketResponse)
def get_ticket(ticket_id: int, db: Session = Depends(get_db)):
    ticket = TicketService.get_ticket(db, ticket_id)
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return ticket

@router.post("", response_model=TicketResponse, status_code=status.HTTP_201_CREATED)
def create_ticket(ticket_data: TicketCreate, db: Session = Depends(get_db)):
    ticket = TicketService.create_ticket(db, ticket_data)
    return ticket

@router.put("/{ticket_id}", response_model=TicketResponse)
def update_ticket(
    ticket_id: int,
    ticket_data: TicketUpdate,
    db: Session = Depends(get_db)
):
    ticket = TicketService.update_ticket(db, ticket_id, ticket_data)
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return ticket

@router.delete("/{ticket_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_ticket(ticket_id: int, db: Session = Depends(get_db)):
    success = TicketService.delete_ticket(db, ticket_id)
    if not success:
        raise HTTPException(status_code=404, detail="Ticket not found")

@router.patch("/{ticket_id}/toggle-status", response_model=TicketStatusToggleResponse)
def toggle_ticket_status(ticket_id: int, db: Session = Depends(get_db)):
    ticket = TicketService.toggle_status(db, ticket_id)
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    
    return TicketStatusToggleResponse(
        id=ticket.id,
        status=ticket.status.value,
        updated_at=ticket.updated_at
    )

@router.post("/{ticket_id}/tags", response_model=TicketResponse)
def add_tags_to_ticket(
    ticket_id: int,
    tags_data: TicketTagsAdd,
    db: Session = Depends(get_db)
):
    ticket = TicketService.add_tags(
        db,
        ticket_id,
        tag_ids=tags_data.tag_ids,
        tag_names=tags_data.tag_names
    )
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return ticket

@router.delete("/{ticket_id}/tags/{tag_id}", status_code=status.HTTP_204_NO_CONTENT)
def remove_tag_from_ticket(
    ticket_id: int,
    tag_id: int,
    db: Session = Depends(get_db)
):
    success = TicketService.remove_tag(db, ticket_id, tag_id)
    if not success:
        raise HTTPException(
            status_code=404,
            detail="Ticket or tag not found, or tag not associated with ticket"
        )
```

### 4.4 主应用配置

#### 4.4.1 FastAPI 应用 (app/main.py)
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.api import tickets, tags

# 创建 FastAPI 应用
app = FastAPI(
    title=settings.PROJECT_NAME,
    version="1.0.0",
    description="票务标签管理系统 API",
    docs_url=f"{settings.API_V1_PREFIX}/docs",
    redoc_url=f"{settings.API_V1_PREFIX}/redoc",
)

# 配置 CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 注册路由
app.include_router(tickets.router, prefix=settings.API_V1_PREFIX)
app.include_router(tags.router, prefix=settings.API_V1_PREFIX)

# 健康检查端点
@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.get("/")
def root():
    return {
        "message": "Welcome to Project Alpha API",
        "docs": f"{settings.API_V1_PREFIX}/docs"
    }
```

### 4.5 后端测试

#### 4.5.1 启动开发服务器
```bash
cd backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

#### 4.5.2 测试 API 端点
访问: http://localhost:8000/api/v1/docs

测试以下端点:
- GET /health
- GET /api/v1/tags
- POST /api/v1/tags
- GET /api/v1/tickets
- POST /api/v1/tickets

---

## 5. 前端开发实施

### 5.1 项目基础配置

#### 5.1.1 TypeScript 类型定义 (src/types/index.ts)
```typescript
export enum TicketStatus {
  PENDING = 'pending',
  COMPLETED = 'completed'
}

export interface Tag {
  id: number;
  name: string;
  color: string;
  created_at: string;
  ticket_count?: number;
}

export interface Ticket {
  id: number;
  title: string;
  description?: string;
  status: TicketStatus;
  tags: Tag[];
  created_at: string;
  updated_at: string;
}

export interface TicketFilters {
  status?: TicketStatus | 'all';
  tag_ids?: number[];
  search?: string;
  page?: number;
  page_size?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export interface TicketCreate {
  title: string;
  description?: string;
  tag_ids?: number[];
}

export interface TicketUpdate {
  title?: string;
  description?: string;
}

export interface TagCreate {
  name: string;
  color: string;
}
```

#### 5.1.2 API 客户端配置 (src/api/client.ts)
```typescript
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // 统一错误处理
    const message = error.response?.data?.detail || error.message || '请求失败';
    console.error('API Error:', message);
    return Promise.reject(error);
  }
);
```

#### 5.1.3 票务 API (src/api/tickets.ts)
```typescript
import { apiClient } from './client';
import type {
  Ticket,
  TicketCreate,
  TicketUpdate,
  TicketFilters,
  PaginatedResponse,
} from '../types';

export const ticketsApi = {
  getTickets: (filters: TicketFilters = {}) => {
    const params: any = {};
    
    if (filters.status && filters.status !== 'all') {
      params.status = filters.status;
    }
    
    if (filters.tag_ids && filters.tag_ids.length > 0) {
      params.tag_ids = filters.tag_ids.join(',');
    }
    
    if (filters.search) {
      params.search = filters.search;
    }
    
    if (filters.page) {
      params.page = filters.page;
    }
    
    if (filters.page_size) {
      params.page_size = filters.page_size;
    }
    
    return apiClient.get<PaginatedResponse<Ticket>>('/tickets', { params });
  },

  getTicket: (id: number) => {
    return apiClient.get<Ticket>(`/tickets/${id}`);
  },

  createTicket: (data: TicketCreate) => {
    return apiClient.post<Ticket>('/tickets', data);
  },

  updateTicket: (id: number, data: TicketUpdate) => {
    return apiClient.put<Ticket>(`/tickets/${id}`, data);
  },

  deleteTicket: (id: number) => {
    return apiClient.delete(`/tickets/${id}`);
  },

  toggleStatus: (id: number) => {
    return apiClient.patch<{ id: number; status: string; updated_at: string }>(
      `/tickets/${id}/toggle-status`
    );
  },

  addTags: (id: number, tag_ids: number[]) => {
    return apiClient.post<Ticket>(`/tickets/${id}/tags`, { tag_ids });
  },

  removeTag: (ticketId: number, tagId: number) => {
    return apiClient.delete(`/tickets/${ticketId}/tags/${tagId}`);
  },
};
```

#### 5.1.4 标签 API (src/api/tags.ts)
```typescript
import { apiClient } from './client';
import type { Tag, TagCreate } from '../types';

export const tagsApi = {
  getTags: (withCount: boolean = false) => {
    return apiClient.get<{ data: Tag[]; total: number }>('/tags', {
      params: { with_count: withCount },
    });
  },

  createTag: (data: TagCreate) => {
    return apiClient.post<Tag>('/tags', data);
  },

  updateTag: (id: number, data: Partial<TagCreate>) => {
    return apiClient.put<Tag>(`/tags/${id}`, data);
  },

  deleteTag: (id: number) => {
    return apiClient.delete(`/tags/${id}`);
  },
};
```

### 5.2 工具函数

#### 5.2.1 防抖Hook (src/hooks/useDebounce.ts)
```typescript
import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
```

#### 5.2.2 日期格式化 (src/utils/date.ts)
```typescript
import { format, formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';

export const formatDate = (date: string | Date) => {
  return format(new Date(date), 'yyyy-MM-dd HH:mm', { locale: zhCN });
};

export const formatRelativeDate = (date: string | Date) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true, locale: zhCN });
};
```

#### 5.2.3 颜色预设 (src/utils/colors.ts)
```typescript
export const PRESET_COLORS = [
  { name: 'Red', value: '#EF4444' },
  { name: 'Orange', value: '#F97316' },
  { name: 'Amber', value: '#F59E0B' },
  { name: 'Yellow', value: '#EAB308' },
  { name: 'Lime', value: '#84CC16' },
  { name: 'Green', value: '#10B981' },
  { name: 'Emerald', value: '#059669' },
  { name: 'Teal', value: '#14B8A6' },
  { name: 'Cyan', value: '#06B6D4' },
  { name: 'Sky', value: '#0EA5E9' },
  { name: 'Blue', value: '#3B82F6' },
  { name: 'Indigo', value: '#6366F1' },
  { name: 'Violet', value: '#8B5CF6' },
  { name: 'Purple', value: '#A855F7' },
  { name: 'Fuchsia', value: '#D946EF' },
  { name: 'Pink', value: '#EC4899' },
  { name: 'Rose', value: '#F43F5E' },
];

export const getRandomColor = () => {
  return PRESET_COLORS[Math.floor(Math.random() * PRESET_COLORS.length)].value;
};
```

### 5.3 核心组件实现

#### 5.3.1 TagBadge 组件 (src/components/tags/TagBadge.tsx)
```typescript
import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Tag } from '@/types';

interface TagBadgeProps {
  tag: Tag;
  removable?: boolean;
  onRemove?: (tagId: number) => void;
}

export function TagBadge({ tag, removable = false, onRemove }: TagBadgeProps) {
  return (
    <Badge
      style={{ backgroundColor: tag.color, color: '#fff' }}
      className="flex items-center gap-1 px-2 py-1"
    >
      <span>{tag.name}</span>
      {removable && onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(tag.id);
          }}
          className="ml-1 hover:bg-white/20 rounded-full p-0.5"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </Badge>
  );
}
```

#### 5.3.2 TicketCard 组件 (src/components/tickets/TicketCard.tsx)
```typescript
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { TagBadge } from '@/components/tags/TagBadge';
import { Edit, Trash2 } from 'lucide-react';
import { formatRelativeDate } from '@/utils/date';
import type { Ticket } from '@/types';
import { TicketStatus } from '@/types';

interface TicketCardProps {
  ticket: Ticket;
  onToggleStatus: (ticketId: number) => void;
  onEdit: (ticket: Ticket) => void;
  onDelete: (ticketId: number) => void;
  onRemoveTag: (ticketId: number, tagId: number) => void;
}

export function TicketCard({
  ticket,
  onToggleStatus,
  onEdit,
  onDelete,
  onRemoveTag,
}: TicketCardProps) {
  const isCompleted = ticket.status === TicketStatus.COMPLETED;

  return (
    <div
      className={`border rounded-lg p-4 transition-colors ${
        isCompleted ? 'bg-gray-50 opacity-75' : 'bg-white'
      }`}
    >
      <div className="flex items-start gap-3">
        <Checkbox
          checked={isCompleted}
          onCheckedChange={() => onToggleStatus(ticket.id)}
          className="mt-1"
        />
        
        <div className="flex-1 min-w-0">
          <h3
            className={`text-lg font-medium mb-1 ${
              isCompleted ? 'line-through text-gray-500' : ''
            }`}
          >
            {ticket.title}
          </h3>
          
          {ticket.description && (
            <p className="text-sm text-gray-600 mb-2">{ticket.description}</p>
          )}
          
          {ticket.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {ticket.tags.map((tag) => (
                <TagBadge
                  key={tag.id}
                  tag={tag}
                  removable
                  onRemove={(tagId) => onRemoveTag(ticket.id, tagId)}
                />
              ))}
            </div>
          )}
          
          <div className="text-xs text-gray-400">
            {formatRelativeDate(ticket.updated_at)}
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(ticket)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(ticket.id)}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      </div>
    </div>
  );
}
```

#### 5.3.3 SearchBar 组件 (src/components/common/SearchBar.tsx)
```typescript
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import { useEffect, useState } from 'react';

interface SearchBarProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  debounceMs?: number;
}

export function SearchBar({
  placeholder,
  value,
  onChange,
  debounceMs = 500,
}: SearchBarProps) {
  const [localValue, setLocalValue] = useState(value);
  const debouncedValue = useDebounce(localValue, debounceMs);

  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input
        type="text"
        placeholder={placeholder}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        className="pl-10"
      />
    </div>
  );
}
```

#### 5.3.4 TicketDialog 组件 (src/components/tickets/TicketDialog.tsx)
```typescript
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { Ticket, TicketCreate, TicketUpdate } from '@/types';

interface TicketDialogProps {
  open: boolean;
  ticket?: Ticket;
  onClose: () => void;
  onSave: (data: TicketCreate | TicketUpdate) => Promise<void>;
}

export function TicketDialog({ open, ticket, onClose, onSave }: TicketDialogProps) {
  const isEdit = !!ticket;
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      title: ticket?.title || '',
      description: ticket?.description || '',
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        title: ticket?.title || '',
        description: ticket?.description || '',
      });
    }
  }, [open, ticket, reset]);

  const onSubmit = async (data: any) => {
    await onSave(data);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? '编辑票务' : '创建票务'}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">标题 *</Label>
              <Input
                id="title"
                {...register('title', {
                  required: '请输入标题',
                  maxLength: { value: 200, message: '标题最多200字符' },
                })}
                placeholder="输入票务标题"
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">描述</Label>
              <Textarea
                id="description"
                {...register('description')}
                placeholder="输入票务描述（可选）"
                rows={4}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              取消
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? '保存中...' : isEdit ? '保存' : '创建'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
```

#### 5.3.5 TagFilter 组件 (src/components/tags/TagFilter.tsx)
```typescript
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { TagBadge } from './TagBadge';
import type { Tag } from '@/types';
import { TicketStatus } from '@/types';

interface TagFilterProps {
  tags: Tag[];
  selectedTagIds: number[];
  onTagSelect: (tagIds: number[]) => void;
  statusFilter: TicketStatus | 'all';
  onStatusChange: (status: TicketStatus | 'all') => void;
}

export function TagFilter({
  tags,
  selectedTagIds,
  onTagSelect,
  statusFilter,
  onStatusChange,
}: TagFilterProps) {
  const handleTagToggle = (tagId: number) => {
    if (selectedTagIds.includes(tagId)) {
      onTagSelect(selectedTagIds.filter((id) => id !== tagId));
    } else {
      onTagSelect([...selectedTagIds, tagId]);
    }
  };

  return (
    <div className="w-64 border-r bg-gray-50 p-4 space-y-6">
      <div>
        <h3 className="font-medium mb-3">状态筛选</h3>
        <RadioGroup value={statusFilter} onValueChange={onStatusChange}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="status-all" />
            <Label htmlFor="status-all">全部</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={TicketStatus.PENDING} id="status-pending" />
            <Label htmlFor="status-pending">未完成</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={TicketStatus.COMPLETED} id="status-completed" />
            <Label htmlFor="status-completed">已完成</Label>
          </div>
        </RadioGroup>
      </div>
      
      <div>
        <h3 className="font-medium mb-3">标签筛选</h3>
        <div className="space-y-2">
          {tags.map((tag) => (
            <div key={tag.id} className="flex items-center gap-2">
              <Checkbox
                id={`tag-${tag.id}`}
                checked={selectedTagIds.includes(tag.id)}
                onCheckedChange={() => handleTagToggle(tag.id)}
              />
              <Label htmlFor={`tag-${tag.id}`} className="flex-1 cursor-pointer">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: tag.color }}
                  />
                  <span>{tag.name}</span>
                  {tag.ticket_count !== undefined && (
                    <span className="text-gray-400">({tag.ticket_count})</span>
                  )}
                </div>
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

### 5.4 主应用组件

#### 5.4.1 App.tsx
```typescript
import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { SearchBar } from '@/components/common/SearchBar';
import { TicketCard } from '@/components/tickets/TicketCard';
import { TicketDialog } from '@/components/tickets/TicketDialog';
import { TagFilter } from '@/components/tags/TagFilter';
import { Plus } from 'lucide-react';
import { ticketsApi } from '@/api/tickets';
import { tagsApi } from '@/api/tags';
import { useToast } from '@/components/ui/use-toast';
import type { Ticket, Tag, TicketFilters, TicketCreate, TicketUpdate } from '@/types';
import { TicketStatus } from '@/types';

function App() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [filters, setFilters] = useState<TicketFilters>({
    status: 'all',
    tag_ids: [],
    search: '',
    page: 1,
    page_size: 50,
  });
  const [total, setTotal] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState<Ticket | undefined>();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // 加载标签
  const loadTags = useCallback(async () => {
    try {
      const response = await tagsApi.getTags(true);
      setTags(response.data.data);
    } catch (error) {
      toast({
        title: '加载标签失败',
        variant: 'destructive',
      });
    }
  }, [toast]);

  // 加载票务
  const loadTickets = useCallback(async () => {
    setLoading(true);
    try {
      const response = await ticketsApi.getTickets(filters);
      setTickets(response.data.data);
      setTotal(response.data.total);
    } catch (error) {
      toast({
        title: '加载票务失败',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [filters, toast]);

  useEffect(() => {
    loadTags();
  }, [loadTags]);

  useEffect(() => {
    loadTickets();
  }, [loadTickets]);

  const handleCreateTicket = () => {
    setEditingTicket(undefined);
    setIsDialogOpen(true);
  };

  const handleEditTicket = (ticket: Ticket) => {
    setEditingTicket(ticket);
    setIsDialogOpen(true);
  };

  const handleSaveTicket = async (data: TicketCreate | TicketUpdate) => {
    try {
      if (editingTicket) {
        await ticketsApi.updateTicket(editingTicket.id, data as TicketUpdate);
        toast({ title: '票务更新成功' });
      } else {
        await ticketsApi.createTicket(data as TicketCreate);
        toast({ title: '票务创建成功' });
      }
      loadTickets();
      loadTags();
    } catch (error) {
      toast({
        title: editingTicket ? '更新失败' : '创建失败',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteTicket = async (ticketId: number) => {
    if (!confirm('确定要删除这个票务吗？此操作不可撤销。')) {
      return;
    }

    try {
      await ticketsApi.deleteTicket(ticketId);
      toast({ title: '票务删除成功' });
      loadTickets();
      loadTags();
    } catch (error) {
      toast({
        title: '删除失败',
        variant: 'destructive',
      });
    }
  };

  const handleToggleStatus = async (ticketId: number) => {
    try {
      await ticketsApi.toggleStatus(ticketId);
      loadTickets();
    } catch (error) {
      toast({
        title: '状态切换失败',
        variant: 'destructive',
      });
    }
  };

  const handleRemoveTag = async (ticketId: number, tagId: number) => {
    try {
      await ticketsApi.removeTag(ticketId, tagId);
      toast({ title: '标签移除成功' });
      loadTickets();
      loadTags();
    } catch (error) {
      toast({
        title: '移除标签失败',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Project Alpha - 票务管理</h1>
          <Button onClick={handleCreateTicket}>
            <Plus className="h-4 w-4 mr-2" />
            新建票务
          </Button>
        </div>
      </header>

      <div className="container mx-auto flex">
        <TagFilter
          tags={tags}
          selectedTagIds={filters.tag_ids || []}
          onTagSelect={(tagIds) => setFilters({ ...filters, tag_ids: tagIds, page: 1 })}
          statusFilter={filters.status || 'all'}
          onStatusChange={(status) => setFilters({ ...filters, status, page: 1 })}
        />

        <main className="flex-1 p-6">
          <div className="mb-6">
            <SearchBar
              placeholder="搜索票务标题..."
              value={filters.search || ''}
              onChange={(search) => setFilters({ ...filters, search, page: 1 })}
            />
          </div>

          {loading ? (
            <div className="text-center py-12">加载中...</div>
          ) : tickets.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              暂无票务，点击右上角按钮创建第一个票务
            </div>
          ) : (
            <div className="space-y-4">
              {tickets.map((ticket) => (
                <TicketCard
                  key={ticket.id}
                  ticket={ticket}
                  onToggleStatus={handleToggleStatus}
                  onEdit={handleEditTicket}
                  onDelete={handleDeleteTicket}
                  onRemoveTag={handleRemoveTag}
                />
              ))}
            </div>
          )}

          {total > 0 && (
            <div className="mt-6 text-center text-sm text-gray-500">
              共 {total} 个票务
            </div>
          )}
        </main>
      </div>

      <TicketDialog
        open={isDialogOpen}
        ticket={editingTicket}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSaveTicket}
      />
    </div>
  );
}

export default App;
```

### 5.5 前端测试

#### 5.5.1 启动开发服务器
```bash
cd frontend
npm run dev
```

访问: http://localhost:5173

#### 5.5.2 功能测试清单
- [ ] 创建票务
- [ ] 编辑票务
- [ ] 删除票务
- [ ] 切换完成状态
- [ ] 搜索票务
- [ ] 按标签筛选
- [ ] 按状态筛选
- [ ] 响应式布局测试

---

## 6. 集成与联调

### 6.1 前后端联调步骤

#### 6.1.1 同时启动前后端
```bash
# 终端1 - 后端
cd backend
source .venv/bin/activate
uvicorn app.main:app --reload --port 8000

# 终端2 - 前端
cd frontend
npm run dev
```

#### 6.1.2 API 调用测试
1. 打开浏览器开发者工具 (F12)
2. 切换到 Network 标签
3. 执行各项操作，观察网络请求
4. 验证请求/响应格式

#### 6.1.3 常见问题排查

**CORS 错误**:
- 检查后端 `config.py` 中的 `CORS_ORIGINS` 配置
- 确认前端开发服务器端口

**API 404 错误**:
- 检查 API 路径是否正确
- 确认后端路由注册

**数据格式错误**:
- 检查 Pydantic Schema 定义
- 验证前端类型定义

### 6.2 端到端功能测试

#### 6.2.1 票务完整生命周期测试
1. 创建新票务
2. 为票务添加标签
3. 编辑票务信息
4. 切换完成状态
5. 从票务移除标签
6. 删除票务

#### 6.2.2 筛选功能测试
1. 创建多个带不同标签的票务
2. 测试单标签筛选
3. 测试多标签筛选 (AND 逻辑)
4. 测试状态筛选
5. 测试搜索功能
6. 测试筛选组合

---

## 7. 测试实施

### 7.1 后端单元测试

#### 7.1.1 测试配置 (backend/tests/conftest.py)
```python
import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.database import Base
from app.main import app
from fastapi.testclient import TestClient

# 使用内存数据库进行测试
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

@pytest.fixture(scope="function")
def db_session():
    engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
    TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    
    Base.metadata.create_all(bind=engine)
    
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()
        Base.metadata.drop_all(bind=engine)

@pytest.fixture(scope="function")
def client(db_session):
    def override_get_db():
        try:
            yield db_session
        finally:
            pass
    
    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as test_client:
        yield test_client
```

#### 7.1.2 票务测试 (backend/tests/test_tickets.py)
```python
def test_create_ticket(client):
    response = client.post(
        "/api/v1/tickets",
        json={"title": "Test Ticket", "description": "Test Description"}
    )
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "Test Ticket"
    assert data["status"] == "pending"

def test_get_tickets(client):
    # 先创建票务
    client.post("/api/v1/tickets", json={"title": "Ticket 1"})
    client.post("/api/v1/tickets", json={"title": "Ticket 2"})
    
    # 获取列表
    response = client.get("/api/v1/tickets")
    assert response.status_code == 200
    data = response.json()
    assert data["total"] == 2

def test_toggle_status(client):
    # 创建票务
    create_response = client.post("/api/v1/tickets", json={"title": "Test"})
    ticket_id = create_response.json()["id"]
    
    # 切换状态
    response = client.patch(f"/api/v1/tickets/{ticket_id}/toggle-status")
    assert response.status_code == 200
    assert response.json()["status"] == "completed"
```

#### 7.1.3 运行测试
```bash
cd backend
pytest tests/ -v
```

### 7.2 前端组件测试

#### 7.2.1 测试配置 (frontend/vitest.config.ts)
```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

#### 7.2.2 测试设置 (frontend/src/test/setup.ts)
```typescript
import '@testing-library/jest-dom';
```

#### 7.2.3 组件测试示例 (frontend/src/components/tickets/__tests__/TicketCard.test.tsx)
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { TicketCard } from '../TicketCard';
import { TicketStatus } from '@/types';

const mockTicket = {
  id: 1,
  title: 'Test Ticket',
  description: 'Test Description',
  status: TicketStatus.PENDING,
  tags: [],
  created_at: '2025-12-11T10:00:00Z',
  updated_at: '2025-12-11T10:00:00Z',
};

describe('TicketCard', () => {
  it('renders ticket information', () => {
    render(
      <TicketCard
        ticket={mockTicket}
        onToggleStatus={jest.fn()}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
        onRemoveTag={jest.fn()}
      />
    );
    
    expect(screen.getByText('Test Ticket')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('calls onToggleStatus when checkbox is clicked', () => {
    const handleToggle = jest.fn();
    render(
      <TicketCard
        ticket={mockTicket}
        onToggleStatus={handleToggle}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
        onRemoveTag={jest.fn()}
      />
    );
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    expect(handleToggle).toHaveBeenCalledWith(1);
  });
});
```

#### 7.2.4 运行测试
```bash
cd frontend
npm run test
```

### 7.3 API 集成测试

使用 Postman 或 Thunder Client 创建测试集合:

#### 7.3.1 测试用例集合
1. **健康检查**
   - GET /health
   - 预期: 200 OK

2. **标签管理**
   - POST /api/v1/tags (创建标签)
   - GET /api/v1/tags (获取标签列表)
   - PUT /api/v1/tags/{id} (更新标签)
   - DELETE /api/v1/tags/{id} (删除标签)

3. **票务管理**
   - POST /api/v1/tickets (创建票务)
   - GET /api/v1/tickets (获取票务列表)
   - GET /api/v1/tickets/{id} (获取票务详情)
   - PUT /api/v1/tickets/{id} (更新票务)
   - PATCH /api/v1/tickets/{id}/toggle-status (切换状态)
   - DELETE /api/v1/tickets/{id} (删除票务)

4. **票务-标签关联**
   - POST /api/v1/tickets/{id}/tags (添加标签)
   - DELETE /api/v1/tickets/{id}/tags/{tag_id} (移除标签)

---

## 8. 部署实施

### 8.1 本地部署

#### 8.1.1 后端部署
使用已有的 PostgreSQL 容器:
```bash
# 确认数据库连接
psql -h localhost -U alpha_user -d project_alpha -c "SELECT 1"

# 运行迁移
cd backend
alembic upgrade head

# 启动生产服务器
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

#### 8.1.2 前端构建
```bash
cd frontend
npm run build

# 使用简单HTTP服务器预览
npx serve -s dist -p 3000
```

### 8.2 Docker 容器化（可选）

#### 8.2.1 后端 Dockerfile
```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

#### 8.2.2 前端 Dockerfile
```dockerfile
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### 8.2.3 Docker Compose
```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://alpha_user:alpha_pass@host.docker.internal:5432/project_alpha
    depends_on:
      - db

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend
```

### 8.3 环境配置

#### 8.3.1 生产环境变量
后端 `.env`:
```env
DATABASE_URL=postgresql://alpha_user:alpha_pass@localhost:5432/project_alpha
DEBUG=False
CORS_ORIGINS=http://localhost:3000
```

前端 `.env.production`:
```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

---

## 9. 质量保证与优化

### 9.1 代码质量

#### 9.1.1 后端代码质量检查
```bash
cd backend

# 代码格式化
black app/

# 代码规范检查
flake8 app/

# 类型检查
mypy app/
```

#### 9.1.2 前端代码质量检查
```bash
cd frontend

# 代码格式化
npx prettier --write src/

# 代码规范检查
npm run lint

# 类型检查
npm run type-check
```

### 9.2 性能优化

#### 9.2.1 后端性能优化
- [ ] 数据库查询优化 (使用 joinedload 预加载关系)
- [ ] 添加数据库索引
- [ ] 实现分页查询
- [ ] API 响应缓存 (可选)
- [ ] 数据库连接池配置

#### 9.2.2 前端性能优化
- [ ] 组件懒加载
- [ ] 防抖搜索实现
- [ ] 虚拟滚动 (大量数据时)
- [ ] 图片优化
- [ ] 代码分割
- [ ] 生产构建优化

### 9.3 安全加固

#### 9.3.1 后端安全
- [ ] SQL 注入防护 (ORM 参数化查询)
- [ ] 输入验证 (Pydantic)
- [ ] 输出转义
- [ ] CORS 配置
- [ ] 速率限制 (可选)

#### 9.3.2 前端安全
- [ ] XSS 防护 (React 自动转义)
- [ ] HTTPS (生产环境)
- [ ] Content Security Policy
- [ ] 安全的 HTTP 头

### 9.4 文档完善

#### 9.4.1 API 文档
FastAPI 自动生成 Swagger 文档:
- 访问: http://localhost:8000/api/v1/docs
- ReDoc: http://localhost:8000/api/v1/redoc

#### 9.4.2 项目文档
- [ ] README.md (项目介绍、安装、运行)
- [ ] 开发文档 (架构、技术栈)
- [ ] 部署文档
- [ ] API 使用示例
- [ ] 故障排查指南

---

## 10. 项目时间线

### 第1周: 基础架构搭建
**目标**: 完成开发环境配置和数据库设计

#### Day 1-2: 环境准备
- [ ] 安装必需软件
- [ ] 创建项目目录结构
- [ ] 配置开发工具
- [ ] 初始化 Git 仓库

#### Day 3-4: 数据库设计
- [ ] 创建数据库模型
- [ ] 配置 Alembic
- [ ] 执行数据库迁移
- [ ] 创建测试数据

#### Day 5: 基础配置
- [ ] 后端基础配置 (config, database)
- [ ] 前端项目初始化
- [ ] API 客户端配置
- [ ] TypeScript 类型定义

**交付物**:
- 完整的项目结构
- 数据库表结构
- 基础配置文件

---

### 第2周: 后端核心功能开发
**目标**: 完成所有 API 接口实现

#### Day 6-7: Schema 和 Service 层
- [ ] 定义 Pydantic Schemas
- [ ] 实现 TagService
- [ ] 实现 TicketService
- [ ] Service 层单元测试

#### Day 8-9: API 路由
- [ ] 实现标签路由
- [ ] 实现票务路由
- [ ] 实现票务-标签关联路由
- [ ] API 集成测试

#### Day 10: 后端完善
- [ ] 错误处理优化
- [ ] API 文档完善
- [ ] 性能优化
- [ ] 代码审查

**交付物**:
- 完整的 RESTful API
- API 文档 (Swagger)
- 后端单元测试

---

### 第3周: 前端核心功能开发
**目标**: 完成主要 UI 组件和页面

#### Day 11-12: 基础组件
- [ ] 实现 TagBadge 组件
- [ ] 实现 SearchBar 组件
- [ ] 实现 TicketCard 组件
- [ ] 配置 Shadcn UI

#### Day 13-14: 核心功能组件
- [ ] 实现 TicketDialog 组件
- [ ] 实现 TagFilter 组件
- [ ] 实现 TicketList 组件
- [ ] API 集成

#### Day 15: 主应用开发
- [ ] 实现 App.tsx
- [ ] 状态管理
- [ ] 路由配置 (如需要)
- [ ] 组件联调

**交付物**:
- 完整的前端组件库
- 主应用页面
- 前端-后端集成

---

### 第4周: 高级功能与优化
**目标**: 完成筛选、搜索功能，优化用户体验

#### Day 16-17: 高级功能
- [ ] 标签筛选功能
- [ ] 搜索功能 (防抖)
- [ ] 状态筛选
- [ ] 分页功能

#### Day 18: 交互优化
- [ ] 加载状态处理
- [ ] 空状态设计
- [ ] 错误处理和提示
- [ ] 成功反馈

#### Day 19: UI/UX 优化
- [ ] 响应式设计
- [ ] 动画效果
- [ ] 辅助功能 (Accessibility)
- [ ] 浏览器兼容性测试

#### Day 20: 功能完善
- [ ] 标签管理功能
- [ ] 批量操作 (可选)
- [ ] 快捷键支持 (可选)
- [ ] 用户偏好设置 (可选)

**交付物**:
- 完整功能的应用
- 优化的用户体验
- 响应式设计

---

### 第5周: 测试与质量保证
**目标**: 全面测试，确保质量

#### Day 21-22: 自动化测试
- [ ] 编写后端单元测试
- [ ] 编写前端组件测试
- [ ] E2E 测试 (可选)
- [ ] 测试覆盖率报告

#### Day 23: 集成测试
- [ ] 端到端功能测试
- [ ] API 集成测试
- [ ] 边界情况测试
- [ ] 性能测试

#### Day 24: 代码质量
- [ ] 代码规范检查
- [ ] 代码审查
- [ ] 重构优化
- [ ] 技术债务清理

#### Day 25: Bug 修复
- [ ] 修复测试中发现的 Bug
- [ ] 优化性能瓶颈
- [ ] 改进错误处理
- [ ] 用户反馈迭代

**交付物**:
- 完整的测试套件
- Bug 修复记录
- 代码质量报告

---

### 第6周: 部署与文档
**目标**: 部署应用，完善文档

#### Day 26-27: 部署准备
- [ ] 生产环境配置
- [ ] Docker 容器化 (可选)
- [ ] 数据库备份策略
- [ ] 监控和日志

#### Day 28: 部署实施
- [ ] 后端部署
- [ ] 前端构建和部署
- [ ] 环境验证
- [ ] 性能测试

#### Day 29: 文档编写
- [ ] README 文档
- [ ] API 使用文档
- [ ] 部署文档
- [ ] 故障排查指南

#### Day 30: 项目收尾
- [ ] 最终测试
- [ ] 文档审查
- [ ] 项目交付
- [ ] 总结和回顾

**交付物**:
- 部署的应用
- 完整的项目文档
- 部署和维护文档

---

## 附录

### A. 常用命令速查

#### 后端命令
```bash
# 激活虚拟环境
source .venv/bin/activate

# 安装依赖
uv pip install -r requirements.txt

# 运行开发服务器
uvicorn app.main:app --reload

# 数据库迁移
alembic revision --autogenerate -m "message"
alembic upgrade head

# 运行测试
pytest tests/ -v

# 代码格式化
black app/
```

#### 前端命令
```bash
# 安装依赖
npm install

# 运行开发服务器
npm run dev

# 构建生产版本
npm run build

# 运行测试
npm run test

# 代码格式化
npm run format

# 代码检查
npm run lint
```

### B. 故障排查清单

#### 数据库连接问题
- [ ] 检查 PostgreSQL 容器是否运行
- [ ] 验证数据库凭据
- [ ] 测试网络连接
- [ ] 检查防火墙设置

#### API 请求失败
- [ ] 检查后端服务器状态
- [ ] 验证 API 路径
- [ ] 检查 CORS 配置
- [ ] 查看后端日志

#### 前端构建错误
- [ ] 清除 node_modules 重新安装
- [ ] 检查依赖版本兼容性
- [ ] 验证环境变量
- [ ] 查看构建日志

### C. 资源链接

#### 官方文档
- FastAPI: https://fastapi.tiangolo.com/
- React: https://react.dev/
- Vite: https://vitejs.dev/
- Tailwind CSS: https://tailwindcss.com/
- Shadcn UI: https://ui.shadcn.com/
- SQLAlchemy: https://www.sqlalchemy.org/
- Alembic: https://alembic.sqlalchemy.org/

#### 工具
- PostgreSQL: https://www.postgresql.org/
- Postman: https://www.postman.com/
- Excalidraw: https://excalidraw.com/ (绘图)

---

## 文档变更记录

| 版本 | 日期 | 变更说明 | 作者 |
|------|------|----------|------|
| v1.0 | 2025-12-12 | 初始版本创建 | - |

---

**文档结束**

祝开发顺利！🚀