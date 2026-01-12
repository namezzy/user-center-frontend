import Link from 'next/link';
import RegisterForm from '@/components/forms/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 via-white to-pink-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="rounded-xl bg-white p-8 shadow-card">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-text-primary">
              创建账号
            </h1>
            <p className="mt-2 text-text-secondary">
              填写信息开始使用
            </p>
          </div>

          <RegisterForm />

          <div className="mt-6 text-center text-sm text-text-secondary">
            已有账号？{' '}
            <Link
              href="/"
              className="font-medium text-primary hover:text-primary-hover transition-colors"
            >
              立即登录
            </Link>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-text-secondary">
          © 2026 用户中心. All rights reserved.
        </p>
      </div>
    </div>
  );
}
