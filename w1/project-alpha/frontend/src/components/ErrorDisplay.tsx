import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorDisplayProps {
  error: Error | unknown;
  onRetry?: () => void;
  title?: string;
  description?: string;
}

export function ErrorDisplay({ error, onRetry, title, description }: ErrorDisplayProps) {
  const errorMessage = error instanceof Error ? error.message : '发生了未知错误';

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 mb-4">
        <AlertCircle className="h-8 w-8 text-red-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title || '加载失败'}
      </h3>
      <p className="text-gray-600 text-sm mb-6 text-center max-w-md">
        {description || errorMessage}
      </p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          重试
        </Button>
      )}
    </div>
  );
}

