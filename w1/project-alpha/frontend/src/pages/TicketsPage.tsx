import { useState, useMemo } from 'react';
import { TicketStatus } from '@/types';
import { 
  useTickets, 
  useCompleteTicket, 
  useUncompleteTicket, 
  useDeleteTicket,
  useCreateTicket,
  useUpdateTicket,
  useAddTagToTicket,
  useRemoveTagFromTicket,
} from '@/hooks/useTickets';
import { useAllTags } from '@/hooks/useTags';
import { TicketCard } from '@/components/TicketCard';
import { TicketFilters } from '@/components/TicketFilters';
import { TicketForm } from '@/components/TicketForm';
import { StatsPanel } from '@/components/StatsPanel';
import { QuickActions } from '@/components/QuickActions';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useDebounce } from '@/hooks/useDebounce';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { exportTicketsToCSV, exportTicketsToJSON } from '@/utils/export';
import { Plus, Loader2 } from 'lucide-react';
import { Ticket, TicketCreate, TicketUpdate } from '@/types';
import { ErrorDisplay } from '@/components/ErrorDisplay';

export function TicketsPage() {
  const { toast } = useToast();
  const [status, setStatus] = useState<TicketStatus | 'all'>('all');
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 20;

  // 键盘快捷键
  useKeyboardShortcuts([
    {
      key: 'n',
      ctrlKey: true,
      handler: () => {
        setEditingTicket(null);
        setFormOpen(true);
      },
    },
    {
      key: 'k',
      ctrlKey: true,
      handler: () => {
        // 聚焦搜索框
        const searchInput = document.querySelector('input[placeholder*="搜索"]') as HTMLInputElement;
        searchInput?.focus();
      },
    },
  ]);

  const filters = useMemo(() => ({
    status: status !== 'all' ? status : undefined,
    search: debouncedSearch || undefined,
    tag_ids: selectedTagIds.length > 0 ? selectedTagIds : undefined,
    page,
    page_size: pageSize,
  }), [status, debouncedSearch, selectedTagIds, page, pageSize]);

  const { data, isLoading, error } = useTickets(filters);
  const { data: tagsData } = useAllTags();
  const createTicket = useCreateTicket();
  const updateTicket = useUpdateTicket();
  const completeTicket = useCompleteTicket();
  const uncompleteTicket = useUncompleteTicket();
  const deleteTicket = useDeleteTicket();
  const addTag = useAddTagToTicket();
  const removeTag = useRemoveTagFromTicket();

  const handleCreateTicket = async (data: TicketCreate) => {
    try {
      await createTicket.mutateAsync(data);
      toast({
        title: '成功',
        description: 'Ticket 创建成功',
        variant: 'success',
      });
    } catch (error: any) {
      toast({
        title: '错误',
        description: error.message || '创建 Ticket 失败',
        variant: 'destructive',
      });
    }
  };

  const handleUpdateTicket = async (formData: { title: string; description?: string; tag_ids?: number[] }) => {
    if (!editingTicket) return;
    try {
      // 更新 title 和 description
      const updateData: TicketUpdate = {
        title: formData.title,
        description: formData.description,
      };
      await updateTicket.mutateAsync({ id: editingTicket.id, data: updateData });

      // 处理标签更新
      const currentTagIds = editingTicket.tags.map(t => t.id);
      const newTagIds = formData.tag_ids || [];
      
      // 移除不再需要的标签
      for (const tagId of currentTagIds) {
        if (!newTagIds.includes(tagId)) {
          await removeTag.mutateAsync({ ticketId: editingTicket.id, tagId });
        }
      }

      // 添加新标签
      for (const tagId of newTagIds) {
        if (!currentTagIds.includes(tagId)) {
          await addTag.mutateAsync({ ticketId: editingTicket.id, tagId });
        }
      }

      toast({
        title: '成功',
        description: 'Ticket 更新成功',
        variant: 'success',
      });
      setEditingTicket(null);
    } catch (error: any) {
      toast({
        title: '错误',
        description: error.message || '更新 Ticket 失败',
        variant: 'destructive',
      });
    }
  };

  const handleComplete = async (id: number) => {
    try {
      await completeTicket.mutateAsync(id);
      toast({
        title: '成功',
        description: 'Ticket 已完成',
        variant: 'success',
      });
    } catch (error: any) {
      toast({
        title: '错误',
        description: error.message || '操作失败',
        variant: 'destructive',
      });
    }
  };

  const handleUncomplete = async (id: number) => {
    try {
      await uncompleteTicket.mutateAsync(id);
      toast({
        title: '成功',
        description: 'Ticket 已取消完成',
        variant: 'success',
      });
    } catch (error: any) {
      toast({
        title: '错误',
        description: error.message || '操作失败',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('确定要删除这个 Ticket 吗？')) return;
    try {
      await deleteTicket.mutateAsync(id);
      toast({
        title: '成功',
        description: 'Ticket 已删除',
        variant: 'success',
      });
    } catch (error: any) {
      toast({
        title: '错误',
        description: error.message || '删除失败',
        variant: 'destructive',
      });
    }
  };

  const handleEdit = (ticket: Ticket) => {
    setEditingTicket(ticket);
    setFormOpen(true);
  };

  const handleTagToggle = (tagId: number) => {
    setSelectedTagIds((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
    setPage(1); // Reset to first page when filter changes
  };

  const handleClearFilters = () => {
    setStatus('all');
    setSearch('');
    setSelectedTagIds([]);
    setPage(1);
  };

  const handleExport = () => {
    if (!data || data.data.length === 0) {
      toast({
        title: '提示',
        description: '没有数据可导出',
        variant: 'default',
      });
      return;
    }

    // 导出当前页数据
    exportTicketsToCSV(data.data);
    toast({
      title: '成功',
      description: '数据已导出',
      variant: 'success',
    });
  };

  const availableTags = tagsData || [];

  return (
    <div className="min-h-screen bg-[#fbfbfd]">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20 max-w-7xl">
        {/* Header - Apple style large title */}
        <div className="mb-12 sm:mb-16">
          <div className="mb-10 sm:mb-12">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold text-[#1d1d1f] tracking-tight mb-4">
              Tickets
            </h1>
            <p className="text-xl sm:text-2xl text-[#86868b] font-light max-w-2xl">
              管理和跟踪你的任务
            </p>
          </div>

          {/* Stats Panel */}
          <StatsPanel />

          {/* Quick Actions */}
          <QuickActions
            onCreateClick={() => {
              setEditingTicket(null);
              setFormOpen(true);
            }}
            onExportClick={handleExport}
            status={status}
            onStatusQuickChange={setStatus}
          />
        </div>

        {/* Filters */}
        <div className="mb-6">
          <TicketFilters
            status={status}
            search={search}
            selectedTagIds={selectedTagIds}
            availableTags={availableTags}
            onStatusChange={setStatus}
            onSearchChange={setSearch}
            onTagToggle={handleTagToggle}
            onClearFilters={handleClearFilters}
          />
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        ) : error ? (
          <ErrorDisplay
            error={error}
            onRetry={() => window.location.reload()}
          />
        ) : !data || data.data.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <Plus className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg mb-2">暂无 Ticket</p>
            <p className="text-gray-400 text-sm mb-6">开始创建你的第一个任务吧</p>
            <Button
              onClick={() => {
                setEditingTicket(null);
                setFormOpen(true);
              }}
              size="lg"
            >
              <Plus className="h-4 w-4 mr-2" />
              创建第一个 Ticket
            </Button>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="text-base text-[#86868b]">
                共 <span className="font-medium text-[#1d1d1f]">{data.total}</span> 个 Ticket，第 <span className="font-medium text-[#1d1d1f]">{data.page}</span> / <span className="font-medium text-[#1d1d1f]">{data.total_pages}</span> 页
              </div>
              <div className="text-sm text-[#86868b] flex items-center gap-2">
                <span>快捷键:</span>
                <kbd className="px-2.5 py-1 bg-white border border-gray-200 rounded-md text-xs font-medium shadow-sm">Ctrl+N</kbd>
                <span>新建,</span>
                <kbd className="px-2.5 py-1 bg-white border border-gray-200 rounded-md text-xs font-medium shadow-sm">Ctrl+K</kbd>
                <span>搜索</span>
              </div>
            </div>

            {/* Ticket Grid - Apple style spacing */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-8">
              {data.data.map((ticket) => (
                <TicketCard
                  key={ticket.id}
                  ticket={ticket}
                  onComplete={handleComplete}
                  onUncomplete={handleUncomplete}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ))}
            </div>

            {/* Pagination */}
            {data.total_pages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  上一页
                </Button>
                <span className="text-sm text-gray-600">
                  第 {data.page} / {data.total_pages} 页
                </span>
                <Button
                  variant="outline"
                  onClick={() => setPage((p) => Math.min(data.total_pages, p + 1))}
                  disabled={page >= data.total_pages}
                >
                  下一页
                </Button>
              </div>
            )}
          </>
        )}

        {/* Ticket Form Dialog */}
        <TicketForm
          ticket={editingTicket || undefined}
          availableTags={availableTags}
          open={formOpen}
          onOpenChange={(open) => {
            setFormOpen(open);
            if (!open) {
              setEditingTicket(null);
            }
          }}
          onSubmit={editingTicket ? handleUpdateTicket : handleCreateTicket}
        />
      </div>
    </div>
  );
}

