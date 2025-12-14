import { Ticket } from '@/types';

export function exportTicketsToCSV(tickets: Ticket[]) {
  const headers = ['ID', '标题', '描述', '状态', '标签', '创建时间', '更新时间'];
  const rows = tickets.map(ticket => [
    ticket.id.toString(),
    ticket.title,
    ticket.description || '',
    ticket.status === 'pending' ? '待处理' : '已完成',
    ticket.tags.map(t => t.name).join(', '),
    new Date(ticket.created_at).toLocaleString('zh-CN'),
    new Date(ticket.updated_at).toLocaleString('zh-CN'),
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `tickets_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportTicketsToJSON(tickets: Ticket[]) {
  const jsonContent = JSON.stringify(tickets, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `tickets_${new Date().toISOString().split('T')[0]}.json`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

