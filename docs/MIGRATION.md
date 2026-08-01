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
