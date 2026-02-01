# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal blog (lasse.be) built with Hugo using the PaperMod theme. Deployed to GitHub Pages via GitHub Actions on push to `main`.

## Commands

```bash
# Development server (includes drafts)
just serve

# Create new post (creates content/posts/<title>/index.md)
just post "my-post-title"

# Production build
just build

# Clean build artifacts
just clean
```

Requires Hugo installed (`brew install hugo`).

## Architecture

### Content Structure
- Posts use page bundles: `content/posts/<slug>/index.md` with images alongside
- Front matter supports: `title`, `date`, `draft`, `ai_summary`, `tags`
- Theme: PaperMod (submodule in `themes/PaperMod`)

### Custom Layouts
Layout overrides in `layouts/` extend PaperMod:
- `partials/comments.html` - Giscus comments integration
- `partials/newsletter_form.html` - Buttondown newsletter signup
- `partials/toc.html` - Custom table of contents with sidebar positioning
- `partials/header.html` - Modified header with progress bar

### Shortcodes
Custom shortcodes in `layouts/shortcodes/`:
- `accordion` - Collapsible sections with optional heading level: `{{% accordion title="Title" level="3" summary="..." %}}`
- `callout` - Styled callout boxes: `{{% callout type="info" title="Note" %}}`
- `pullquote` - Styled quotes with optional author attribution

### Static Assets
- Custom CSS in `static/css/` (referenced in `config.toml` via `customCSS`)
- Key styles: `custom.css`, `toc-sidebar.css`, `accordion.css`

### Deployment
GitHub Actions workflow (`.github/workflows/hugo-to-gh-pages.yml`) builds and deploys on push to `main`. Uses Hugo 0.146.0 extended.
