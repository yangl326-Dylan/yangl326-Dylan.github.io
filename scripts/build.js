#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting unified build process...');

// 1. Build Next.js projects
console.log('\n📦 Building Next.js projects...');

// Build learn_opencode
console.log('\n  Building learn_opencode...');
process.chdir(path.join(__dirname, '../learn_opencode/web'));
execSync('npm install', { stdio: 'inherit' });
execSync('npm run build', { stdio: 'inherit' });

// Build learn_harness
console.log('\n  Building learn_harness...');
process.chdir(path.join(__dirname, '../learn_harness/web'));
execSync('npm install', { stdio: 'inherit' });
execSync('npm run build', { stdio: 'inherit' });

// 2. Clean old build output
console.log('\n🧹 Cleaning old build output...');
const hexoSourceOC = path.join(__dirname, '../source/learn_opencode');
const hexoSourceDH = path.join(__dirname, '../source/learn_harness');
if (fs.existsSync(hexoSourceOC)) {
  fs.rmSync(hexoSourceOC, { recursive: true, force: true });
}
if (fs.existsSync(hexoSourceDH)) {
  fs.rmSync(hexoSourceDH, { recursive: true, force: true });
}

// 3. Copy build output to Hexo source
console.log('\n📋 Copying build output to Hexo source...');
fs.mkdirSync(hexoSourceOC, { recursive: true });
fs.cpSync(path.join(__dirname, '../learn_opencode/web/out'), hexoSourceOC, { recursive: true });
fs.mkdirSync(hexoSourceDH, { recursive: true });
fs.cpSync(path.join(__dirname, '../learn_harness/web/out'), hexoSourceDH, { recursive: true });

// 4. Add root redirects
console.log('\n🔄 Adding root redirects...');
const redirectHtmlOC = `<!DOCTYPE html>
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
fs.writeFileSync(path.join(hexoSourceOC, 'index.html'), redirectHtmlOC);

const redirectHtmlDH = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="refresh" content="0; url=/learn_harness/zh/">
  <title>Redirecting...</title>
</head>
<body>
  <p>Redirecting to <a href="/learn_harness/zh/">/learn_harness/zh/</a>...</p>
</body>
</html>`;
fs.writeFileSync(path.join(hexoSourceDH, 'index.html'), redirectHtmlDH);

// 5. Build Hexo blog
console.log('\n🏗️  Building Hexo blog...');
process.chdir(path.join(__dirname, '..'));
execSync('npm install', { stdio: 'inherit' });
execSync('npx hexo clean', { stdio: 'inherit' });
execSync('npx hexo generate', { stdio: 'inherit' });

// 6. Add .nojekyll to prevent GitHub Pages Jekyll from ignoring _next/ directories
console.log('\n📄 Adding .nojekyll for GitHub Pages...');
fs.writeFileSync(path.join(__dirname, '../public/.nojekyll'), '');

console.log('\n✅ Build completed successfully!');
