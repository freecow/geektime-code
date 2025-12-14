# 部署文档

## 部署方式

### 方式 1: Docker Compose（推荐）

最简单的方式，一键启动所有服务。

#### 前置要求
- Docker
- Docker Compose

#### 部署步骤

1. **克隆项目**
   ```bash
   git clone <repository-url>
   cd project-alpha
   ```

2. **配置环境变量**
   ```bash
   # 后端环境变量
   cd backend
   cp .env.example .env
   # 编辑 .env 文件（Docker Compose 会自动使用环境变量）
   ```

3. **启动服务**
   ```bash
   cd ..
   docker-compose up -d
   ```

4. **初始化数据库**
   ```bash
   # 进入后端容器
   docker-compose exec backend bash
   
   # 运行迁移
   alembic upgrade head
   
   # (可选) 导入测试数据
   psql $DATABASE_URL -f seed.sql
   ```

5. **访问应用**
   - 前端: http://localhost
   - 后端 API: http://localhost:8000
   - API 文档: http://localhost:8000/api/v1/docs

#### 停止服务
```bash
docker-compose down
```

#### 查看日志
```bash
docker-compose logs -f
```

### 方式 2: 手动部署

#### 后端部署

1. **安装依赖**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. **配置环境变量**
   ```bash
   cp .env.example .env
   # 编辑 .env 文件
   ```

3. **数据库迁移**
   ```bash
   alembic upgrade head
   ```

4. **启动服务**
   ```bash
   # 开发环境
   uvicorn app.main:app --reload --port 8000
   
   # 生产环境（使用 Gunicorn）
   gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
   ```

#### 前端部署

1. **安装依赖**
   ```bash
   cd frontend
   npm install
   ```

2. **配置环境变量**
   ```bash
   echo "VITE_API_BASE_URL=http://your-api-url/api/v1" > .env.production
   ```

3. **构建**
   ```bash
   npm run build
   ```

4. **部署**
   - 将 `dist` 目录部署到 Nginx、Apache 或其他静态文件服务器
   - 或使用 Docker（见 Dockerfile）

### 方式 3: 使用 Docker（单独部署）

#### 构建镜像

```bash
# 构建后端镜像
cd backend
docker build -t project-alpha-backend .

# 构建前端镜像
cd ../frontend
docker build -t project-alpha-frontend .
```

#### 运行容器

```bash
# 运行后端
docker run -d \
  --name project-alpha-backend \
  -p 8000:8000 \
  -e DATABASE_URL=postgresql://user:pass@host:5432/db \
  project-alpha-backend

# 运行前端
docker run -d \
  --name project-alpha-frontend \
  -p 80:80 \
  project-alpha-frontend
```

## 生产环境配置

### 环境变量

#### 后端 (.env)
```bash
DATABASE_URL=postgresql://user:password@host:5432/database
DEBUG=false
API_V1_PREFIX=/api/v1
PROJECT_NAME=Project Alpha
CORS_ORIGINS=https://yourdomain.com
```

#### 前端 (.env.production)
```bash
VITE_API_BASE_URL=https://api.yourdomain.com/api/v1
```

### Nginx 配置示例

```nginx
# 前端
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/project-alpha-frontend/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

# 后端 API（如果需要独立域名）
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

### 数据库备份

```bash
# 备份
pg_dump -U postgres project_alpha > backup.sql

# 恢复
psql -U postgres project_alpha < backup.sql
```

## 监控和日志

### 日志位置

- **Docker**: `docker-compose logs`
- **系统日志**: `/var/log/`

### 健康检查

- **后端**: `GET http://localhost:8000/health`
- **数据库**: 通过 Docker healthcheck

## 安全建议

1. **使用 HTTPS**: 配置 SSL 证书
2. **环境变量**: 不要在代码中硬编码敏感信息
3. **数据库**: 使用强密码，限制访问
4. **CORS**: 在生产环境中限制允许的源
5. **防火墙**: 只开放必要的端口

## 故障排查

### 常见问题

1. **数据库连接失败**
   - 检查 DATABASE_URL 配置
   - 确认数据库服务正在运行
   - 检查网络连接

2. **前端无法连接后端**
   - 检查 VITE_API_BASE_URL 配置
   - 检查 CORS 设置
   - 检查防火墙规则

3. **迁移失败**
   - 检查数据库连接
   - 确认数据库用户权限
   - 查看 Alembic 日志

## 更新部署

```bash
# 拉取最新代码
git pull

# 重新构建和启动
docker-compose up -d --build

# 运行迁移（如果有）
docker-compose exec backend alembic upgrade head
```

