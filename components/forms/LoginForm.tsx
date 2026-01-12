'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { authApi } from '@/lib/api/auth';
import { useAuthStore } from '@/store/auth-store';
import { toast } from '@/components/ui/Toast';
import type { LoginRequest } from '@/types';

const loginSchema = yup.object({
  userAccount: yup
    .string()
    .required('请输入账号')
    .min(4, '账号不能少于4位'),
  userPassword: yup
    .string()
    .required('请输入密码')
    .min(8, '密码不能少于8位'),
});

export default function LoginForm() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: yupResolver(loginSchema),
  });

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (response) => {
      if (response.code === 0) {
        setUser(response.data);
        toast.success('登录成功！');
        router.push('/dashboard');
      } else {
        toast.error(response.message || '登录失败');
      }
    },
    onError: (error: any) => {
      toast.error(error.message || '登录失败，请稍后重试');
    },
  });

  const onSubmit = (data: LoginRequest) => {
    loginMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Input
        label="账号"
        placeholder="请输入账号 (至少4位)"
        {...register('userAccount')}
        error={errors.userAccount?.message}
        required
      />

      <Input
        label="密码"
        type="password"
        placeholder="请输入密码 (至少8位)"
        {...register('userPassword')}
        error={errors.userPassword?.message}
        required
      />

      <Button
        type="submit"
        className="w-full"
        size="lg"
        isLoading={loginMutation.isPending}
      >
        登录
      </Button>
    </form>
  );
}
