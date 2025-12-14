import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Ticket, TicketCreate, TicketUpdate, Tag } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/utils/cn';

const ticketSchema = z.object({
  title: z.string().min(1, '标题不能为空').max(200, '标题不能超过200个字符'),
  description: z.string().optional(),
  tag_ids: z.array(z.number()).optional(),
});

type TicketFormData = z.infer<typeof ticketSchema>;

interface TicketFormProps {
  ticket?: Ticket;
  availableTags: Tag[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: TicketFormData) => Promise<void>;
}

export function TicketForm({
  ticket,
  availableTags,
  open,
  onOpenChange,
  onSubmit,
}: TicketFormProps) {
  const isEdit = !!ticket;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      title: '',
      description: '',
      tag_ids: [],
    },
  });

  const selectedTagIds = watch('tag_ids') || [];

  useEffect(() => {
    if (open) {
      if (ticket) {
        reset({
          title: ticket.title,
          description: ticket.description || '',
          tag_ids: ticket.tags.map((t) => t.id),
        });
      } else {
        reset({
          title: '',
          description: '',
          tag_ids: [],
        });
      }
    }
  }, [ticket, open, reset]);

  const toggleTag = (tagId: number) => {
    const current = selectedTagIds;
    if (current.includes(tagId)) {
      setValue('tag_ids', current.filter((id) => id !== tagId));
    } else {
      setValue('tag_ids', [...current, tagId]);
    }
  };

  const onFormSubmit = async (data: TicketFormData) => {
    try {
      await onSubmit(data);
      onOpenChange(false);
      reset();
    } catch (error) {
      // Error handling is done in parent component
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? '编辑 Ticket' : '创建 Ticket'}</DialogTitle>
          <DialogDescription>
            {isEdit ? '更新 Ticket 信息' : '创建一个新的 Ticket'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              标题 <span className="text-red-500">*</span>
            </label>
            <Input
              id="title"
              {...register('title')}
              placeholder="输入 Ticket 标题..."
              className={cn(errors.title && 'border-red-500')}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              描述
            </label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="输入 Ticket 描述（可选）..."
              rows={4}
              className={cn(errors.description && 'border-red-500')}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">标签</label>
            <div className="flex flex-wrap gap-2 p-3 border rounded-md bg-gray-50 min-h-[100px]">
              {availableTags.length > 0 ? (
                availableTags.map((tag) => {
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
                        onCheckedChange={() => toggleTag(tag.id)}
                      />
                      <Badge
                        style={{ backgroundColor: tag.color + '20', color: tag.color }}
                        className="border-0"
                      >
                        {tag.name}
                      </Badge>
                    </label>
                  );
                })
              ) : (
                <span className="text-sm text-gray-400">暂无可用标签</span>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              取消
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? '保存中...' : isEdit ? '更新' : '创建'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

