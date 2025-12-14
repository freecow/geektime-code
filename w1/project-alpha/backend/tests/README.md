# 后端测试

## 运行测试

```bash
# 运行所有测试
pytest

# 运行特定测试文件
pytest tests/test_tickets_api.py

# 运行并显示覆盖率
pytest --cov=app --cov-report=html

# 使用 Makefile
make test
make test-cov
```

## 测试结构

- `conftest.py` - 测试配置和 fixtures
- `test_tickets_api.py` - Tickets API 测试
- `test_tags_api.py` - Tags API 测试
- `test_services.py` - Service 层测试

## 测试数据库

测试使用 SQLite 内存数据库，每个测试运行前会创建新的数据库，测试后自动清理。

## 测试覆盖

- ✅ API 端点测试
- ✅ Service 层测试
- ✅ 数据验证测试
- ✅ 错误处理测试

