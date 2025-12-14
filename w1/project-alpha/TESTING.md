# 测试文档

## 后端测试

### 运行测试

```bash
cd backend

# 运行所有测试
pytest

# 运行特定测试文件
pytest tests/test_tickets_api.py

# 运行特定测试
pytest tests/test_tickets_api.py::TestTicketsAPI::test_create_ticket

# 运行并显示覆盖率
pytest --cov=app --cov-report=html

# 使用 Makefile
make test
make test-cov
```

### 测试结构

```
backend/tests/
├── __init__.py
├── conftest.py              # 测试配置和 fixtures
├── test_tickets_api.py     # Tickets API 测试
├── test_tags_api.py        # Tags API 测试
└── test_services.py        # Service 层测试
```

### 测试覆盖

- ✅ API 端点测试
- ✅ Service 层测试
- ✅ 数据验证测试
- ✅ 错误处理测试

### 测试 Fixtures

- `db_session`: 测试数据库会话
- `client`: FastAPI 测试客户端
- `sample_tag`: 示例标签
- `sample_ticket`: 示例 Ticket

## 前端测试

### 运行测试

```bash
cd frontend

# 运行测试
npm run test

# 运行测试（UI 模式）
npm run test:ui

# 运行测试并生成覆盖率
npm run test:coverage
```

### 测试结构

```
frontend/src/test/
├── setup.ts                # 测试设置
└── utils/
    └── test-utils.tsx      # 测试工具函数
```

### 测试示例

- ✅ 组件渲染测试
- ✅ 用户交互测试
- ✅ Hook 测试

## 代码质量检查

### 后端

```bash
cd backend

# 代码格式化
black app tests

# 代码检查
ruff check app tests
flake8 app tests

# 类型检查
mypy app

# 使用 Makefile
make format
make lint
make type-check
```

### 前端

```bash
cd frontend

# ESLint 检查
npm run lint

# ESLint 自动修复
npm run lint:fix

# TypeScript 类型检查
npm run type-check
```

## 持续集成（CI）

### GitHub Actions 示例

创建 `.github/workflows/ci.yml`:

```yaml
name: CI

on: [push, pull_request]

jobs:
  backend-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      - run: |
          cd backend
          pip install -r requirements.txt
          pytest --cov=app --cov-report=xml
      - uses: codecov/codecov-action@v3

  frontend-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: |
          cd frontend
          npm ci
          npm run lint
          npm run type-check
          npm run test
```

## 测试最佳实践

1. **单元测试**: 测试独立的函数和类
2. **集成测试**: 测试组件之间的交互
3. **API 测试**: 测试 API 端点的完整流程
4. **覆盖率**: 目标覆盖率 > 80%
5. **测试隔离**: 每个测试应该独立运行
6. **清理**: 测试后清理测试数据

## 测试数据

使用 `conftest.py` 中的 fixtures 创建测试数据，避免污染生产数据库。

## 性能测试

可以使用以下工具进行性能测试：

- **后端**: `locust`, `pytest-benchmark`
- **前端**: `lighthouse`, `web-vitals`

