# 用户中心前端 - 快速部署指南

## 🚀 本地开发（5分钟）

### 前提条件
- Node.js 18+ 已安装
- 后端服务运行在 `http://localhost:8080`

### 步骤

1. **安装依赖**
\`\`\`bash
npm install
\`\`\`

2. **配置环境变量**
\`\`\`bash
# 已创建 .env.local，默认配置：
# NEXT_PUBLIC_API_URL=http://localhost:8080/api
\`\`\`

3. **启动开发服务器**
\`\`\`bash
npm run dev
\`\`\`

4. **访问应用**
- 前端地址: http://localhost:3000
- 登录页面: http://localhost:3000
- 注册页面: http://localhost:3000/register

## 📦 Docker 部署

### 构建镜像
\`\`\`bash
docker build -t user-center-frontend .
\`\`\`

### 运行容器
\`\`\`bash
docker run -d \\
  -p 3000:3000 \\
  -e NEXT_PUBLIC_API_URL=http://localhost:8080/api \\
  --name user-center-frontend \\
  user-center-frontend
\`\`\`

## 🌐 生产环境部署

### Vercel (推荐)

1. 安装 Vercel CLI:
\`\`\`bash
npm i -g vercel
\`\`\`

2. 部署:
\`\`\`bash
vercel
\`\`\`

3. 配置环境变量:
- `NEXT_PUBLIC_API_URL`: 后端 API 地址

### 传统服务器

1. 构建项目:
\`\`\`bash
npm run build
\`\`\`

2. 启动生产服务器:
\`\`\`bash
npm run start
\`\`\`

3. 使用 PM2 持久化:
\`\`\`bash
npm install -g pm2
pm2 start npm --name "user-center-frontend" -- start
pm2 save
pm2 startup
\`\`\`

## 🔧 配置说明

### 环境变量

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `NEXT_PUBLIC_API_URL` | 后端 API 地址 | `http://localhost:8080/api` |

### 端口配置

前端默认运行在 **3000** 端口，可通过环境变量修改:

\`\`\`bash
PORT=4000 npm run dev
\`\`\`

## 📱 功能测试

### 1. 注册新用户
- 访问: http://localhost:3000/register
- 账号: testuser (至少4位)
- 密码: 12345678 (至少8位)
- 星球编号: 12345 (不超过5位)

### 2. 登录
- 访问: http://localhost:3000
- 使用注册的账号密码登录

### 3. 用户管理
- 访问: http://localhost:3000/dashboard/users
- 搜索用户、查看详情
- 管理员可删除用户

## ⚠️ 常见问题

### 1. 无法连接后端

**现象**: 登录/注册失败，提示网络错误

**解决**:
- 确认后端服务运行中: `docker ps | grep user-center`
- 检查 API 地址配置: `.env.local`
- 查看浏览器控制台网络请求

### 2. CORS 错误

**现象**: 浏览器控制台显示 CORS policy 错误

**解决**:
后端 Go 服务已配置 CORS，确保:
- 后端使用 `gin.Default()` 并配置了 CORS 中间件
- `withCredentials: true` 已在 axios 配置中启用

### 3. Session 丢失

**现象**: 刷新页面后需要重新登录

**解决**:
- 检查后端 Session 配置
- 确保 `withCredentials: true` 已启用
- 检查 Cookie 是否正确设置

## 🎨 自定义主题

修改 `app/globals.css` 中的 CSS Variables:

\`\`\`css
:root {
  --color-primary: #6366f1;  /* 主色调 */
  --color-primary-hover: #4f46e5;
  /* ... */
}
\`\`\`

## 📊 性能优化

- ✅ Next.js App Router (服务端渲染)
- ✅ 自动代码分割
- ✅ 图片优化 (next/image)
- ✅ React Query 缓存
- ✅ Tailwind CSS JIT

## 🔗 相关链接

- 后端项目: https://github.com/namezzy/usercenter-go
- Next.js 文档: https://nextjs.org/docs
- TanStack Query: https://tanstack.com/query
- Tailwind CSS: https://tailwindcss.com
