import sys
from pathlib import Path

# 添加项目根目录到 Python 路径
backend_dir = Path(__file__).parent.parent
sys.path.insert(0, str(backend_dir))

from app.database import SessionLocal
from app.models import Ticket, Tag, TicketStatus
from datetime import datetime
from sqlalchemy import text

def seed_data():
    db = SessionLocal()
    
    try:
        # 创建或获取标签
        tag_data = [
            ("bug", "#EF4444"),
            ("feature", "#10B981"),
            ("frontend", "#3B82F6"),
            ("backend", "#8B5CF6"),
            ("urgent", "#F59E0B"),
        ]
        
        tags = []
        for name, color in tag_data:
            tag = db.query(Tag).filter(Tag.name == name).first()
            if not tag:
                tag = Tag(name=name, color=color)
                db.add(tag)
                db.flush()
            tags.append(tag)
        
        db.commit()
        
        # 检查是否已有票务数据
        existing_tickets = db.query(Ticket).count()
        if existing_tickets > 0:
            print(f"Found {existing_tickets} existing tickets. Skipping ticket creation.")
            return
        
        # 使用原始 SQL 插入票务数据，避免 SQLAlchemy 枚举处理问题
        now = datetime.utcnow()
        db.execute(text("""
            INSERT INTO tickets (title, description, status, created_at, updated_at)
            VALUES 
                (:title1, :desc1, CAST(:status1 AS ticket_status), :now, :now),
                (:title2, :desc2, CAST(:status2 AS ticket_status), :now, :now)
            RETURNING id
        """), {
            "title1": "修复登录页面样式问题",
            "desc1": "移动端显示不正常",
            "status1": "pending",
            "title2": "实现数据导出功能",
            "desc2": "支持 CSV 和 Excel 格式",
            "status2": "completed",
            "now": now
        })
        
        # 获取刚插入的票务 ID
        result = db.execute(text("SELECT id FROM tickets ORDER BY id DESC LIMIT 2"))
        ticket_ids = [row[0] for row in result]
        
        # 关联标签
        db.execute(text("""
            INSERT INTO ticket_tags (ticket_id, tag_id, created_at)
            VALUES 
                (:ticket1, :tag1, :now),
                (:ticket1, :tag2, :now),
                (:ticket2, :tag3, :now),
                (:ticket2, :tag4, :now)
        """), {
            "ticket1": ticket_ids[1],  # 第一个票务
            "tag1": tags[0].id,  # bug
            "tag2": tags[2].id,  # frontend
            "ticket2": ticket_ids[0],  # 第二个票务
            "tag3": tags[1].id,  # feature
            "tag4": tags[3].id,  # backend
            "now": now
        })
        
        db.commit()
        
        print("Test data seeded successfully!")
        
    except Exception as e:
        print(f"Error: {e}")
        db.rollback()
        raise
    finally:
        db.close()

if __name__ == "__main__":
    seed_data()



