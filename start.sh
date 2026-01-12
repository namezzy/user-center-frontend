#!/bin/bash

echo "========================================"
echo "  用户中心前端 - 快速启动"
echo "========================================"
echo ""

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装"
    echo "   请访问: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js 版本: $(node --version)"
echo "✅ npm 版本: $(npm --version)"
echo ""

# 检查是否已安装依赖
if [ ! -d "node_modules" ]; then
    echo "📦 安装依赖中..."
    npm install
    echo ""
fi

# 检查环境变量
if [ ! -f ".env.local" ]; then
    echo "⚠️  未找到 .env.local 文件"
    echo "   正在创建默认配置..."
    echo "NEXT_PUBLIC_API_URL=http://localhost:8080/api" > .env.local
    echo "✅ 已创建 .env.local"
    echo ""
fi

# 显示配置
echo "📋 当前配置:"
cat .env.local
echo ""

echo "🚀 启动开发服务器..."
echo "   前端地址: http://localhost:3000"
echo "   后端地址: http://localhost:8080"
echo ""
echo "   按 Ctrl+C 停止服务"
echo "========================================"
echo ""

npm run dev
