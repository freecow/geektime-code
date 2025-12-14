import { Ticket, TicketStatus } from '@/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatRelativeDate } from '@/utils/date';
import { CheckCircle2, Circle, Trash2, Edit, Tag as TagIcon } from 'lucide-react';
import { cn } from '@/utils/cn';

interface TicketCardProps {
  ticket: Ticket;
  onComplete?: (id: number) => void;
  onUncomplete?: (id: number) => void;
  onDelete?: (id: number) => void;
  onEdit?: (ticket: Ticket) => void;
}

export function TicketCard({ ticket, onComplete, onUncomplete, onDelete, onEdit }: TicketCardProps) {
  const isCompleted = ticket.status === TicketStatus.COMPLETED;

  return (
    <Card className={cn(
      "group relative bg-white border border-[#d2d2d7] rounded-2xl overflow-hidden",
      "transition-all duration-300 ease-out",
      "hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1",
      "hover:border-[#86868b]",
      isCompleted && "opacity-70"
    )}>
      <CardHeader className="pb-4 px-6 pt-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className={cn(
              "text-xl font-semibold leading-tight text-[#1d1d1f] mb-2",
              "transition-colors duration-200",
              isCompleted && "line-through text-[#86868b]"
            )}>
              {ticket.title}
            </h3>
            {ticket.description && (
              <p className="text-[#86868b] text-[15px] leading-relaxed line-clamp-2">
                {ticket.description}
              </p>
            )}
          </div>
          <div className="flex-shrink-0">
            {isCompleted ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onUncomplete?.(ticket.id)}
                className="h-10 w-10 rounded-full hover:bg-green-50 transition-colors"
              >
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onComplete?.(ticket.id)}
                className="h-10 w-10 rounded-full hover:bg-gray-50 transition-colors"
              >
                <Circle className="h-5 w-5 text-[#86868b]" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-6 pb-4">
        <div className="flex flex-wrap gap-2">
          {ticket.tags.length > 0 ? (
            ticket.tags.map((tag) => (
              <Badge
                key={tag.id}
                style={{ 
                  backgroundColor: tag.color + '15', 
                  color: tag.color, 
                  borderColor: tag.color + '40'
                }}
                className="border rounded-full px-3 py-1 text-xs font-medium transition-all hover:scale-105"
              >
                {tag.name}
              </Badge>
            ))
          ) : (
            <span className="text-xs text-[#86868b]">无标签</span>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between px-6 py-4 border-t border-[#f5f5f7] bg-[#fafafa]">
        <span className="text-xs text-[#86868b] font-medium">
          {formatRelativeDate(ticket.created_at)}
        </span>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit?.(ticket)}
            className="h-8 px-3 rounded-lg text-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors"
          >
            <Edit className="h-3.5 w-3.5 mr-1.5" />
            <span className="text-xs">编辑</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete?.(ticket.id)}
            className="h-8 w-8 p-0 rounded-lg text-[#ff3b30] hover:bg-red-50 transition-colors"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

