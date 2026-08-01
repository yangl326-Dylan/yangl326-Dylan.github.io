# Learn OpenCode Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the Next.js "Learn OpenCode" project into the Hexo blog repository as a subpath at `/learn_opencode/`, with automated build and deployment.

**Architecture:** Integrate the Next.js project into the Hexo blog repository, configure basePath for subpath deployment, create unified build scripts, and set up automated deployment to GitHub Pages.

**Tech Stack:** Next.js 16.1.6, React 19, TypeScript, Tailwind CSS v4, Hexo 8.1.2, NexT theme, GitHub Pages.

---

## File Structure

Before defining tasks, here's the target file structure:

```
/Users/dylan/blog/dylan326/
├── _config.yml          # Hexo config (modified)
├── _config.next.yml     # NexT theme config (unchanged)
├── package.json         # Updated with build scripts
├── source/              # Hexo content
│   ├── _posts/          # Blog posts (unchanged)
│   ├── learn_opencode/  # Next.js build output (generated)
│   └── ...
├── learn_opencode/      # Next.js source (new)
│   └── web/             # Next.js project (copied from /Users/dylan/code/learn_opencode/web)
├── scripts/             # Build and deploy scripts (new)
│   ├── build.js         # Unified build script
│   └── deploy.js        # Deployment script
├── docs/                # Documentation (new)
│   ├── superpowers/
│   │   ├── specs/       # Design spec
│   │   └── plans/       # This plan
│   └── MIGRATION.md     # Migration guide
└── .gitignore           # Updated to ignore generated files
```

## Task 1: Create Git Branch for Migration

**Files:**
- None (git operation only)

- [ ] **Step 1: Check current git status**

Run: `git status`
Expected: On branch main (or master), working tree clean

- [ ] **Step 2: Create and switch to migration branch**

Run: `git checkout -b feat/learn-opencode-migration`
Expected: Switched to a new branch 'feat/learn-opencode-migration'

- [ ] **Step 3: Verify branch creation**

Run: `git branch --show-current`
Expected: feat/learn-opencode-migration

## Task 2: Copy Next.js Project to Blog Repository

**Files:**
- Create: `learn_opencode/web/` (entire directory)

- [ ] **Step 1: Create target directory**

Run: `mkdir -p learn_opencode`
Expected: Directory created

- [ ] **Step 2: Copy Next.js project**

Run: `cp -r /Users/dylan/code/learn_opencode/web learn_opencode/`
Expected: Files copied

- [ ] **Step 3: Verify copy**

Run: `ls -la learn_opencode/web/`
Expected: Shows package.json, next.config.ts, src/, etc.

- [ ] **Step 4: Test Next.js project builds independently**

Run: `cd learn_opencode/web && npm install && npm run build`
Expected: Build succeeds, out/ directory created

- [ ] **Step 5: Commit the copied project**

Run: `git add learn_opencode/ && git commit -m "feat: copy Next.js project to blog repository"`

## Task 3: Modify Next.js Configuration for Subpath

**Files:**
- Modify: `learn_opencode/web/next.config.ts`

- [ ] **Step 1: Read current next.config.ts**

Run: `cat learn_opencode/web/next.config.ts`
Expected content:
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
```

- [ ] **Step 2: Add basePath configuration**

Edit `learn_opencode/web/next.config.ts` to add basePath:
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: "/learn_opencode",  // Add this line
};

export default nextConfig;
```

- [ ] **Step 3: Test build with basePath**

Run: `cd learn_opencode/web && npm run build`
Expected: Build succeeds, out/ directory contains files with `/learn_opencode/` prefix

- [ ] **Step 4: Verify asset paths in generated HTML**

Run: `grep -r "/learn_opencode/" learn_opencode/web/out/`
Expected: Shows paths like `/learn_opencode/_next/static/...`, `/learn_opencode/en/`, etc.

- [ ] **Step 5: Commit configuration change**

Run: `git add learn_opencode/web/next.config.ts && git commit -m "feat: add basePath for subpath deployment"`

## Task 4: Update Hexo Configuration

**Files:**
- Modify: `_config.yml`

- [ ] **Step 1: Read current _config.yml**

Run: `cat _config.yml`
Expected: Shows current Hexo configuration

- [ ] **Step 2: Add skip_render rule**

Edit `_config.yml` to add skip_render rule (add after `skip_render:` line):
```yaml
skip_render:
  - learn_opencode/**    # Next.js build output
  - learn_opencode/*.html
  - learn_opencode/**/*.html
```

- [ ] **Step 3: Verify configuration**

Run: `grep -A 5 "skip_render:" _config.yml`
Expected: Shows the skip_render rules

- [ ] **Step 4: Commit configuration change**

Run: `git add _config.yml && git commit -m "feat: add skip_render for Next.js output"`

## Task 5: Update Package.json with Build Scripts

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Read current package.json**

Run: `cat package.json`
Expected: Shows current dependencies and scripts

- [ ] **Step 2: Add build scripts**

Edit `package.json` to add scripts section (if not present) or update existing scripts:
```json
{
  "name": "hexo-site",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "build": "node scripts/build.js",
    "deploy": "node scripts/deploy.js",
    "build:next": "cd learn_opencode/web && npm install && npm run build",
    "build:hexo": "npx hexo clean && npx hexo generate",
    "clean": "npx hexo clean && rm -rf source/learn_opencode",
    "server": "npx hexo server"
  },
  "dependencies": {
    // ... existing dependencies
  }
}
```

- [ ] **Step 3: Verify scripts**

Run: `npm run --list`
Expected: Shows the new scripts

- [ ] **Step 4: Commit package.json changes**

Run: `git add package.json && git commit -m "feat: add unified build scripts"`

## Task 6: Create Unified Build Script

**Files:**
- Create: `scripts/build.js`

- [ ] **Step 1: Create scripts directory**

Run: `mkdir -p scripts`
Expected: Directory created

- [ ] **Step 2: Create build.js script**

Create `scripts/build.js` with the following content:
```javascript
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
```

- [ ] **Step 3: Make script executable**

Run: `chmod +x scripts/build.js`
Expected: Script is executable

- [ ] **Step 4: Test build script**

Run: `node scripts/build.js`
Expected: Build completes successfully, source/learn_opencode/ directory created

- [ ] **Step 5: Commit build script**

Run: `git add scripts/build.js && git commit -m "feat: add unified build script"`

## Task 7: Create Deployment Script

**Files:**
- Create: `scripts/deploy.js`

- [ ] **Step 1: Create deploy.js script**

Create `scripts/deploy.js` with the following content:
```javascript
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
```

- [ ] **Step 2: Make script executable**

Run: `chmod +x scripts/deploy.js`
Expected: Script is executable

- [ ] **Step 3: Commit deploy script**

Run: `git add scripts/deploy.js && git commit -m "feat: add deployment script"`

## Task 8: Update .gitignore

**Files:**
- Modify: `.gitignore`

- [ ] **Step 1: Read current .gitignore**

Run: `cat .gitignore`
Expected: Shows current ignore rules

- [ ] **Step 2: Add ignore rules for generated files**

Edit `.gitignore` to add:
```
# Learn OpenCode generated files
source/learn_opencode/
learn_opencode/web/out/
learn_opencode/web/.next/
learn_opencode/web/node_modules/
```

- [ ] **Step 3: Commit .gitignore changes**

Run: `git add .gitignore && git commit -m "feat: update .gitignore for Next.js output"`

## Task 9: Create Migration Documentation

**Files:**
- Create: `docs/MIGRATION.md`

- [ ] **Step 1: Create docs directory**

Run: `mkdir -p docs`
Expected: Directory created

- [ ] **Step 2: Create MIGRATION.md**

Create `docs/MIGRATION.md` with the following content:
```markdown
# Learn OpenCode Migration Documentation

## Overview
This document describes the migration of the Next.js "Learn OpenCode" project into the Hexo blog repository as a subpath at `/learn_opencode/`.

## Architecture
- **Next.js Project**: Static export site with React 19, TypeScript, Tailwind CSS v4
- **Hexo Blog**: Hexo 8.1.2 with NexT theme, deployed to GitHub Pages
- **Deployment**: Manual via `npm run deploy` or `node scripts/deploy.js`

## Directory Structure
- `learn_opencode/web/` - Next.js source code
- `source/learn_opencode/` - Next.js build output (generated)
- `scripts/` - Build and deployment scripts

## Build Process
1. **Unified Build**: `npm run build` or `node scripts/build.js`
   - Builds Next.js project
   - Copies output to `source/learn_opencode/`
   - Adds root redirect to `/zh/`
   - Builds Hexo blog

2. **Deployment**: `npm run deploy` or `node scripts/deploy.js`
   - Runs unified build
   - Deploys to GitHub Pages via `hexo deploy`

## Configuration Changes
1. **Next.js**: Added `basePath: "/learn_opencode"` to `next.config.ts`
2. **Hexo**: Added `skip_render: learn_opencode/**` to `_config.yml`
3. **Package.json**: Added build and deploy scripts

## Testing
1. **Local Testing**:
   ```bash
   npm run build
   npx hexo server
   # Visit http://localhost:4000/learn_opencode/zh/
   ```

2. **Verification Checklist**:
   - [ ] Next.js builds successfully
   - [ ] Files copied to `source/learn_opencode/`
   - [ ] Hexo builds successfully
   - [ ] Subpath `/learn_opencode/zh/` accessible
   - [ ] Subpath `/learn_opencode/en/` accessible
   - [ ] All static resources load correctly
   - [ ] Language switching works
   - [ ] 404 page works
   - [ ] Dark mode works

## Troubleshooting
- **Build fails**: Check Node.js version (requires 20.9+ for Next.js 16)
- **Hexo rendering errors**: Verify `skip_render` configuration
- **404 errors**: Check `basePath` configuration in `next.config.ts`
- **Asset loading issues**: Verify paths in generated HTML

## Rollback Strategy
1. Use Git branch for migration work
2. If issues occur, switch back to main branch:
   ```bash
   git checkout main
   ```
3. Backup current `source/` directory and configuration files

## Future Maintenance
- **Updates**: Run `npm run build` after modifying Next.js project
- **Deployment**: Run `npm run deploy` to deploy changes
- **Monitoring**: Check GitHub Pages status after deployment
```

- [ ] **Step 3: Commit documentation**

Run: `git add docs/MIGRATION.md && git commit -m "docs: add migration documentation"`

## Task 10: Test Complete Migration

**Files:**
- None (testing only)

- [ ] **Step 1: Run unified build**

Run: `npm run build`
Expected: Build completes successfully

- [ ] **Step 2: Start Hexo server**

Run: `npx hexo server`
Expected: Server starts on http://localhost:4000/

- [ ] **Step 3: Test main blog**

Visit: http://localhost:4000/
Expected: Blog loads correctly

- [ ] **Step 4: Test Chinese version**

Visit: http://localhost:4000/learn_opencode/zh/
Expected: Learn OpenCode site loads in Chinese

- [ ] **Step 5: Test English version**

Visit: http://localhost:4000/learn_opencode/en/
Expected: Learn OpenCode site loads in English

- [ ] **Step 6: Test navigation**

Click through different pages in Learn OpenCode site
Expected: All pages load correctly

- [ ] **Step 7: Test language switching**

Switch between Chinese and English
Expected: Language changes correctly

- [ ] **Step 8: Test 404 page**

Visit: http://localhost:4000/learn_opencode/nonexistent
Expected: 404 page displays

- [ ] **Step 9: Stop Hexo server**

Press Ctrl+C in terminal
Expected: Server stops

- [ ] **Step 10: Commit test results**

Run: `git add . && git commit -m "test: verify complete migration"`

## Task 11: Final Deployment Preparation

**Files:**
- None (preparation only)

- [ ] **Step 1: Review all changes**

Run: `git log --oneline -10`
Expected: Shows all commits from migration

- [ ] **Step 2: Check for uncommitted changes**

Run: `git status`
Expected: Working tree clean

- [ ] **Step 3: Push branch to remote**

Run: `git push -u origin feat/learn-opencode-migration`
Expected: Branch pushed to remote

- [ ] **Step 4: Create pull request**

Run: `gh pr create --title "feat: migrate Learn OpenCode to Hexo blog" --body "Migrates Next.js project to Hexo blog as subpath at /learn_opencode/"`
Expected: Pull request created

- [ ] **Step 5: Wait for CI checks**

Run: `gh pr checks`
Expected: All checks pass

- [ ] **Step 6: Merge pull request**

Run: `gh pr merge --merge`
Expected: Pull request merged to main

- [ ] **Step 7: Deploy to production**

Run: `git checkout main && git pull && npm run deploy`
Expected: Site deployed to GitHub Pages

- [ ] **Step 8: Verify production deployment**

Visit: https://blog.mai168.cn/learn_opencode/zh/
Expected: Site loads correctly in production

## Completion

All tasks completed. The Next.js "Learn OpenCode" project is now integrated into the Hexo blog as a subpath at `/learn_opencode/`, with automated build and deployment.