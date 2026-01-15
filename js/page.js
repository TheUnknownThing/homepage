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

    // Wrap project sections (h3 + following content) in card divs
    function wrapProjectCards() {
        const container = document.querySelector('.markdown-content');
        if (!container) return;

        const children = Array.from(container.children);
        let currentCard = null;
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < children.length; i++) {
            const el = children[i];
            const tagName = el.tagName.toLowerCase();

            // Skip hr elements (they were separators, now cards provide separation)
            if (tagName === 'hr') {
                continue;
            }

            // H2 marks a section header - close current card and add h2 directly
            if (tagName === 'h2') {
                if (currentCard) {
                    fragment.appendChild(currentCard);
                    currentCard = null;
                }
                fragment.appendChild(el);
                continue;
            }

            // H3 starts a new project card
            if (tagName === 'h3') {
                if (currentCard) {
                    fragment.appendChild(currentCard);
                }
                currentCard = document.createElement('div');
                currentCard.className = 'project-card';
                currentCard.appendChild(el);
                continue;
            }

            // Other elements go into the current card or directly into fragment
            if (currentCard) {
                currentCard.appendChild(el);
            } else {
                fragment.appendChild(el);
            }
        }

        // Don't forget the last card
        if (currentCard) {
            fragment.appendChild(currentCard);
        }

        // Replace container content
        container.innerHTML = '';
        container.appendChild(fragment);
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
            
            // For projects page, wrap each project section in a card
            if (contentPath.includes('projects')) {
                wrapProjectCards();
            }
            
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
