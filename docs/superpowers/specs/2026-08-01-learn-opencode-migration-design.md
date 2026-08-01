# Learn OpenCode 迁移设计文档

## 概述
将 Next.js 项目 "Learn OpenCode" 迁移到 Hexo 博客的 `/learn_opencode/` 子路径，采用完整集成 + basePath 重建方案。

## 目标
1. 将 Next.js 项目集成到 Hexo 博客仓库中
2. 在 `/learn_opencode/` 子路径下提供服务
3. 保留语言前缀（/en/，/zh/）
4. 自动化构建和部署流程
5. 依赖隔离（独立 node_modules）
6. 创建文档和测试验证

## 技术架构

### 现有系统
- **Hexo 博客**: Hexo 8.1.2，NexT 主题，部署到 GitHub Pages（blog.mai168.cn）
- **Next.js 项目**: Next.js 16.1.6，React 19，TypeScript，Tailwind CSS v4，支持 zh/en 双语

### 目标架构
```
/Users/dylan/blog/dylan326/
├── _config.yml          # Hexo 配置（需修改）
├── package.json         # 统一构建脚本
├── source/              # Hexo 内容
│   ├── _posts/          # 博客文章
│   ├── learn_opencode/  # Next.js 构建输出（动态生成）
│   └── ...
├── learn_opencode/      # Next.js 源代码（新目录）
│   └── web/             # Next.js 项目
├── scripts/             # 构建和部署脚本（新目录）
├── docs/                # 文档（新目录）
└── MIGRATION.md         # 迁移文档（新文件）
```

## 实施步骤

### 阶段 1：准备工作
1. 创建 Git 分支进行迁移工作
2. 将 learn_opencode/web 目录复制到博客仓库根目录
3. 确保 Next.js 项目可以独立构建

### 阶段 2：配置修改
1. 修改 `next.config.ts`，添加 `basePath: "/learn_opencode"`
2. 修改 Hexo `_config.yml`，添加 `skip_render: learn_opencode/**`
3. 更新根目录 `package.json`，添加构建脚本

### 阶段 3：构建流程集成
1. 创建 `scripts/build.js` 统一构建脚本
2. 创建 `scripts/deploy.js` 部署脚本
3. 测试构建流程

### 阶段 4：内容迁移
1. 运行构建，生成 Next.js 静态输出
2. 复制到 `source/learn_opencode/` 目录
3. 添加根路径重定向到 `/zh/`

### 阶段 5：测试验证
1. 本地测试 Hexo 服务器
2. 验证所有页面和资源正常加载
3. 测试语言切换和导航功能

### 阶段 6：文档和清理
1. 创建 `MIGRATION.md` 文档
2. 清理临时文件
3. 提交代码并部署

## 关键配置

### Next.js 配置修改
```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: "/learn_opencode",  // 新增
};

export default nextConfig;
```

### Hexo 配置修改
```yaml
# _config.yml
skip_render:
  - learn_opencode/**    # Next.js 构建输出
  - learn_opencode/*.html
  - learn_opencode/**/*.html
```

### 构建脚本
```javascript
// scripts/build.js
#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting unified build process...');

// 1. 构建 Next.js 项目
console.log('\n📦 Building Next.js project...');
process.chdir(path.join(__dirname, '../learn_opencode/web'));
execSync('npm install', { stdio: 'inherit' });
execSync('npm run build', { stdio: 'inherit' });

// 2. 清理旧的构建输出
console.log('\n🧹 Cleaning old build output...');
const hexoSource = path.join(__dirname, '../source/learn_opencode');
if (fs.existsSync(hexoSource)) {
  fs.rmSync(hexoSource, { recursive: true, force: true });
}

// 3. 复制构建输出到 Hexo source
console.log('\n📋 Copying build output to Hexo source...');
fs.mkdirSync(hexoSource, { recursive: true });
fs.cpSync(path.join(__dirname, '../learn_opencode/web/out'), hexoSource, { recursive: true });

// 4. 添加根路径重定向
console.log('\n🔄 Adding root redirect...');
const redirectHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="refresh" content="0; url=/learn_opencode/zh/">
  <title>Redirecting...</title>
</head>
<body>
  <p>Redirecting to <a href="/learn_opencode/zh/">/learn_opencode/zh/</a>...</p>
</body>
</html>`;
fs.writeFileSync(path.join(hexoSource, 'index.html'), redirectHtml);

// 5. 构建 Hexo 博客
console.log('\n🏗️  Building Hexo blog...');
process.chdir(path.join(__dirname, '..'));
execSync('npm install', { stdio: 'inherit' });
execSync('npx hexo clean', { stdio: 'inherit' });
execSync('npx hexo generate', { stdio: 'inherit' });

console.log('\n✅ Build completed successfully!');
```

## 风险和缓解措施

### 风险 1: Next.js 静态导出 basePath 兼容性
- **问题**: Next.js 16.0-16.1.x 存在静态导出 prefetch 404 bug
- **缓解**: 升级到 Next.js 16.2.x 或测试验证 16.1.6 是否正常工作

### 风险 2: Hexo 渲染冲突
- **问题**: Hexo 可能尝试渲染 Next.js 的 HTML 文件
- **缓解**: 正确配置 `skip_render` 规则

### 风险 3: 构建流程复杂性
- **问题**: 统一构建脚本可能出错
- **缓解**: 添加详细日志和错误处理

### 风险 4: 路径配置错误
- **问题**: basePath 配置错误导致资源 404
- **缓解**: 本地测试验证所有路径

## 成功标准
1. ✅ Next.js 项目可以在子路径 `/learn_opencode/` 下正常工作
2. ✅ 所有静态资源（CSS、JS、图片）正常加载
3. ✅ 语言切换（zh/en）正常工作
4. ✅ 统一构建脚本可以成功运行
5. ✅ 部署到 GitHub Pages 后站点正常访问
6. ✅ 文档完整清晰

## 时间估算
- 配置修改：1-2 小时
- 构建流程集成：2-3 小时
- 测试验证：1-2 小时
- 文档编写：1 小时
- **总计**: 5-8 小时

## 回滚策略
1. 使用 Git 分支进行迁移工作
2. 如果出现问题，可以轻松回滚到主分支
3. 备份当前 `source/` 目录和配置文件