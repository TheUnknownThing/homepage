/**
 * Academic Homepage - Main JavaScript
 * Handles Markdown parsing, theme toggling, and content rendering
 */

(function() {
    'use strict';

    const CONFIG = {
        contentPath: 'content/profile.md',
        storageKey: 'theme-preference'
    };

    // ================================================
    // Theme Management
    // ================================================
    const ThemeManager = {
        storageAvailable: (function() {
            try {
                localStorage.setItem('__test__', '__test__');
                localStorage.removeItem('__test__');
                return true;
            } catch (e) {
                return false;
            }
        })(),

        init() {
            let savedTheme = null;
            if (this.storageAvailable) {
                savedTheme = localStorage.getItem(CONFIG.storageKey);
            }
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const theme = savedTheme || (prefersDark ? 'dark' : 'light');
            this.setTheme(theme);
            this.bindToggle();
            
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (!this.storageAvailable || !localStorage.getItem(CONFIG.storageKey)) {
                    this.setTheme(e.matches ? 'dark' : 'light');
                }
            });
        },

        setTheme(theme) {
            document.documentElement.setAttribute('data-theme', theme);
            if (this.storageAvailable) {
                try {
                    localStorage.setItem(CONFIG.storageKey, theme);
                } catch (e) {
                    // Storage unavailable, theme won't persist
                }
            }
        },

        toggle() {
            const current = document.documentElement.getAttribute('data-theme');
            this.setTheme(current === 'dark' ? 'light' : 'dark');
        },

        bindToggle() {
            const btn = document.getElementById('themeToggle');
            if (btn) btn.addEventListener('click', () => this.toggle());
        }
    };

    // ================================================
    // Frontmatter Parser
    // ================================================
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

    // ================================================
    // Icons
    // ================================================
    const ICONS = {
        email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
        github: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>',
        twitter: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>',
        linkedin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>',
        scholar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>',
        orcid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9 8v8M12 8h2a2 2 0 0 1 0 4h-2v4M12 8v4"/></svg>',
        website: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
        cv: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>'
    };

    // ================================================
    // Render Profile
    // ================================================
    function renderProfile(metadata, markdownContent) {
        const card = document.getElementById('profileCard');
        if (!card) return;

        let html = '<div class="profile-header">';
        
        // Avatar (floated)
        if (metadata.avatar) {
            html += `<div class="avatar-container"><img src="${metadata.avatar}" alt="" class="avatar"></div>`;
        }
        
        // Name - Big and bold
        if (metadata.name) {
            html += `<h1 class="profile-name">${metadata.name}</h1>`;
            document.title = metadata.name;
        }
        
        // Tagline (one-liner about research)
        if (metadata.tagline) {
            html += `<p class="profile-tagline">${metadata.tagline}</p>`;
        }
        
        // Affiliation
        if (metadata.title || metadata.institution) {
            const parts = [metadata.title, metadata.institution].filter(Boolean);
            html += `<p class="profile-affiliation">${parts.join(' ')}</p>`;
        }
        
        // Contact links
        const links = [];
        if (metadata.email) {
            links.push(`<a href="mailto:${metadata.email}" class="contact-link">${ICONS.email} ${metadata.email}</a>`);
        }
        if (metadata.github) {
            const url = metadata.github.includes('http') ? metadata.github : `https://github.com/${metadata.github}`;
            links.push(`<a href="${url}" target="_blank" class="contact-link">${ICONS.github} GitHub</a>`);
        }
        if (metadata.twitter) {
            const url = metadata.twitter.includes('http') ? metadata.twitter : `https://twitter.com/${metadata.twitter}`;
            links.push(`<a href="${url}" target="_blank" class="contact-link">${ICONS.twitter} Twitter</a>`);
        }
        if (metadata.scholar) {
            links.push(`<a href="${metadata.scholar}" target="_blank" class="contact-link">${ICONS.scholar} Scholar</a>`);
        }
        if (metadata.linkedin) {
            const url = metadata.linkedin.includes('http') ? metadata.linkedin : `https://linkedin.com/in/${metadata.linkedin}`;
            links.push(`<a href="${url}" target="_blank" class="contact-link">${ICONS.linkedin} LinkedIn</a>`);
        }
        if (metadata.cv) {
            links.push(`<a href="${metadata.cv}" target="_blank" class="contact-link">${ICONS.cv} CV</a>`);
        }
        
        if (links.length) {
            html += `<div class="contact-links">${links.join('')}</div>`;
        }
        
        html += '</div>';
        
        // Render markdown
        marked.setOptions({ breaks: true, gfm: true });
        const rendered = marked.parse(markdownContent);
        
        card.innerHTML = html + `<div class="markdown-content">${rendered}</div>`;
    }

    // ================================================
    // Load Content
    // ================================================
    async function loadContent() {
        try {
            const response = await fetch(CONFIG.contentPath, { cache: 'no-store' });
            if (!response.ok) throw new Error('Failed to load');
            
            const raw = await response.text();
            const { metadata, content } = parseFrontmatter(raw);
            renderProfile(metadata, content);
            
            // Set last updated
            if (metadata.updated) {
                const el = document.getElementById('lastUpdated');
                if (el) el.textContent = metadata.updated;
            }
        } catch (e) {
            console.error(e);
            document.getElementById('profileCard').innerHTML = `
                <div class="loading">
                    <p>Unable to load content.<br><small>Ensure <code>content/profile.md</code> exists.</small></p>
                </div>
            `;
        }
    }

    ThemeManager.init();
    loadContent();
})();
