#!/bin/bash

echo "========================================"
echo "  用户中心前端 - Docker 部署"
echo "========================================"
echo ""

# 检查 Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker 未安装"
    echo "   请安装 Docker: https://docs.docker.com/get-docker/"
    exit 1
fi

echo "✅ Docker 版本: $(docker --version)"
echo ""

# 停止旧容器
if docker ps -a | grep -q user-center-frontend; then
    echo "🛑 停止旧容器..."
    docker-compose down
    echo ""
fi

# 构建镜像
echo "🔨 构建 Docker 镜像..."
docker-compose build --no-cache

if [ $? -ne 0 ]; then
    echo "❌ 构建失败"
    exit 1
fi

echo ""
echo "✅ 镜像构建成功"
echo ""

# 启动容器
echo "🚀 启动容器..."
docker-compose up -d

if [ $? -ne 0 ]; then
    echo "❌ 启动失败"
    exit 1
fi

echo ""
echo "✅ 部署完成！"
echo ""
echo "========================================"
echo "  访问地址"
echo "========================================"
echo "  前端: http://localhost:3000"
echo "  后端: http://localhost:8080"
echo ""
echo "========================================"
echo "  常用命令"
echo "========================================"
echo "  查看日志: docker-compose logs -f frontend"
echo "  停止服务: docker-compose down"
echo "  重启服务: docker-compose restart"
echo "========================================"
