# 用户中心 - 前端项目

基于 **React + TypeScript + Next.js 15** 构建的现代化用户中心前端应用。

## ✨ 技术栈

- **框架**: Next.js 15 (App Router) + React 19
- **语言**: TypeScript 5
- **样式**: Tailwind CSS 4 + CSS Variables + HeadlessUI
- **表单**: React Hook Form + Yup
- **状态管理**: Zustand + Immer
- **异步状态**: TanStack Query (React Query)
- **HTTP 客户端**: Axios
- **浮动定位**: Floating UI

## 🚀 功能特性

- ✅ 用户注册 / 登录 / 登出
- ✅ Session 会话管理
- ✅ 用户信息展示
- ✅ 用户搜索和管理
- ✅ 角色权限控制 (管理员/普通用户)
- ✅ 响应式设计
- ✅ 深色模式支持
- ✅ Toast 消息通知
- ✅ 表单验证
- ✅ Loading 状态处理

## 📦 快速开始

### 方式一：Docker 部署（推荐）

```bash
# 一键部署
./deploy-docker.sh

# 或手动部署
docker-compose up -d --build
```

访问 [http://localhost:3000](http://localhost:3000)

### 方式二：本地开发

#### 1. 安装依赖

\`\`\`bash
npm install
# 或
yarn install
# 或
pnpm install
\`\`\`

### 2. 配置环境变量

复制 \`.env.local.example\` 为 \`.env.local\`:

\`\`\`bash
cp .env.local.example .env.local
\`\`\`

修改 API 地址（如果需要）:

\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
\`\`\`

### 3. 启动开发服务器

\`\`\`bash
npm run dev
\`\`\`

访问 [http://localhost:3000](http://localhost:3000)

### 4. 构建生产版本

\`\`\`bash
npm run build
npm run start
\`\`\`

## 📁 项目结构

\`\`\`
user-center-frontend/
├── app/                      # Next.js App Router 页面
│   ├── dashboard/           # 控制台页面
│   │   ├── users/          # 用户管理
│   │   ├── layout.tsx      # Dashboard 布局
│   │   └── page.tsx        # Dashboard 首页
│   ├── register/           # 注册页面
│   ├── globals.css         # 全局样式 (CSS Variables)
│   ├── layout.tsx          # 根布局
│   └── page.tsx            # 登录页面
├── components/              # React 组件
│   ├── forms/              # 表单组件
│   │   ├── LoginForm.tsx
│   │   └── RegisterForm.tsx
│   └── ui/                 # UI 组件
│       ├── Button.tsx
│       ├── Input.tsx
│       └── Toast.tsx
├── lib/                     # 工具函数和配置
│   ├── api/                # API 接口
│   │   ├── auth.ts
│   │   └── user.ts
│   ├── axios.ts            # Axios 配置
│   ├── cn.ts               # ClassNames 工具
│   └── react-query.tsx     # React Query Provider
├── store/                   # Zustand 状态管理
│   └── auth-store.ts       # 认证状态
├── types/                   # TypeScript 类型
│   └── index.ts
├── public/                  # 静态资源
├── .env.local.example      # 环境变量示例
├── tailwind.config.ts      # Tailwind 配置
├── tsconfig.json           # TypeScript 配置
└── package.json
\`\`\`

## 🎨 设计特点

### CSS Variables 主题系统

项目使用 CSS Variables 实现主题系统，支持深色模式：

\`\`\`css
:root {
  --color-primary: #6366f1;
  --color-primary-hover: #4f46e5;
  --color-bg-primary: #ffffff;
  /* ... */
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-bg-primary: #0f172a;
    /* ... */
  }
}
\`\`\`

### 组件设计原则

- **可复用**: 所有 UI 组件高度抽象和可配置
- **类型安全**: 完整的 TypeScript 类型定义
- **无障碍**: 符合 WCAG 无障碍标准
- **响应式**: 移动端优先的响应式设计

## 🔌 API 接口

项目连接到 Go 后端 API:

| 接口 | 方法 | 说明 |
|------|------|------|
| `/user/register` | POST | 用户注册 |
| `/user/login` | POST | 用户登录 |
| `/user/logout` | POST | 用户登出 |
| `/user/current` | GET | 获取当前用户信息 |
| `/user/search` | GET | 搜索用户 |
| `/user/delete` | POST | 删除用户 |

## 📝 使用说明

### 1. 用户注册

- 账号: 至少 4 位，仅支持字母、数字、下划线
- 密码: 至少 8 位
- 星球编号: 不超过 5 位

### 2. 用户登录

使用注册的账号和密码登录系统。

### 3. 用户管理

管理员可以：
- 搜索用户
- 查看用户详情
- 删除用户（不能删除自己）

## 🛠️ 开发建议

### 表单验证

使用 Yup Schema 定义验证规则：

\`\`\`typescript
const schema = yup.object({
  userAccount: yup
    .string()
    .required('请输入账号')
    .min(4, '账号不能少于4位'),
});
\`\`\`

### 状态管理

使用 Zustand + Immer 管理全局状态：

\`\`\`typescript
const useAuthStore = create<AuthState>()(
  immer((set) => ({
    user: null,
    setUser: (user) => set((state) => {
      state.user = user;
    }),
  }))
);
\`\`\`

### API 调用

使用 TanStack Query 管理异步状态：

\`\`\`typescript
const { data, isLoading } = useQuery({
  queryKey: ['users'],
  queryFn: userApi.searchUsers,
});
\`\`\`

## 🌐 部署

### Vercel (推荐)

\`\`\`bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel
\`\`\`

### Docker

\`\`\`bash
# 构建镜像
docker build -t user-center-frontend .

# 运行容器
docker run -p 3000:3000 user-center-frontend
\`\`\`

## 📄 License

MIT

## 👨‍💻 作者

Created by namezzy

---

**注意**: 请确保后端服务已启动，默认地址为 \`http://localhost:8080\`
