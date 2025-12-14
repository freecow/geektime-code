import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tagsApi } from '@/api/tags';
import type { TagCreate } from '@/types';

export const useTags = (page: number = 1, pageSize: number = 100) => {
  return useQuery({
    queryKey: ['tags', page, pageSize],
    queryFn: () => tagsApi.getTags(page, pageSize),
  });
};

export const useAllTags = () => {
  return useQuery({
    queryKey: ['tags', 'all'],
    queryFn: () => tagsApi.getAllTags(),
  });
};

export const useTag = (id: number | null) => {
  return useQuery({
    queryKey: ['tag', id],
    queryFn: () => tagsApi.getTag(id!),
    enabled: !!id,
  });
};

export const useCreateTag = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: TagCreate) => tagsApi.createTag(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
    },
  });
};

export const useDeleteTag = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => tagsApi.deleteTag(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
    },
  });
};

