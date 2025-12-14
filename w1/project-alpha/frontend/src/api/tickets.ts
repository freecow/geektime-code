import { apiClient } from './client';
import type { Ticket, TicketCreate, TicketUpdate, TicketFilters, PaginatedResponse } from '@/types';

export const ticketsApi = {
  // 获取 Ticket 列表
  getTickets: async (filters: TicketFilters = {}): Promise<PaginatedResponse<Ticket>> => {
    const params = new URLSearchParams();
    
    if (filters.status && filters.status !== 'all') {
      params.append('status', filters.status);
    }
    if (filters.tag_ids && filters.tag_ids.length > 0) {
      params.append('tag_ids', filters.tag_ids.join(','));
    }
    if (filters.search) {
      params.append('search', filters.search);
    }
    if (filters.page) {
      params.append('page', filters.page.toString());
    }
    if (filters.page_size) {
      params.append('page_size', filters.page_size.toString());
    }

    const response = await apiClient.get<PaginatedResponse<Ticket>>(`/tickets?${params.toString()}`);
    return response.data;
  },

  // 获取单个 Ticket
  getTicket: async (id: number): Promise<Ticket> => {
    const response = await apiClient.get<Ticket>(`/tickets/${id}`);
    return response.data;
  },

  // 创建 Ticket
  createTicket: async (data: TicketCreate): Promise<Ticket> => {
    const response = await apiClient.post<Ticket>('/tickets', data);
    return response.data;
  },

  // 更新 Ticket
  updateTicket: async (id: number, data: TicketUpdate): Promise<Ticket> => {
    const response = await apiClient.put<Ticket>(`/tickets/${id}`, data);
    return response.data;
  },

  // 删除 Ticket
  deleteTicket: async (id: number): Promise<void> => {
    await apiClient.delete(`/tickets/${id}`);
  },

  // 完成 Ticket
  completeTicket: async (id: number): Promise<Ticket> => {
    const response = await apiClient.patch<Ticket>(`/tickets/${id}/complete`);
    return response.data;
  },

  // 取消完成 Ticket
  uncompleteTicket: async (id: number): Promise<Ticket> => {
    const response = await apiClient.patch<Ticket>(`/tickets/${id}/uncomplete`);
    return response.data;
  },

  // 添加标签
  addTag: async (ticketId: number, tagId: number): Promise<Ticket> => {
    const response = await apiClient.post<Ticket>(`/tickets/${ticketId}/tags/${tagId}`);
    return response.data;
  },

  // 移除标签
  removeTag: async (ticketId: number, tagId: number): Promise<Ticket> => {
    const response = await apiClient.delete<Ticket>(`/tickets/${ticketId}/tags/${tagId}`);
    return response.data;
  },
};

