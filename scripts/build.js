#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting unified build process...');

// 1. Build Next.js project
console.log('\n📦 Building Next.js project...');
process.chdir(path.join(__dirname, '../learn_opencode/web'));
execSync('npm install', { stdio: 'inherit' });
execSync('npm run build', { stdio: 'inherit' });

// 2. Clean old build output
console.log('\n🧹 Cleaning old build output...');
const hexoSource = path.join(__dirname, '../source/learn_opencode');
if (fs.existsSync(hexoSource)) {
  fs.rmSync(hexoSource, { recursive: true, force: true });
}

// 3. Copy build output to Hexo source
console.log('\n📋 Copying build output to Hexo source...');
fs.mkdirSync(hexoSource, { recursive: true });
fs.cpSync(path.join(__dirname, '../learn_opencode/web/out'), hexoSource, { recursive: true });

// 4. Add root redirect
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

// 5. Build Hexo blog
console.log('\n🏗️  Building Hexo blog...');
process.chdir(path.join(__dirname, '..'));
execSync('npm install', { stdio: 'inherit' });
execSync('npx hexo clean', { stdio: 'inherit' });
execSync('npx hexo generate', { stdio: 'inherit' });

console.log('\n✅ Build completed successfully!');
