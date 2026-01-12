'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from '@/lib/api/user';
import { useAuthStore } from '@/store/auth-store';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { toast } from '@/components/ui/Toast';
import type { User } from '@/types';

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const queryClient = useQueryClient();
  const currentUser = useAuthStore((state) => state.user);

  const { data: usersData, isLoading } = useQuery({
    queryKey: ['users', searchTerm],
    queryFn: () => userApi.searchUsers({ username: searchTerm }),
  });

  const deleteMutation = useMutation({
    mutationFn: userApi.deleteUser,
    onSuccess: (response) => {
      if (response.code === 0) {
        toast.success('删除用户成功');
        queryClient.invalidateQueries({ queryKey: ['users'] });
      } else {
        toast.error(response.message || '删除失败');
      }
    },
    onError: () => {
      toast.error('删除用户失败');
    },
  });

  const handleDelete = (userId: number) => {
    if (confirm('确定要删除该用户吗？')) {
      deleteMutation.mutate(userId);
    }
  };

  const users = usersData?.data || [];
  const isAdmin = currentUser?.userRole === 1;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">用户管理</h2>
          <p className="mt-1 text-text-secondary">
            管理和查看所有系统用户
          </p>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-card">
        <div className="mb-6">
          <Input
            placeholder="搜索用户名..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : users.length === 0 ? (
          <div className="py-12 text-center text-text-secondary">
            没有找到用户
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-3 text-left text-sm font-semibold text-text-secondary">
                    ID
                  </th>
                  <th className="pb-3 text-left text-sm font-semibold text-text-secondary">
                    用户名
                  </th>
                  <th className="pb-3 text-left text-sm font-semibold text-text-secondary">
                    账号
                  </th>
                  <th className="pb-3 text-left text-sm font-semibold text-text-secondary">
                    星球编号
                  </th>
                  <th className="pb-3 text-left text-sm font-semibold text-text-secondary">
                    角色
                  </th>
                  <th className="pb-3 text-left text-sm font-semibold text-text-secondary">
                    状态
                  </th>
                  <th className="pb-3 text-left text-sm font-semibold text-text-secondary">
                    创建时间
                  </th>
                  {isAdmin && (
                    <th className="pb-3 text-left text-sm font-semibold text-text-secondary">
                      操作
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {users.map((user: User) => (
                  <tr key={user.id} className="hover:bg-bg-secondary">
                    <td className="py-4 text-sm text-text-primary">
                      {user.id}
                    </td>
                    <td className="py-4 text-sm text-text-primary">
                      {user.username || '-'}
                    </td>
                    <td className="py-4 text-sm text-text-primary">
                      {user.userAccount}
                    </td>
                    <td className="py-4 text-sm text-text-primary">
                      {user.planetCode || '-'}
                    </td>
                    <td className="py-4">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                          user.userRole === 1
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {user.userRole === 1 ? '管理员' : '普通用户'}
                      </span>
                    </td>
                    <td className="py-4">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                          user.userStatus === 0
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {user.userStatus === 0 ? '正常' : '禁用'}
                      </span>
                    </td>
                    <td className="py-4 text-sm text-text-secondary">
                      {new Date(user.createTime).toLocaleDateString('zh-CN')}
                    </td>
                    {isAdmin && (
                      <td className="py-4">
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(user.id)}
                          disabled={user.id === currentUser?.id}
                        >
                          删除
                        </Button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
