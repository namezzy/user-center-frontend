'use client';

import { useAuthStore } from '@/store/auth-store';

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">控制台</h2>
        <p className="mt-1 text-text-secondary">
          欢迎回到用户中心管理系统
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary">用户账号</p>
              <p className="mt-2 text-2xl font-bold text-text-primary">
                {user?.userAccount}
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-light">
              <svg
                className="h-6 w-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary">星球编号</p>
              <p className="mt-2 text-2xl font-bold text-text-primary">
                {user?.planetCode || '-'}
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
              <svg
                className="h-6 w-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary">用户角色</p>
              <p className="mt-2 text-2xl font-bold text-text-primary">
                {user?.userRole === 1 ? '管理员' : '普通用户'}
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-card">
        <h3 className="text-lg font-semibold text-text-primary">个人信息</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-text-secondary">用户名</p>
            <p className="mt-1 text-text-primary">{user?.username || '-'}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-text-secondary">邮箱</p>
            <p className="mt-1 text-text-primary">{user?.email || '-'}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-text-secondary">电话</p>
            <p className="mt-1 text-text-primary">{user?.phone || '-'}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-text-secondary">注册时间</p>
            <p className="mt-1 text-text-primary">
              {user?.createTime ? new Date(user.createTime).toLocaleString('zh-CN') : '-'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
