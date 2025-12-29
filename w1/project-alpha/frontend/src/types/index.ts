export enum TicketStatus {
  PENDING = 'pending',
  COMPLETED = 'completed'
}

export interface Tag {
  id: number;
  name: string;
  color: string;
  created_at: string;
  ticket_count?: number;
}

export interface Ticket {
  id: number;
  title: string;
  description?: string;
  status: TicketStatus;
  tags: Tag[];
  created_at: string;
  updated_at: string;
}

export interface TicketFilters {
  status?: TicketStatus | 'all';
  tag_ids?: number[];
  search?: string;
  page?: number;
  page_size?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export interface TicketCreate {
  title: string;
  description?: string;
  tag_ids?: number[];
}

export interface TicketUpdate {
  title?: string;
  description?: string;
}

export interface TagCreate {
  name: string;
  color: string;
}





