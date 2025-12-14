import { useState } from 'react';
import { useTags, useCreateTag, useDeleteTag } from '@/hooks/useTags';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Plus, Trash2, Loader2, Tag as TagIcon } from 'lucide-react';
import { PRESET_COLORS } from '@/utils/colors';
import { TagCreate } from '@/types';
import { cn } from '@/utils/cn';

export function TagsPage() {
  const { toast } = useToast();
  const [page, setPage] = useState(1);
  const [formOpen, setFormOpen] = useState(false);
  const [tagName, setTagName] = useState('');
  const [tagColor, setTagColor] = useState(PRESET_COLORS[0].value);

  const { data, isLoading } = useTags(page, 50);
  const createTag = useCreateTag();
  const deleteTag = useDeleteTag();

  const handleCreateTag = async () => {
    if (!tagName.trim()) {
      toast({
        title: '错误',
        description: '标签名称不能为空',
        variant: 'destructive',
      });
      return;
    }

    try {
      const data: TagCreate = {
        name: tagName.trim(),
        color: tagColor,
      };
      await createTag.mutateAsync(data);
      toast({
        title: '成功',
        description: '标签创建成功',
        variant: 'success',
      });
      setFormOpen(false);
      setTagName('');
      setTagColor(PRESET_COLORS[0].value);
    } catch (error: any) {
      toast({
        title: '错误',
        description: error.response?.data?.detail || '创建标签失败',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteTag = async (id: number, name: string) => {
    if (!confirm(`确定要删除标签 "${name}" 吗？这将移除所有 Ticket 上的此标签。`)) {
      return;
    }

    try {
      await deleteTag.mutateAsync(id);
      toast({
        title: '成功',
        description: '标签已删除',
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

  return (
    <div className="min-h-screen bg-[#fbfbfd]">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20 max-w-7xl">
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <div className="mb-10 sm:mb-12">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold text-[#1d1d1f] tracking-tight mb-4">
              标签管理
            </h1>
            <p className="text-xl sm:text-2xl text-[#86868b] font-light">
              管理你的标签
            </p>
          </div>
          <Button onClick={() => setFormOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            新建标签
          </Button>
        </div>

        {/* Tags Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        ) : !data || data.data.length === 0 ? (
          <div className="text-center py-12">
            <TagIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">暂无标签</p>
            <Button onClick={() => setFormOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              创建第一个标签
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-gray-600">
              共 {data.total} 个标签
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {data.data.map((tag) => (
                <Card key={tag.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge
                        style={{ backgroundColor: tag.color + '20', color: tag.color }}
                        className="text-base px-3 py-1"
                      >
                        {tag.name}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteTag(tag.id, tag.name)}
                        className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>颜色:</span>
                        <div
                          className="w-6 h-6 rounded border border-gray-300"
                          style={{ backgroundColor: tag.color }}
                        />
                        <span className="font-mono text-xs">{tag.color}</span>
                      </div>
                      {tag.ticket_count !== undefined && (
                        <div className="text-sm text-gray-600">
                          关联 Ticket: {tag.ticket_count} 个
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {data.total_pages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-6">
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

        {/* Create Tag Dialog */}
        <Dialog open={formOpen} onOpenChange={setFormOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>创建标签</DialogTitle>
              <DialogDescription>创建一个新的标签</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <label htmlFor="tag-name" className="block text-sm font-medium mb-1">
                  标签名称 <span className="text-red-500">*</span>
                </label>
                <Input
                  id="tag-name"
                  value={tagName}
                  onChange={(e) => setTagName(e.target.value)}
                  placeholder="输入标签名称..."
                  maxLength={50}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">颜色</label>
                <div className="grid grid-cols-8 gap-2">
                  {PRESET_COLORS.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => setTagColor(color.value)}
                      className={cn(
                        "w-10 h-10 rounded border-2 transition-all",
                        tagColor === color.value
                          ? "border-gray-900 scale-110"
                          : "border-gray-300 hover:border-gray-400"
                      )}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded border border-gray-300"
                    style={{ backgroundColor: tagColor }}
                  />
                  <span className="font-mono text-sm text-gray-600">{tagColor}</span>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setFormOpen(false)}>
                取消
              </Button>
              <Button onClick={handleCreateTag} disabled={createTag.isPending}>
                {createTag.isPending ? '创建中...' : '创建'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

