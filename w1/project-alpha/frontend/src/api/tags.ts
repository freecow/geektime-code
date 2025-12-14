import { apiClient } from './client';
import type { Tag, TagCreate, PaginatedResponse } from '@/types';

export const tagsApi = {
  // 获取 Tag 列表（分页）
  getTags: async (page: number = 1, pageSize: number = 100): Promise<PaginatedResponse<Tag>> => {
    const response = await apiClient.get<PaginatedResponse<Tag>>(`/tags?page=${page}&page_size=${pageSize}`);
    return response.data;
  },

  // 获取所有 Tag（不分页）
  getAllTags: async (): Promise<Tag[]> => {
    const response = await apiClient.get<Tag[]>('/tags/all');
    return response.data;
  },

  // 获取单个 Tag
  getTag: async (id: number): Promise<Tag> => {
    const response = await apiClient.get<Tag>(`/tags/${id}`);
    return response.data;
  },

  // 创建 Tag
  createTag: async (data: TagCreate): Promise<Tag> => {
    const response = await apiClient.post<Tag>('/tags', data);
    return response.data;
  },

  // 删除 Tag
  deleteTag: async (id: number): Promise<void> => {
    await apiClient.delete(`/tags/${id}`);
  },
};

