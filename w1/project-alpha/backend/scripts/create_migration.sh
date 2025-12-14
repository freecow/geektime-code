#!/bin/bash
# 创建数据库迁移脚本

echo "创建数据库迁移..."
alembic revision --autogenerate -m "Initial schema: tickets, tags, ticket_tags"

echo "迁移文件已创建，请检查 alembic/versions/ 目录下的迁移文件"
echo "确认无误后，运行以下命令执行迁移："
echo "  alembic upgrade head"



