/**
 * Page renderer for publications/projects pages
 * Loads markdown from content/ directory based on current page
 */

(function() {
    'use strict';

    // Theme Management (same as main.js)
    const ThemeManager = {
        init() {
            const saved = localStorage.getItem('theme-preference');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            this.setTheme(saved || (prefersDark ? 'dark' : 'light'));
            
            const btn = document.getElementById('themeToggle');
            if (btn) btn.addEventListener('click', () => this.toggle());
        },
        setTheme(theme) {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme-preference', theme);
        },
        toggle() {
            const current = document.documentElement.getAttribute('data-theme');
            this.setTheme(current === 'dark' ? 'light' : 'dark');
        }
    };

    // Determine content file from current page
    function getContentPath() {
        const page = window.location.pathname.split('/').pop().replace('.html', '');
        return `content/${page || 'profile'}.md`;
    }

    // Parse frontmatter
    function parseFrontmatter(content) {
        const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
        if (!match) return { metadata: {}, content };
        
        const metadata = {};
        match[1].split('\n').forEach(line => {
            const idx = line.indexOf(':');
            if (idx > 0) {
                metadata[line.substring(0, idx).trim()] = line.substring(idx + 1).trim();
            }
        });
        return { metadata, content: match[2] };
    }

    // Load and render content
    async function loadContent() {
        const contentPath = getContentPath();
        
        try {
            const response = await fetch(contentPath);
            if (!response.ok) throw new Error('Not found');
            
            const raw = await response.text();
            const { metadata, content } = parseFrontmatter(raw);
            
            // Set page title
            if (metadata.title) {
                document.title = metadata.title;
            }
            
            // Render markdown
            marked.setOptions({ breaks: true, gfm: true });
            const html = marked.parse(content);
            
            // Build page header if title exists
            let pageHtml = '';
            if (metadata.title) {
                pageHtml += `<h1 class="page-title">${metadata.title}</h1>`;
            }
            if (metadata.description) {
                pageHtml += `<p class="page-description">${metadata.description}</p>`;
            }
            
            document.getElementById('pageContent').innerHTML = pageHtml + `<div class="markdown-content">${html}</div>`;
            
            // Set last updated
            if (metadata.updated) {
                document.getElementById('lastUpdated').textContent = metadata.updated;
            }
            
        } catch (e) {
            console.error(e);
            document.getElementById('pageContent').innerHTML = `
                <div class="loading">
                    <p>Content not found.<br><small>Create <code>${contentPath}</code> to add content.</small></p>
                </div>
            `;
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        ThemeManager.init();
        loadContent();
    });
})();
