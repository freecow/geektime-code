import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TicketsPage } from '@/pages/TicketsPage';
import { TagsPage } from '@/pages/TagsPage';
import { Toaster } from '@/components/ui/toaster';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Ticket, Tag as TagIcon } from 'lucide-react';
import { cn } from '@/utils/cn';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function Navigation() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Tickets', icon: Ticket },
    { path: '/tags', label: '标签', icon: TagIcon },
  ];

  return (
    <nav className="border-b border-[#d2d2d7]/50 bg-white/80 backdrop-blur-2xl sticky top-0 z-50 supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-10">
            <Link 
              to="/" 
              className="text-lg font-semibold text-[#1d1d1f] tracking-tight transition-opacity hover:opacity-80"
            >
              Project Alpha
            </Link>
            <div className="flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-[#f5f5f7] text-[#1d1d1f]"
                        : "text-[#86868b] hover:bg-[#f5f5f7] hover:text-[#1d1d1f]"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <div className="min-h-screen bg-gray-50">
            <Navigation />
            <Routes>
              <Route path="/" element={<TicketsPage />} />
              <Route path="/tags" element={<TagsPage />} />
            </Routes>
            <Toaster />
          </div>
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
