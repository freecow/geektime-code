# Project Alpha - Backend

## 项目简介

Project Alpha 后端服务，基于 FastAPI + PostgreSQL + SQLAlchemy。

## 环境要求

- Python 3.11+
- PostgreSQL (使用已有容器)
- uv (推荐) 或 pip

## 快速开始

### 1. 安装依赖

```bash
# 使用 uv
uv pip install -r requirements.txt

# 或使用 pip
pip install -r requirements.txt
```

### 2. 配置环境变量

复制 `.env.example` 为 `.env` 并修改配置：

```bash
cp .env.example .env
```

编辑 `.env` 文件，设置数据库连接信息：

```env
DATABASE_URL=postgresql://alpha_user:alpha_pass@localhost:5432/project_alpha
DEBUG=True
API_V1_PREFIX=/api/v1
PROJECT_NAME=Project Alpha
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

### 3. 运行数据库迁移

```bash
# 创建迁移
alembic revision --autogenerate -m "Initial schema"

# 执行迁移
alembic upgrade head
```

### 4. (可选) 创建测试数据

```bash
python scripts/seed_data.py
```

### 5. 启动开发服务器

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

访问 API 文档：
- Swagger UI: http://localhost:8000/api/v1/docs
- ReDoc: http://localhost:8000/api/v1/redoc

## 项目结构

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py          # FastAPI 应用入口
│   ├── config.py        # 配置管理
│   ├── database.py      # 数据库连接
│   ├── models/          # SQLAlchemy 模型
│   ├── schemas/         # Pydantic Schemas
│   ├── api/             # API 路由
│   ├── services/        # 业务逻辑层
│   └── utils/           # 工具函数
├── alembic/             # 数据库迁移
├── scripts/             # 脚本文件
├── tests/               # 测试文件
├── requirements.txt     # Python 依赖
└── alembic.ini          # Alembic 配置
```

## 常用命令

```bash
# 创建数据库迁移
alembic revision --autogenerate -m "描述信息"

# 执行迁移
alembic upgrade head

# 回滚迁移
alembic downgrade -1

# 运行测试
pytest tests/ -v

# 代码格式化
black app/

# 代码检查
flake8 app/
```

## Phase 1 完成状态

✅ 项目目录结构创建
✅ 数据库模型定义 (Ticket, Tag, ticket_tags)
✅ Alembic 配置
✅ 基础配置文件
✅ 测试数据脚本


