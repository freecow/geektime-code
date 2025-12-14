# 清理并重新导入数据的 psql 命令

## 方式1：使用 reseed.sh 脚本（推荐）

```bash
cd backend

# 使用默认参数（数据库名: project_alpha, 主机: localhost, 端口: 5432, 用户: postgres）
./reseed.sh

# 指定数据库名
./reseed.sh my_database

# 指定所有参数
./reseed.sh my_database localhost 5432 postgres
```

## 方式2：单行 psql 命令（最简单）

```bash
cd backend

# 清理数据并导入（需要替换数据库名和用户）
psql -d project_alpha -U postgres -c "TRUNCATE TABLE ticket_tags CASCADE; TRUNCATE TABLE tickets CASCADE; TRUNCATE TABLE tags CASCADE;" -f seed.sql
```

## 方式3：分步执行

```bash
cd backend

# 步骤1：清理数据
psql -d project_alpha -U postgres -c "TRUNCATE TABLE ticket_tags CASCADE; TRUNCATE TABLE tickets CASCADE; TRUNCATE TABLE tags CASCADE;"

# 步骤2：导入数据
psql -d project_alpha -U postgres -f seed.sql
```

## 方式4：使用管道（适合脚本）

```bash
cd backend

# 清理并导入
psql -d project_alpha -U postgres <<EOF
TRUNCATE TABLE ticket_tags CASCADE;
TRUNCATE TABLE tickets CASCADE;
TRUNCATE TABLE tags CASCADE;
\i seed.sql
EOF
```

## 方式5：使用环境变量（从 .env 读取）

如果数据库配置在 `.env` 文件中，可以使用：

```bash
cd backend

# 从 .env 读取 DATABASE_URL
source .env 2>/dev/null || true

# 提取数据库信息（假设 DATABASE_URL 格式为 postgresql://user:password@host:port/dbname）
# 或者直接使用 psql 连接字符串
psql "$DATABASE_URL" -c "TRUNCATE TABLE ticket_tags CASCADE; TRUNCATE TABLE tickets CASCADE; TRUNCATE TABLE tags CASCADE;" -f seed.sql
```

## 方式6：使用 Python 脚本（如果需要重置序列）

```bash
cd backend

python3 <<EOF
import os
from sqlalchemy import create_engine, text
from app.config import settings

engine = create_engine(settings.DATABASE_URL)
with engine.connect() as conn:
    conn.execute(text("TRUNCATE TABLE ticket_tags CASCADE"))
    conn.execute(text("TRUNCATE TABLE tickets CASCADE"))
    conn.execute(text("TRUNCATE TABLE tags CASCADE"))
    conn.execute(text("ALTER SEQUENCE IF EXISTS tickets_id_seq RESTART WITH 1"))
    conn.execute(text("ALTER SEQUENCE IF EXISTS tags_id_seq RESTART WITH 1"))
    conn.commit()
print("数据清理完成")

# 然后导入 seed.sql
os.system(f'psql "{settings.DATABASE_URL}" -f seed.sql')
EOF
```

## 常用参数说明

- `-d` 或 `--dbname`: 数据库名称
- `-U` 或 `--username`: 数据库用户名
- `-h` 或 `--host`: 数据库主机（默认 localhost）
- `-p` 或 `--port`: 数据库端口（默认 5432）
- `-f` 或 `--file`: 执行 SQL 文件
- `-c` 或 `--command`: 执行 SQL 命令

## 示例：使用完整连接字符串

```bash
# 使用连接字符串
psql "postgresql://postgres:password@localhost:5432/project_alpha" -c "TRUNCATE TABLE ticket_tags CASCADE; TRUNCATE TABLE tickets CASCADE; TRUNCATE TABLE tags CASCADE;" -f seed.sql
```

## 注意事项

1. **备份数据**：清理操作会删除所有现有数据，请确保已备份重要数据
2. **外键约束**：使用 `CASCADE` 会自动处理外键约束
3. **序列重置**：如果需要重置自增 ID，可以取消注释 seed.sql 中的序列重置语句，或使用方式6
4. **权限**：确保数据库用户有 TRUNCATE 和 INSERT 权限
5. **连接**：确保数据库服务正在运行

## 验证导入结果

导入完成后，可以运行以下命令验证：

```bash
psql -d project_alpha -U postgres -c "SELECT 'Tags: ' || COUNT(*) FROM tags; SELECT 'Tickets: ' || COUNT(*) FROM tickets; SELECT 'Relationships: ' || COUNT(*) FROM ticket_tags;"
```

预期结果：
- Tags: 45
- Tickets: 50
- Relationships: 约 120+ 条关联关系

