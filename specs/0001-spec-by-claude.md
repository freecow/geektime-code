# 基于标签的 Ticket 管理系统 - 需求与设计文档

## 1. 项目概述

### 1.1 项目简介
本项目旨在构建一个简单、高效的 Ticket 管理工具，使用标签系统对任务进行分类和组织。该工具专注于单用户使用场景，提供直观的界面和快速的任务管理体验。

### 1.2 核心特性
- 轻量级单用户系统，无需登录认证
- 灵活的标签系统进行任务分类
- 快速的任务创建、编辑和状态管理
- 多维度的任务查看和搜索能力

### 1.3 技术栈

**后端**
- FastAPI：现代、快速的 Python Web 框架
- PostgreSQL：关系型数据库
- SQLAlchemy：ORM 框架
- Pydantic：数据验证和序列化

**前端**
- TypeScript：类型安全的 JavaScript
- Vite：快速的前端构建工具
- Tailwind CSS：实用优先的 CSS 框架
- Shadcn UI：基于 Radix UI 的组件库
- React：UI 框架

---

## 2. 功能需求详述

### 2.1 Ticket 管理

#### 2.1.1 创建 Ticket
**功能描述**：用户可以创建新的 ticket
**输入字段**：
- 标题（title）：必填，字符串，最大长度 200
- 描述（description）：可选，文本，支持多行
- 标签（tags）：可选，多选

**验证规则**：
- 标题不能为空
- 标题去除首尾空格后长度至少为 1 个字符

**行为**：
- 创建时自动设置创建时间
- 默认状态为"未完成"（pending）
- 可以同时添加多个标签

#### 2.1.2 编辑 Ticket
**功能描述**：用户可以修改已有 ticket 的信息
**可编辑字段**：
- 标题
- 描述
- 标签（添加或删除）

**验证规则**：
- 与创建 ticket 相同的验证规则
- 编辑时更新"最后修改时间"

#### 2.1.3 删除 Ticket
**功能描述**：用户可以永久删除 ticket
**行为**：
- 物理删除，不可恢复
- 同时删除与该 ticket 关联的所有标签关系
- 需要二次确认

#### 2.1.4 完成/取消完成 Ticket
**功能描述**：用户可以标记 ticket 的完成状态
**状态类型**：
- `pending`：未完成（默认）
- `completed`：已完成

**行为**：
- 完成时记录完成时间
- 取消完成时清除完成时间
- 状态切换更新"最后修改时间"

### 2.2 标签管理

#### 2.2.1 标签创建
**功能描述**：在添加标签到 ticket 时，如果标签不存在则自动创建
**输入字段**：
- 名称（name）：必填，字符串，最大长度 50
- 颜色（color）：可选，十六进制颜色代码，默认随机生成

**验证规则**：
- 标签名称不能为空
- 标签名称大小写敏感，去除首尾空格
- 同名标签视为同一个标签

#### 2.2.2 为 Ticket 添加标签
**功能描述**：为指定 ticket 关联一个或多个标签
**行为**：
- 支持一次添加多个标签
- 标签不存在时自动创建
- 避免重复添加相同标签

#### 2.2.3 从 Ticket 删除标签
**功能描述**：移除 ticket 与标签的关联关系
**行为**：
- 只删除关联关系，不删除标签本身
- 标签可能被其他 ticket 使用

#### 2.2.4 标签列表
**功能描述**：获取系统中所有使用过的标签
**显示信息**：
- 标签名称
- 标签颜色
- 使用该标签的 ticket 数量

### 2.3 Ticket 查看和筛选

#### 2.3.1 全部 Ticket 列表
**功能描述**：显示所有 ticket
**显示内容**：
- 标题
- 状态（完成/未完成）
- 关联的标签
- 创建时间
- 最后修改时间

**排序规则**：
- 默认按创建时间倒序（最新在前）
- 支持按状态排序（未完成优先）

#### 2.3.2 按标签筛选
**功能描述**：显示包含指定标签的所有 ticket
**筛选逻辑**：
- 单标签筛选：显示包含该标签的所有 ticket
- 多标签筛选：显示同时包含所有选中标签的 ticket（AND 逻辑）

**排序规则**：与全部列表相同

#### 2.3.3 按标题搜索
**功能描述**：根据关键词搜索 ticket
**搜索逻辑**：
- 不区分大小写
- 模糊匹配标题
- 支持部分匹配

**显示结果**：
- 高亮匹配的关键词
- 显示搜索结果数量

#### 2.3.4 按状态筛选
**功能描述**：筛选显示特定状态的 ticket
**筛选选项**：
- 全部
- 未完成
- 已完成

---

## 3. 数据库设计

### 3.1 数据表结构

#### 3.1.1 tickets 表
存储 ticket 的基本信息

```sql
CREATE TABLE tickets (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,

    CONSTRAINT chk_status CHECK (status IN ('pending', 'completed'))
);

-- 索引
CREATE INDEX idx_tickets_status ON tickets(status);
CREATE INDEX idx_tickets_created_at ON tickets(created_at DESC);
CREATE INDEX idx_tickets_title ON tickets(title);
```

**字段说明**：
- `id`：主键，自增
- `title`：标题，非空
- `description`：描述，可为空
- `status`：状态，枚举值（pending/completed）
- `created_at`：创建时间，自动设置
- `updated_at`：最后修改时间，自动更新
- `completed_at`：完成时间，完成时设置

#### 3.1.2 tags 表
存储标签信息

```sql
CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    color VARCHAR(7) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_color_format CHECK (color ~ '^#[0-9A-Fa-f]{6}$')
);

-- 索引
CREATE INDEX idx_tags_name ON tags(name);
```

**字段说明**：
- `id`：主键，自增
- `name`：标签名称，唯一
- `color`：颜色代码，格式 #RRGGBB
- `created_at`：创建时间

#### 3.1.3 ticket_tags 表
存储 ticket 和 tag 的多对多关系

```sql
CREATE TABLE ticket_tags (
    ticket_id INTEGER NOT NULL REFERENCES tickets(id) ON DELETE CASCADE,
    tag_id INTEGER NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (ticket_id, tag_id)
);

-- 索引
CREATE INDEX idx_ticket_tags_ticket ON ticket_tags(ticket_id);
CREATE INDEX idx_ticket_tags_tag ON ticket_tags(tag_id);
```

**字段说明**：
- `ticket_id`：外键，关联 tickets 表
- `tag_id`：外键，关联 tags 表
- `created_at`：关联创建时间
- 联合主键确保同一 ticket 不会重复添加相同标签

### 3.2 数据完整性

**级联删除**：
- 删除 ticket 时，自动删除 ticket_tags 中的关联记录
- 删除 tag 时，自动删除 ticket_tags 中的关联记录

**约束**：
- ticket 的 status 只能是 pending 或 completed
- tag 的 color 必须符合十六进制颜色格式
- tag 的 name 必须唯一

---

## 4. API 设计

### 4.1 API 规范

**基础 URL**：`http://localhost:8000/api`

**响应格式**：JSON

**HTTP 状态码**：
- 200：成功
- 201：创建成功
- 400：请求参数错误
- 404：资源不存在
- 500：服务器错误

### 4.2 Ticket 相关接口

#### 4.2.1 获取 Ticket 列表
```
GET /tickets
```

**查询参数**：
- `status` (可选)：筛选状态，值为 `pending` 或 `completed`
- `tag_ids` (可选)：按标签筛选，多个标签 ID 用逗号分隔，如 `1,2,3`
- `search` (可选)：按标题搜索关键词
- `limit` (可选)：返回数量，默认 100
- `offset` (可选)：偏移量，默认 0

**响应示例**：
```json
{
  "total": 42,
  "items": [
    {
      "id": 1,
      "title": "实现用户登录功能",
      "description": "需要实现基本的用户名密码登录",
      "status": "pending",
      "created_at": "2025-12-13T10:00:00Z",
      "updated_at": "2025-12-13T10:00:00Z",
      "completed_at": null,
      "tags": [
        {
          "id": 1,
          "name": "功能开发",
          "color": "#3B82F6"
        },
        {
          "id": 2,
          "name": "高优先级",
          "color": "#EF4444"
        }
      ]
    }
  ]
}
```

#### 4.2.2 获取单个 Ticket
```
GET /tickets/{ticket_id}
```

**路径参数**：
- `ticket_id`：Ticket ID

**响应示例**：同上单个 ticket 对象

#### 4.2.3 创建 Ticket
```
POST /tickets
```

**请求体**：
```json
{
  "title": "实现用户登录功能",
  "description": "需要实现基本的用户名密码登录",
  "tag_ids": [1, 2]
}
```

**响应**：201，返回创建的 ticket 对象

#### 4.2.4 更新 Ticket
```
PUT /tickets/{ticket_id}
```

**路径参数**：
- `ticket_id`：Ticket ID

**请求体**：
```json
{
  "title": "实现用户登录功能（已更新）",
  "description": "需要实现基本的用户名密码登录，并添加记住我功能"
}
```

**响应**：200，返回更新后的 ticket 对象

#### 4.2.5 删除 Ticket
```
DELETE /tickets/{ticket_id}
```

**路径参数**：
- `ticket_id`：Ticket ID

**响应**：200，返回空对象

#### 4.2.6 完成 Ticket
```
POST /tickets/{ticket_id}/complete
```

**路径参数**：
- `ticket_id`：Ticket ID

**响应**：200，返回更新后的 ticket 对象（status 为 completed，completed_at 已设置）

#### 4.2.7 取消完成 Ticket
```
POST /tickets/{ticket_id}/uncomplete
```

**路径参数**：
- `ticket_id`：Ticket ID

**响应**：200，返回更新后的 ticket 对象（status 为 pending，completed_at 为 null）

### 4.3 标签相关接口

#### 4.3.1 获取标签列表
```
GET /tags
```

**响应示例**：
```json
{
  "items": [
    {
      "id": 1,
      "name": "功能开发",
      "color": "#3B82F6",
      "created_at": "2025-12-13T10:00:00Z",
      "ticket_count": 15
    }
  ]
}
```

#### 4.3.2 创建标签
```
POST /tags
```

**请求体**：
```json
{
  "name": "功能开发",
  "color": "#3B82F6"
}
```

**响应**：201，返回创建的 tag 对象

#### 4.3.3 为 Ticket 添加标签
```
POST /tickets/{ticket_id}/tags
```

**路径参数**：
- `ticket_id`：Ticket ID

**请求体**：
```json
{
  "tag_ids": [1, 2, 3]
}
```

**响应**：200，返回更新后的 ticket 对象

#### 4.3.4 从 Ticket 删除标签
```
DELETE /tickets/{ticket_id}/tags/{tag_id}
```

**路径参数**：
- `ticket_id`：Ticket ID
- `tag_id`：Tag ID

**响应**：200，返回更新后的 ticket 对象

---

## 5. 前端设计

### 5.1 页面结构

#### 5.1.1 主布局
```
┌─────────────────────────────────────────────┐
│              Header (标题栏)                 │
├─────────────┬───────────────────────────────┤
│             │                               │
│   Sidebar   │      Main Content             │
│   (侧边栏)   │      (主内容区)                │
│             │                               │
│  - 全部      │   [搜索框]                     │
│  - 未完成    │                               │
│  - 已完成    │   [+ 新建 Ticket]              │
│  - 标签列表  │                               │
│             │   [Ticket 列表]                │
│             │                               │
└─────────────┴───────────────────────────────┘
```

#### 5.1.2 页面路由
- `/`：首页，显示全部 ticket
- `/pending`：未完成的 ticket
- `/completed`：已完成的 ticket
- `/tags/:tagId`：按标签筛选的 ticket 列表

### 5.2 组件设计

#### 5.2.1 TicketList 组件
**功能**：展示 ticket 列表
**Props**：
- `tickets`: Ticket[]
- `onTicketClick`: (ticketId: number) => void
- `onStatusToggle`: (ticketId: number) => void

**显示内容**：
- Checkbox 用于快速切换完成状态
- Ticket 标题
- 关联的标签（Tag pills）
- 创建时间
- 完成状态标识

#### 5.2.2 TicketCard 组件
**功能**：单个 ticket 的卡片展示
**Props**：
- `ticket`: Ticket
- `onClick`: () => void
- `onStatusToggle`: () => void

**交互**：
- 点击卡片打开详情对话框
- 点击 checkbox 切换完成状态
- 悬停显示操作按钮（编辑、删除）

#### 5.2.3 TicketDialog 组件
**功能**：创建/编辑 ticket 的对话框
**Props**：
- `open`: boolean
- `ticket`: Ticket | null (null 表示创建新 ticket)
- `onClose`: () => void
- `onSave`: (ticket: Ticket) => void

**表单字段**：
- 标题输入框
- 描述文本域（支持多行）
- 标签选择器（多选，支持创建新标签）

#### 5.2.4 TagSelector 组件
**功能**：标签选择器
**Props**：
- `selectedTags`: Tag[]
- `onChange`: (tags: Tag[]) => void

**功能特性**：
- 下拉多选
- 搜索标签
- 创建新标签（输入不存在的名称时显示"创建新标签"选项）
- 显示已选标签的 pill

#### 5.2.5 TagPill 组件
**功能**：标签 pill 显示
**Props**：
- `tag`: Tag
- `removable`: boolean
- `onRemove`: () => void

**样式**：
- 圆角矩形
- 使用标签的颜色作为背景色
- 可选的删除按钮

#### 5.2.6 Sidebar 组件
**功能**：侧边栏导航
**内容**：
- 筛选选项（全部/未完成/已完成）
- 标签列表（显示每个标签及其 ticket 数量）
- 当前选中状态高亮

#### 5.2.7 SearchBar 组件
**功能**：搜索栏
**Props**：
- `value`: string
- `onChange`: (value: string) => void

**特性**：
- 防抖处理（300ms）
- 清空按钮
- 搜索图标

### 5.3 状态管理

使用 React 的 useState 和 useContext 进行状态管理

#### 5.3.1 全局状态
- `tickets`: 所有 ticket 数据
- `tags`: 所有标签数据
- `selectedTagIds`: 当前筛选的标签 ID
- `searchQuery`: 搜索关键词
- `statusFilter`: 状态筛选（all/pending/completed）

#### 5.3.2 API 调用
使用自定义 hooks 封装 API 调用：
- `useTickets()`：获取和管理 ticket 列表
- `useTags()`：获取和管理标签列表
- `useTicketMutations()`：ticket 的增删改操作

### 5.4 样式设计

#### 5.4.1 颜色方案
使用 Tailwind CSS 默认颜色：
- 主色：Blue (bg-blue-500)
- 成功：Green (bg-green-500)
- 警告：Yellow (bg-yellow-500)
- 危险：Red (bg-red-500)
- 灰色：Gray (bg-gray-100, bg-gray-200, etc.)

#### 5.4.2 组件样式
使用 Shadcn UI 组件库的默认样式：
- Button
- Input
- Textarea
- Checkbox
- Dialog
- Select
- Badge

#### 5.4.3 响应式设计
- 移动端（< 768px）：隐藏侧边栏，使用汉堡菜单
- 平板（768px - 1024px）：侧边栏收窄
- 桌面（> 1024px）：完整布局

---

## 6. 实施计划

### 6.1 后端开发

#### 阶段 1：项目初始化
- 创建 FastAPI 项目结构
- 配置数据库连接
- 创建数据库迁移工具配置（Alembic）

#### 阶段 2：数据库层
- 定义 SQLAlchemy 模型（Ticket, Tag, TicketTag）
- 创建数据库迁移脚本
- 编写数据库初始化脚本

#### 阶段 3：业务逻辑层
- 实现 Ticket CRUD 服务
- 实现 Tag 管理服务
- 实现 Ticket-Tag 关联服务
- 实现搜索和筛选逻辑

#### 阶段 4：API 层
- 定义 Pydantic schemas
- 实现 Ticket 相关路由
- 实现 Tag 相关路由
- 添加参数验证和错误处理

#### 阶段 5：测试和优化
- 编写单元测试
- 编写集成测试
- 性能优化（数据库查询、索引）
- API 文档生成（OpenAPI/Swagger）

### 6.2 前端开发

#### 阶段 1：项目初始化
- 创建 Vite + React + TypeScript 项目
- 配置 Tailwind CSS
- 安装和配置 Shadcn UI
- 配置 API 客户端（axios）

#### 阶段 2：基础组件
- 实现 Layout 组件（Header, Sidebar）
- 实现 TagPill 组件
- 实现 SearchBar 组件

#### 阶段 3：核心功能组件
- 实现 TicketCard 组件
- 实现 TicketList 组件
- 实现 TicketDialog 组件
- 实现 TagSelector 组件

#### 阶段 4：页面和路由
- 实现首页（全部 ticket）
- 实现筛选页面（按状态、按标签）
- 配置路由
- 实现 404 页面

#### 阶段 5：状态管理和 API 集成
- 实现自定义 hooks
- 集成 API 调用
- 实现加载状态和错误处理
- 实现乐观更新

#### 阶段 6：优化和完善
- 添加动画效果
- 优化移动端体验
- 性能优化（虚拟滚动、懒加载）
- 添加键盘快捷键

### 6.3 部署

#### 后端部署
- 使用 Docker 容器化
- 配置环境变量
- 设置数据库备份策略

#### 前端部署
- 构建生产版本
- 配置静态资源托管
- 配置 API 代理

---

## 7. 扩展性考虑

### 7.1 未来可能的功能
- 多用户支持（添加用户认证系统）
- Ticket 优先级
- Ticket 到期日期
- Ticket 附件上传
- 标签分组/分类
- Ticket 模板
- 批量操作
- 导出功能（CSV, JSON）
- Ticket 评论功能
- Ticket 历史记录
- 数据统计和可视化

### 7.2 技术扩展
- 添加 Redis 缓存
- 实现 WebSocket 实时更新
- 添加全文搜索（Elasticsearch）
- 添加日志系统
- 添加监控和告警

---

## 8. 技术细节和最佳实践

### 8.1 后端最佳实践

#### 8.1.1 项目结构
```
backend/
├── alembic/              # 数据库迁移
├── app/
│   ├── __init__.py
│   ├── main.py          # FastAPI 应用入口
│   ├── config.py        # 配置文件
│   ├── database.py      # 数据库连接
│   ├── models/          # SQLAlchemy 模型
│   │   ├── __init__.py
│   │   ├── ticket.py
│   │   ├── tag.py
│   │   └── ticket_tag.py
│   ├── schemas/         # Pydantic schemas
│   │   ├── __init__.py
│   │   ├── ticket.py
│   │   └── tag.py
│   ├── services/        # 业务逻辑
│   │   ├── __init__.py
│   │   ├── ticket_service.py
│   │   └── tag_service.py
│   ├── routers/         # API 路由
│   │   ├── __init__.py
│   │   ├── tickets.py
│   │   └── tags.py
│   └── utils/           # 工具函数
│       └── __init__.py
├── tests/               # 测试
├── requirements.txt
└── .env
```

#### 8.1.2 CORS 配置
允许前端跨域访问：
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

#### 8.1.3 错误处理
统一的错误响应格式：
```python
{
  "detail": "错误信息"
}
```

### 8.2 前端最佳实践

#### 8.2.1 项目结构
```
frontend/
├── src/
│   ├── main.tsx          # 应用入口
│   ├── App.tsx           # 根组件
│   ├── components/       # 通用组件
│   │   ├── ui/          # Shadcn UI 组件
│   │   ├── TicketCard.tsx
│   │   ├── TicketList.tsx
│   │   ├── TicketDialog.tsx
│   │   ├── TagSelector.tsx
│   │   ├── TagPill.tsx
│   │   ├── SearchBar.tsx
│   │   ├── Sidebar.tsx
│   │   └── Layout.tsx
│   ├── pages/           # 页面组件
│   │   ├── HomePage.tsx
│   │   └── NotFoundPage.tsx
│   ├── hooks/           # 自定义 hooks
│   │   ├── useTickets.ts
│   │   ├── useTags.ts
│   │   └── useTicketMutations.ts
│   ├── services/        # API 服务
│   │   ├── api.ts
│   │   ├── ticketService.ts
│   │   └── tagService.ts
│   ├── types/           # TypeScript 类型定义
│   │   ├── ticket.ts
│   │   └── tag.ts
│   ├── utils/           # 工具函数
│   │   └── colors.ts
│   └── lib/
│       └── utils.ts     # Shadcn 工具函数
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

#### 8.2.2 TypeScript 类型定义
```typescript
// types/ticket.ts
export interface Ticket {
  id: number;
  title: string;
  description: string | null;
  status: 'pending' | 'completed';
  created_at: string;
  updated_at: string;
  completed_at: string | null;
  tags: Tag[];
}

// types/tag.ts
export interface Tag {
  id: number;
  name: string;
  color: string;
  created_at: string;
  ticket_count?: number;
}
```

#### 8.2.3 API 客户端
使用 axios 创建统一的 API 客户端：
```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 10000,
});

// 请求拦截器
api.interceptors.request.use(config => {
  // 可以添加认证 token 等
  return config;
});

// 响应拦截器
api.interceptors.response.use(
  response => response,
  error => {
    // 统一错误处理
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default api;
```

---

## 9. 开发环境配置

### 9.1 后端环境

**系统要求**：
- Python 3.10+
- PostgreSQL 14+

**环境变量** (.env)：
```
DATABASE_URL=postgresql://user:password@localhost:5432/ticket_manager
DEBUG=True
```

**安装依赖**：
```bash
pip install fastapi uvicorn sqlalchemy psycopg2-binary alembic pydantic python-dotenv
```

**运行开发服务器**：
```bash
uvicorn app.main:app --reload --port 8000
```

### 9.2 前端环境

**系统要求**：
- Node.js 18+
- npm 或 yarn

**安装依赖**：
```bash
npm install
```

**运行开发服务器**：
```bash
npm run dev
```

### 9.3 数据库初始化

```bash
# 创建数据库
createdb ticket_manager

# 运行迁移
alembic upgrade head
```

---

## 10. 总结

本文档详细描述了一个基于标签的 Ticket 管理系统的需求和设计。该系统聚焦于简单、高效的任务管理体验，通过灵活的标签系统实现任务分类和组织。

**核心优势**：
- 简单易用：无需复杂的配置，开箱即用
- 灵活的标签系统：支持多标签管理和筛选
- 现代技术栈：使用业界流行的技术栈，易于维护和扩展
- 良好的用户体验：直观的界面和快速的响应

**实施建议**：
1. 按照阶段性计划逐步实现功能
2. 优先实现核心功能（Ticket CRUD 和标签管理）
3. 持续进行测试和优化
4. 根据实际使用反馈进行迭代改进
