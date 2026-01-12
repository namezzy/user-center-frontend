# Docker 部署指南

## 🐳 快速部署

### 一键部署

```bash
./deploy-docker.sh
```

### 手动部署

```bash
# 构建并启动
docker-compose up -d --build

# 查看日志
docker-compose logs -f frontend

# 停止服务
docker-compose down
```

## 📦 Docker 镜像

### 构建镜像

```bash
docker build -t user-center-frontend:latest .
```

### 运行容器

```bash
docker run -d \
  -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=http://localhost:8080/api \
  --name user-center-frontend \
  user-center-frontend:latest
```

## ⚙️ 环境变量配置

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `NEXT_PUBLIC_API_URL` | 后端 API 地址 | `http://localhost:8080/api` |
| `PORT` | 前端端口 | `3000` |

## 🔧 Docker Compose 配置

### docker-compose.yml

```yaml
version: '3.8'

services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: user-center-frontend
    restart: always
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_API_URL=http://localhost:8080/api
    networks:
      - user-center-network

networks:
  user-center-network:
    driver: bridge
```

### 与后端联合部署

如果需要同时部署前后端，可以创建一个统一的 docker-compose.yml：

```yaml
version: '3.8'

services:
  # MySQL 数据库
  mysql:
    image: mysql:8.0
    container_name: user-center-mysql
    environment:
      MYSQL_ROOT_PASSWORD: admin@123321
      MYSQL_DATABASE: levi
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
    networks:
      - user-center-network

  # Redis 缓存
  redis:
    image: redis:7-alpine
    container_name: user-center-redis
    ports:
      - "6379:6379"
    networks:
      - user-center-network

  # Go 后端
  backend:
    image: user-center-backend:latest
    container_name: user-center-backend
    ports:
      - "8080:8080"
    depends_on:
      - mysql
      - redis
    networks:
      - user-center-network

  # Next.js 前端
  frontend:
    image: user-center-frontend:latest
    container_name: user-center-frontend
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:8080/api
    depends_on:
      - backend
    networks:
      - user-center-network

volumes:
  mysql_data:

networks:
  user-center-network:
    driver: bridge
```

## 🚀 生产环境部署

### Nginx 反向代理

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # 前端
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # 后端 API
    location /api {
        proxy_pass http://localhost:8080/api;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

### HTTPS 配置

使用 Let's Encrypt：

```bash
# 安装 certbot
apt-get install certbot python3-certbot-nginx

# 获取证书
certbot --nginx -d yourdomain.com

# 自动续期
certbot renew --dry-run
```

## 📊 健康检查

### 容器健康检查

在 Dockerfile 中添加：

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=30s --retries=3 \
  CMD curl -f http://localhost:3000/ || exit 1
```

### 检查服务状态

```bash
# 查看容器状态
docker ps

# 查看健康状态
docker inspect --format='{{.State.Health.Status}}' user-center-frontend

# 查看日志
docker logs user-center-frontend
```

## 🔍 故障排查

### 1. 容器无法启动

```bash
# 查看详细日志
docker-compose logs frontend

# 检查配置
docker-compose config
```

### 2. 无法连接后端

- 检查 `NEXT_PUBLIC_API_URL` 环境变量
- 确认后端服务运行正常
- 检查网络配置

### 3. 页面空白

```bash
# 进入容器检查
docker exec -it user-center-frontend sh

# 检查构建输出
ls -la .next/
```

## 📈 性能优化

### 多阶段构建

Dockerfile 已使用多阶段构建：

- **Builder 阶段**: 安装依赖并构建
- **Runner 阶段**: 仅复制必要文件运行

### 镜像大小优化

```bash
# 查看镜像大小
docker images | grep user-center-frontend

# 预期大小: ~150MB
```

## 🔄 更新部署

```bash
# 拉取最新代码
git pull origin main

# 重新构建并部署
docker-compose up -d --build

# 清理旧镜像
docker image prune -f
```

## 📚 相关命令

```bash
# 查看容器
docker ps -a

# 查看日志
docker-compose logs -f

# 重启服务
docker-compose restart

# 停止服务
docker-compose down

# 清理数据
docker-compose down -v

# 进入容器
docker exec -it user-center-frontend sh
```

## 🔗 相关链接

- Docker 官网: https://www.docker.com/
- Docker Compose 文档: https://docs.docker.com/compose/
- Next.js Docker 部署: https://nextjs.org/docs/deployment#docker-image
