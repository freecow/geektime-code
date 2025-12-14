import { useTickets } from '@/hooks/useTickets';
import { useAllTags } from '@/hooks/useTags';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TicketStatus } from '@/types';
import { Ticket, Tag, CheckCircle2, Circle, TrendingUp } from 'lucide-react';
import { cn } from '@/utils/cn';

export function StatsPanel() {
  const { data: ticketsData } = useTickets({ page: 1, page_size: 1000 });
  const { data: tagsData } = useAllTags();

  const stats = {
    total: ticketsData?.total || 0,
    pending: ticketsData?.data.filter(t => t.status === TicketStatus.PENDING).length || 0,
    completed: ticketsData?.data.filter(t => t.status === TicketStatus.COMPLETED).length || 0,
    tags: tagsData?.length || 0,
  };

  const completionRate = stats.total > 0 
    ? Math.round((stats.completed / stats.total) * 100) 
    : 0;

  const statCards = [
    {
      title: '总 Ticket',
      value: stats.total,
      icon: Ticket,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: '待处理',
      value: stats.pending,
      icon: Circle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: '已完成',
      value: stats.completed,
      icon: CheckCircle2,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: '完成率',
      value: `${completionRate}%`,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card 
            key={stat.title} 
            className="overflow-hidden border-[#d2d2d7] hover:border-[#86868b] transition-all duration-200 hover:shadow-md"
          >
            <CardHeader className="pb-3 px-6 pt-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-[#86868b] tracking-wide uppercase">
                  {stat.title}
                </CardTitle>
                <div className={cn("p-2.5 rounded-xl", stat.bgColor)}>
                  <Icon className={cn("h-5 w-5", stat.color)} />
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className="text-3xl font-semibold text-[#1d1d1f] tracking-tight">
                {stat.value}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

