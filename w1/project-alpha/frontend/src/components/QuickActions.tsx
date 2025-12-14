import { Button } from '@/components/ui/button';
import { Plus, Download, Filter, X } from 'lucide-react';
import { TicketStatus } from '@/types';
import { cn } from '@/utils/cn';

interface QuickActionsProps {
  onCreateClick: () => void;
  onExportClick?: () => void;
  status: TicketStatus | 'all';
  onStatusQuickChange: (status: TicketStatus | 'all') => void;
}

export function QuickActions({
  onCreateClick,
  onExportClick,
  status,
  onStatusQuickChange,
}: QuickActionsProps) {
  const statusOptions: Array<{ value: TicketStatus | 'all'; label: string }> = [
    { value: 'all', label: '全部' },
    { value: TicketStatus.PENDING, label: '待处理' },
    { value: TicketStatus.COMPLETED, label: '已完成' },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      <Button onClick={onCreateClick} size="sm">
        <Plus className="h-4 w-4 mr-2" />
        新建
      </Button>
      
      {onExportClick && (
        <Button variant="outline" size="sm" onClick={onExportClick}>
          <Download className="h-4 w-4 mr-2" />
          导出
        </Button>
      )}

      <div className="flex items-center gap-2 ml-auto">
        {statusOptions.map((option) => (
          <Button
            key={option.value}
            variant={status === option.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => onStatusQuickChange(option.value)}
            className={cn(
              status === option.value 
                ? 'bg-[#0071e3] text-white hover:bg-[#0077ed] shadow-sm' 
                : 'border-[#d2d2d7] text-[#1d1d1f] hover:bg-[#f5f5f7]'
            )}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );
}

