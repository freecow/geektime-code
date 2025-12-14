import { useState } from 'react';
import { TicketStatus, Tag } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, X, Filter } from 'lucide-react';
import { cn } from '@/utils/cn';

interface TicketFiltersProps {
  status: TicketStatus | 'all';
  search: string;
  selectedTagIds: number[];
  availableTags: Tag[];
  onStatusChange: (status: TicketStatus | 'all') => void;
  onSearchChange: (search: string) => void;
  onTagToggle: (tagId: number) => void;
  onClearFilters: () => void;
}

export function TicketFilters({
  status,
  search,
  selectedTagIds,
  availableTags,
  onStatusChange,
  onSearchChange,
  onTagToggle,
  onClearFilters,
}: TicketFiltersProps) {
  const [showTagFilters, setShowTagFilters] = useState(false);
  const hasActiveFilters = status !== 'all' || search !== '' || selectedTagIds.length > 0;

  return (
    <div className="space-y-4">
      {/* 搜索和状态过滤 */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#86868b] z-10" />
          <Input
            placeholder="搜索 Ticket 标题..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-11"
          />
        </div>
        <Select value={status} onValueChange={onStatusChange}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="状态" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部</SelectItem>
            <SelectItem value={TicketStatus.PENDING}>待处理</SelectItem>
            <SelectItem value={TicketStatus.COMPLETED}>已完成</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          onClick={() => setShowTagFilters(!showTagFilters)}
          className={cn(showTagFilters && "bg-gray-100")}
        >
          <Filter className="h-4 w-4 mr-2" />
          标签
        </Button>
        {hasActiveFilters && (
          <Button variant="outline" onClick={onClearFilters}>
            <X className="h-4 w-4 mr-2" />
            清除
          </Button>
        )}
      </div>

      {/* 标签过滤 */}
      {showTagFilters && (
        <div className="p-4 border rounded-lg bg-gray-50">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium">按标签过滤</h3>
            {selectedTagIds.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => selectedTagIds.forEach(onTagToggle)}
              >
                清除选择
              </Button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => {
              const isSelected = selectedTagIds.includes(tag.id);
              return (
                <label
                  key={tag.id}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-md border cursor-pointer transition-colors",
                    isSelected
                      ? "bg-white border-gray-300 shadow-sm"
                      : "bg-white border-gray-200 hover:border-gray-300"
                  )}
                >
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => onTagToggle(tag.id)}
                  />
                  <Badge
                    style={{ backgroundColor: tag.color + '20', color: tag.color }}
                    className="border-0"
                  >
                    {tag.name}
                  </Badge>
                  {tag.ticket_count !== undefined && (
                    <span className="text-xs text-gray-500">
                      ({tag.ticket_count})
                    </span>
                  )}
                </label>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

