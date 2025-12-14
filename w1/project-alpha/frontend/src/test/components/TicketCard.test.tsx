import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../utils/test-utils';
import { TicketCard } from '@/components/TicketCard';
import { Ticket, TicketStatus } from '@/types';

const mockTicket: Ticket = {
  id: 1,
  title: 'Test Ticket',
  description: 'Test Description',
  status: TicketStatus.PENDING,
  tags: [
    {
      id: 1,
      name: 'test-tag',
      color: '#3B82F6',
      created_at: '2024-01-01T00:00:00Z',
    },
  ],
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
};

describe('TicketCard', () => {
  it('renders ticket title and description', () => {
    render(<TicketCard ticket={mockTicket} />);
    expect(screen.getByText('Test Ticket')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders ticket tags', () => {
    render(<TicketCard ticket={mockTicket} />);
    expect(screen.getByText('test-tag')).toBeInTheDocument();
  });

  it('calls onComplete when complete button is clicked', () => {
    const onComplete = vi.fn();
    render(<TicketCard ticket={mockTicket} onComplete={onComplete} />);
    // 这里需要找到完成按钮并点击
    // 根据实际实现调整
  });

  it('shows completed state correctly', () => {
    const completedTicket = { ...mockTicket, status: TicketStatus.COMPLETED };
    render(<TicketCard ticket={completedTicket} />);
    expect(screen.getByText('Test Ticket')).toHaveClass('line-through');
  });
});

