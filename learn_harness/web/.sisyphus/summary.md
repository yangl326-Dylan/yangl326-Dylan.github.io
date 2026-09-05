# Summary: Learn OpenCode Site

## Goal
Build and enrich a bilingual static site "Learn OpenCode" that teaches opencode agent design through 10 progressive sessions, with comprehensive architecture diagrams and Claude Code comparisons.

## Constraints & Preferences
- Next.js 16 + Tailwind CSS v4, static export (`output: "export"`)
- Bilingual (zh/en), lightweight i18n Context Provider (no next-intl)
- Content based on actual opencode source code at `/Users/dylan/code/learn_opencode/opencode`
- Architecture informed by agent design patterns from learn.shareai.run
- Feature parity: comprehensive homepage architecture + per-session Claude Code comparison

## Progress
### Done
- Restructured `session-content.ts`: new `SessionContent` interface with `learnSections`, `designHighlights`, `flowchartSvg`, `annotatedCode` (line-by-line annotations + execution flow)
- Rewrote `session-detail.tsx`: merged Learn+Design into single "学习与设计"/"Learn & Design" tab; added flowchart rendering (dangerouslySetInnerHTML for inline SVGs); added CodeAnnotations component showing overview + line-by-line analysis + flow summary
- Wrote rich bilingual content for s01-s10: each session has 2 learn sections (problem + solution), 2 design highlights, inline SVG flowchart, and annotated code with 3-4 line annotations + flow summary
- SVG flowcharts for all 10 sessions: Agent Loop (circular flow), Tool Dispatch (TOOL_MAP table), Permission Gate (decision diamond with user prompt), Hook System (lifecycle hooks around core), Task Categories (routing tree to specialized configs), Subagent (main dispatching to oracle/explore/librarian), Skill Loading (3-tier priority chain), Plugin SDK (hooks API surface), Background Tasks (event bus + thread), Config & Session (global + project deepMerge)
- Comprehensive homepage architecture SVG: 5-layer system diagram (Platform → Extensibility → Planning → Concurrency → Core) showing 16+ component modules with cross-layer arrows and Claude Code comparison footer
- Redesigned `homepage page.tsx`: Architecture section (full SVG), Layer sections (interactive card grid), Claude Code comparison table (7 mechanisms compared), plus all original sections (Hero, Core Pattern, Learning Path)
- Explored opencode source code (`packages/opencode/src/`, `packages/core/src/`, `packages/plugin/src/`): identified agent system (Info schema with name/description/mode), permission system (wildcard patterns → allow/deny/ask), skill system (SKILL.md + priority chain), session processor (compaction/overflow), tool registry (ToolID schema), background jobs (event bus), plugin system (Hooks interface), config system (deepMerge of JSONC)
- Researched learn.shareai.run: found 20-session structure (s01-s20) with different scope (Context Compact, Memory, Error Recovery, Agent Teams, Worktree Isolation, MCP Tools — not in our 10 sessions)
- **Claude Code comparison sections added to all 10 sessions**: each session's Learn & Design tab now shows a "Comparison: Claude Code" section highlighting key differences between OpenCode and Claude Code mechanisms (tool loop, dispatch table, permission system, plugin SDK, task categorization, subagent delegation, skill loading, background jobs, config system)
- Cleaned up JSX comments from homepage page.tsx
- Fix: `annotatedCode` closing brace missing in claudeCodeComparison edits (all 10 sessions) — root cause identified and fixed
- TypeScript compilation: clean (`next build` succeeds)
- Next.js build: successful (26 static pages, all 200 OK)
- Dev server verified: all 26 routes serve 200

### In Progress
- (none)

### Blocked
- (none)

## Key Decisions
- Merged Learn+Design into single tab to reduce tab switching and show design decisions alongside architectural content
- Inline SVG strings for flowcharts (not React components) for portability and self-contained data files
- `dangerouslySetInnerHTML` for SVG rendering because SVGs are trusted static content, not user input
- Homepage architecture SVG shows 16+ modules across 5 layers (expanded from original 10 sessions) to match actual opencode source complexity
- Claude Code comparison rendered as a styled card in the Learn & Design tab, using a gradient background to visually distinguish it from learn sections
- Claude Code per-session comparison written in direct "vs" style (e.g., "OpenCode's TOOL_MAP vs Claude Code's tool registry", "Plugin SDK is unique to OpenCode")

## Next Steps
- Verify all 10 Claude Code comparison texts are accurate and informative
- Consider adding comparison to the homepage Claude Code section (currently a table of 7 mechanisms)
- Deploy or handoff for further content refinement

## Critical Context
- Project path: `/Users/dylan/code/learn_opencode/web/`
- opencode source path: `/Users/dylan/code/learn_opencode/opencode/`
- Web content file: `web/src/data/session-content.ts` (~1100 lines) — core content file with all writing
- `homepage page.tsx` now has 6 sections: Hero → Core Pattern → System Architecture → Layers → Claude Code Comparison → Learning Path
- `session-detail.tsx` renders: description, flowchart SVG, learn sections, design highlights, Claude Code comparison, code annotations

## Relevant Files
- `web/src/data/session-content.ts` — SessionContent interface and all 10 sessions' bilingual content
- `web/src/components/version/session-detail.tsx` — SessionDetail with merged "学习与设计"/"Learn & Design" tab
- `web/src/app/[locale]/page.tsx` — Homepage with architecture SVG, layer cards, Claude Code comparison
- `web/public/agent-loop.svg` — 5-layer architecture SVG
