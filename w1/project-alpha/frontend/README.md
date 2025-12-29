# Project Alpha - Frontend

## 项目简介

Project Alpha 前端应用，基于 React + TypeScript + Vite + Tailwind CSS + Shadcn UI。

## 环境要求

- Node.js 18+
- npm 或 pnpm

## 快速开始

### 1. 安装依赖

```bash
npm install
# 或
pnpm install
```

### 2. 配置环境变量

创建 `.env.local` 文件：

```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

### 3. 启动开发服务器

```bash
npm run dev
# 或
pnpm dev
```

访问: http://localhost:5173

### 4. 构建生产版本

```bash
npm run build
# 或
pnpm build
```

## 项目结构

```
frontend/
├── src/
│   ├── api/             # API 客户端
│   ├── components/      # React 组件
│   ├── hooks/           # 自定义 Hooks
│   ├── types/           # TypeScript 类型定义
│   ├── utils/           # 工具函数
│   ├── App.tsx          # 主应用组件
│   └── main.tsx         # 入口文件
├── public/              # 静态资源
├── package.json         # 依赖配置
├── tsconfig.json        # TypeScript 配置
├── vite.config.ts       # Vite 配置
└── tailwind.config.js   # Tailwind CSS 配置
```

## 常用命令

```bash
# 开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview

# 代码检查
npm run lint
```

## Phase 1 完成状态

✅ 项目初始化 (Vite + React + TypeScript)
✅ Tailwind CSS 配置
✅ TypeScript 类型定义
✅ API 客户端配置
✅ 基础工具函数

## 下一步

Phase 2 将实现：
- Shadcn UI 组件集成
- 核心 UI 组件 (TagBadge, TicketCard, SearchBar 等)
- API 集成
- 主应用页面





