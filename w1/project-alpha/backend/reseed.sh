#!/bin/bash
# 清理现有数据并重新导入 seed.sql
# 使用方法: ./reseed.sh [database_name] [host] [port] [user]

# 默认参数
DB_NAME="${1:-project_alpha}"
DB_HOST="${2:-localhost}"
DB_PORT="${3:-5432}"
DB_USER="${4:-postgres}"

echo "=========================================="
echo "清理并重新导入数据"
echo "数据库: $DB_NAME"
echo "主机: $DB_HOST:$DB_PORT"
echo "用户: $DB_USER"
echo "=========================================="

# 执行清理和导入
psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" <<EOF
-- 清理现有数据
TRUNCATE TABLE ticket_tags CASCADE;
TRUNCATE TABLE tickets CASCADE;
TRUNCATE TABLE tags CASCADE;

-- 重置序列（如果需要）
-- ALTER SEQUENCE tickets_id_seq RESTART WITH 1;
-- ALTER SEQUENCE tags_id_seq RESTART WITH 1;
EOF

echo ""
echo "数据清理完成，开始导入 seed.sql..."
echo ""

# 导入 seed.sql
psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -f seed.sql

echo ""
echo "=========================================="
echo "导入完成！"
echo "=========================================="

