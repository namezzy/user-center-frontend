'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { authApi } from '@/lib/api/auth';
import { toast } from '@/components/ui/Toast';
import type { RegisterRequest } from '@/types';

const registerSchema = yup.object({
  userAccount: yup
    .string()
    .required('请输入账号')
    .min(4, '账号不能少于4位')
    .matches(/^[a-zA-Z0-9_]+$/, '账号只能包含字母、数字和下划线'),
  userPassword: yup
    .string()
    .required('请输入密码')
    .min(8, '密码不能少于8位'),
  checkPassword: yup
    .string()
    .required('请确认密码')
    .oneOf([yup.ref('userPassword')], '两次密码不一致'),
  planetCode: yup
    .string()
    .required('请输入星球编号')
    .max(5, '星球编号不能超过5位'),
});

export default function RegisterForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequest>({
    resolver: yupResolver(registerSchema),
  });

  const registerMutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: (response) => {
      if (response.code === 0) {
        toast.success('注册成功！请登录');
        setTimeout(() => {
          router.push('/');
        }, 1500);
      } else {
        toast.error(response.message || '注册失败');
      }
    },
    onError: (error: any) => {
      toast.error(error.message || '注册失败，请稍后重试');
    },
  });

  const onSubmit = (data: RegisterRequest) => {
    registerMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Input
        label="账号"
        placeholder="请输入账号 (至少4位，仅支持字母数字下划线)"
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

      <Input
        label="确认密码"
        type="password"
        placeholder="请再次输入密码"
        {...register('checkPassword')}
        error={errors.checkPassword?.message}
        required
      />

      <Input
        label="星球编号"
        placeholder="请输入星球编号 (不超过5位)"
        {...register('planetCode')}
        error={errors.planetCode?.message}
        required
      />

      <Button
        type="submit"
        className="w-full"
        size="lg"
        isLoading={registerMutation.isPending}
      >
        注册
      </Button>
    </form>
  );
}
