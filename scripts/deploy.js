#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 Starting deployment process...');

// 1. Run unified build
console.log('\n📦 Running unified build...');
execSync('node scripts/build.js', { stdio: 'inherit', cwd: path.join(__dirname, '..') });

// 2. Deploy to GitHub Pages
console.log('\n🌐 Deploying to GitHub Pages...');
process.chdir(path.join(__dirname, '..'));
execSync('npx hexo deploy', { stdio: 'inherit' });

console.log('\n✅ Deployment completed successfully!');
