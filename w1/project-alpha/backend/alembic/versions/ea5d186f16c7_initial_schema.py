"""Initial schema

Revision ID: ea5d186f16c7
Revises: 
Create Date: 2025-12-14 04:20:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = 'ea5d186f16c7'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # 创建 ticket_status 枚举类型（如果不存在）
    conn = op.get_bind()
    result = conn.execute(sa.text("SELECT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'ticket_status')"))
    enum_exists = result.scalar()
    
    if not enum_exists:
        ticket_status_enum = postgresql.ENUM('pending', 'completed', name='ticket_status', create_type=True)
        ticket_status_enum.create(conn)
    else:
        # 如果枚举已存在，直接使用它
        ticket_status_enum = postgresql.ENUM('pending', 'completed', name='ticket_status', create_type=False)
    
    # 检查表是否存在
    conn = op.get_bind()
    
    # 创建 tags 表（如果不存在）
    tags_exists = conn.execute(sa.text(
        "SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'tags')"
    )).scalar()
    
    if not tags_exists:
        op.create_table(
            'tags',
            sa.Column('id', sa.Integer(), nullable=False),
            sa.Column('name', sa.String(length=50), nullable=False),
            sa.Column('color', sa.String(length=7), nullable=False, server_default='#3B82F6'),
            sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
            sa.PrimaryKeyConstraint('id')
        )
        op.create_index(op.f('ix_tags_id'), 'tags', ['id'], unique=False)
        op.create_index(op.f('ix_tags_name'), 'tags', ['name'], unique=True)
    
    # 创建 tickets 表（如果不存在）
    tickets_exists = conn.execute(sa.text(
        "SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'tickets')"
    )).scalar()
    
    if not tickets_exists:
        # 使用已存在的枚举类型，不尝试创建
        status_enum = postgresql.ENUM('pending', 'completed', name='ticket_status', create_type=False)
        op.create_table(
            'tickets',
            sa.Column('id', sa.Integer(), nullable=False),
            sa.Column('title', sa.String(length=200), nullable=False),
            sa.Column('description', sa.Text(), nullable=True),
            sa.Column('status', status_enum, nullable=False, server_default='pending'),
            sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
            sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
            sa.PrimaryKeyConstraint('id')
        )
        op.create_index(op.f('ix_tickets_id'), 'tickets', ['id'], unique=False)
        op.create_index(op.f('ix_tickets_status'), 'tickets', ['status'], unique=False)
        op.create_index(op.f('ix_tickets_title'), 'tickets', ['title'], unique=False)
    
    # 创建 ticket_tags 关联表（如果不存在）
    ticket_tags_exists = conn.execute(sa.text(
        "SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'ticket_tags')"
    )).scalar()
    
    if not ticket_tags_exists:
        op.create_table(
            'ticket_tags',
            sa.Column('ticket_id', sa.Integer(), nullable=False),
            sa.Column('tag_id', sa.Integer(), nullable=False),
            sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
            sa.ForeignKeyConstraint(['tag_id'], ['tags.id'], ondelete='CASCADE'),
            sa.ForeignKeyConstraint(['ticket_id'], ['tickets.id'], ondelete='CASCADE'),
            sa.PrimaryKeyConstraint('ticket_id', 'tag_id')
        )


def downgrade() -> None:
    # 删除表
    op.drop_table('ticket_tags')
    op.drop_index(op.f('ix_tickets_title'), table_name='tickets')
    op.drop_index(op.f('ix_tickets_status'), table_name='tickets')
    op.drop_index(op.f('ix_tickets_id'), table_name='tickets')
    op.drop_table('tickets')
    op.drop_index(op.f('ix_tags_name'), table_name='tags')
    op.drop_index(op.f('ix_tags_id'), table_name='tags')
    op.drop_table('tags')
    
    # 删除枚举类型
    ticket_status_enum = postgresql.ENUM(name='ticket_status')
    ticket_status_enum.drop(op.get_bind(), checkfirst=True)

