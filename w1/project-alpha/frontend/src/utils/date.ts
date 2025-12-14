import { format, formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';

export const formatDate = (date: string | Date) => {
  return format(new Date(date), 'yyyy-MM-dd HH:mm', { locale: zhCN });
};

export const formatRelativeDate = (date: string | Date) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true, locale: zhCN });
};



