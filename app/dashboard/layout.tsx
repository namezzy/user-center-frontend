'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '@/lib/api/auth';
import { useAuthStore } from '@/store/auth-store';
import Button from '@/components/ui/Button';
import { toast } from '@/components/ui/Toast';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, setUser, logout: storeLogout } = useAuthStore();

  // Fetch current user
  const { isLoading } = useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const data = await authApi.getCurrentUser();
      if (data.code === 0) {
        setUser(data.data);
        return data;
      } else {
        router.push('/');
        throw new Error('Not authenticated');
      }
    },
    retry: false,
    refetchOnMount: true,
  });

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      storeLogout();
      queryClient.clear();
      toast.success('退出登录成功');
      router.push('/');
    },
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-secondary">
      {/* Header */}
      <header className="border-b border-border bg-bg-primary shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-bold text-primary">用户中心</h1>
            <nav className="hidden space-x-6 md:flex">
              <Link
                href="/dashboard"
                className="text-sm font-medium text-text-secondary transition-colors hover:text-primary"
              >
                首页
              </Link>
              <Link
                href="/dashboard/users"
                className="text-sm font-medium text-text-secondary transition-colors hover:text-primary"
              >
                用户管理
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-text-secondary">
              欢迎, <span className="font-medium text-text-primary">{user?.username || user?.userAccount}</span>
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => logoutMutation.mutate()}
              isLoading={logoutMutation.isPending}
            >
              退出登录
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
