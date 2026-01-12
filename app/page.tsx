import Link from 'next/link';
import LoginForm from '@/components/forms/LoginForm';

export default function HomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4">
      <div className="w-full max-w-md">
        <div className="rounded-xl bg-white p-8 shadow-card">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-text-primary">
              欢迎回来
            </h1>
            <p className="mt-2 text-text-secondary">
              登录您的账号以继续
            </p>
          </div>

          <LoginForm />

          <div className="mt-6 text-center text-sm text-text-secondary">
            还没有账号？{' '}
            <Link
              href="/register"
              className="font-medium text-primary hover:text-primary-hover transition-colors"
            >
              立即注册
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
