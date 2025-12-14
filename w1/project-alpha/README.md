# Project Alpha - 票务标签管理系统

## 项目简介

Project Alpha 是一个轻量级的票务管理工具，通过标签系统来组织和分类任务票据（Tickets）。该系统无需用户认证，专注于提供简洁高效的票务管理体验。

## 技术栈

- **后端**: FastAPI + PostgreSQL + SQLAlchemy + Alembic
- **前端**: TypeScript + React + Vite + Tailwind CSS + Shadcn UI
- **数据库**: PostgreSQL

## 项目结构

```
project-alpha/
├── backend/            # 后端项目
│   ├── app/           # 应用代码
│   ├── alembic/       # 数据库迁移
│   ├── scripts/       # 脚本文件
│   └── tests/         # 测试文件
├── frontend/          # 前端项目
│   ├── src/          # 源代码
│   └── public/       # 静态资源
└── .specs/           # 规格文档
```

## 快速开始

### 前置要求

1. Python 3.11+
2. Node.js 18+
3. PostgreSQL (使用已有容器)

### 后端启动

```bash
cd backend

# 安装依赖
uv pip install -r requirements.txt
# 或
pip install -r requirements.txt

# 配置环境变量
cp .env.example .env
# 编辑 .env 文件设置数据库连接

# 运行数据库迁移
alembic upgrade head

# (可选) 创建测试数据
python scripts/seed_data.py

# 启动开发服务器
uvicorn app.main:app --reload --port 8000
```

### 前端启动

```bash
cd frontend

# 安装依赖
npm install

# 配置环境变量
echo "VITE_API_BASE_URL=http://localhost:8000/api/v1" > .env.local

# 启动开发服务器
npm run dev
```

访问应用: http://localhost:5173

访问 API 文档: http://localhost:8000/api/v1/docs

## Phase 1 完成情况

Phase 1 的目标是完成基础架构搭建，包括：

✅ **后端**:
- 项目目录结构创建
- 数据库模型定义 (Ticket, Tag, ticket_tags)
- Alembic 配置和迁移准备
- 基础配置文件 (config.py, database.py)
- 测试数据脚本

✅ **前端**:
- 项目初始化 (Vite + React + TypeScript)
- Tailwind CSS 配置
- TypeScript 类型定义
- API 客户端配置
- 基础工具函数

## 开发计划

- **Phase 1**: 基础架构搭建 ✅
- **Phase 2**: 后端核心功能开发 (API 实现) ✅
- **Phase 3**: 前端核心功能开发 (UI 组件) ✅
- **Phase 4**: 高级功能与优化 ✅
- **Phase 5**: 测试与质量保证 ✅
- **Phase 6**: 部署与文档 ✅

## 项目状态

✅ **已完成**: 所有 Phase 1-6 已完成
- 后端 API 完整实现
- 前端 UI 完整实现（Apple 风格设计）
- 测试覆盖（后端单元测试、集成测试）
- Docker 部署配置
- 完整文档

## 快速部署

### 使用 Docker Compose（推荐）

```bash
# 启动所有服务
docker-compose up -d

# 初始化数据库
docker-compose exec backend alembic upgrade head

# (可选) 导入测试数据
docker-compose exec backend psql $DATABASE_URL -f seed.sql
```

访问应用: http://localhost

详细部署说明请参考 [DEPLOYMENT.md](./DEPLOYMENT.md)

## 文档

- [部署文档](./DEPLOYMENT.md) - 详细的部署指南
- [测试文档](./TESTING.md) - 测试说明和最佳实践
- [Apple 设计优化](./APPLE_DESIGN_OPTIMIZATION.md) - UI/UX 设计说明
- [Phase 完成报告](./PHASE1_COMPLETION.md) - Phase 1-4 完成情况

## 测试

### 后端测试
```bash
cd backend
pytest
# 或使用 Makefile
make test
```

### 前端测试
```bash
cd frontend
npm run test
```

详细测试说明请参考 [TESTING.md](./TESTING.md)

## 开发

### 代码质量检查

**后端**:
```bash
cd backend
make format  # 格式化代码
make lint    # 代码检查
make type-check  # 类型检查
```

**前端**:
```bash
cd frontend
npm run lint        # ESLint 检查
npm run lint:fix    # 自动修复
npm run type-check  # TypeScript 类型检查
```

## API 文档

启动后端后访问:
- Swagger UI: http://localhost:8000/api/v1/docs
- ReDoc: http://localhost:8000/api/v1/redoc

## 功能特性

- ✅ 创建/编辑/删除/完成/取消完成 Ticket
- ✅ 添加/删除 Ticket 标签
- ✅ 按标签过滤 Ticket 列表
- ✅ 按标题搜索 Ticket
- ✅ 标签管理
- ✅ 统计面板
- ✅ 数据导出（CSV）
- ✅ 键盘快捷键
- ✅ Apple 风格 UI/UX

## 技术栈

- **后端**: FastAPI + PostgreSQL + SQLAlchemy + Alembic
- **前端**: React + TypeScript + Vite + Tailwind CSS + Shadcn UI
- **测试**: pytest + vitest
- **部署**: Docker + Docker Compose

## 许可证

MIT



