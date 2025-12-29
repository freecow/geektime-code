# Scripts

## seed_data.py

创建测试数据的脚本。

使用方法：
```bash
python scripts/seed_data.py
```

## create_migration.sh

创建数据库迁移的辅助脚本。

使用方法：
```bash
./scripts/create_migration.sh
```

或手动执行：
```bash
alembic revision --autogenerate -m "Initial schema: tickets, tags, ticket_tags"
alembic upgrade head
```





