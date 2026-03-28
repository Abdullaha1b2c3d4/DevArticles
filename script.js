// ===============================
// CACHE HELPER FUNCTIONS
// ===============================
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache

function getCachedData(key) {
    const cached = localStorage.getItem(key);
    if (!cached) return null;
    
    const data = JSON.parse(cached);
    if (Date.now() - data.timestamp > CACHE_DURATION) {
        localStorage.removeItem(key);
        return null;
    }
    
    return data.value;
}

function setCachedData(key, value) {
    localStorage.setItem(key, JSON.stringify({
        timestamp: Date.now(),
        value: value
    }));
}

// ===============================
// MARKDOWN PARSER
// ===============================
function parseFrontmatter(md) {
    const match = md.match(/^---\n([\s\S]*?)\n---/);
    if (!match) return {};

    const lines = match[1].split('\n');
    const data = {};

    lines.forEach(line => {
        const index = line.indexOf(':');
        if (index === -1) return;

        const key = line.slice(0, index).trim();
        let value = line.slice(index + 1).trim();
        value = value.replace(/^"|"$/g, '');
        data[key] = value;
    });

    return data;
}

// ===============================
// CONFIG
// ===============================
const repo = "Abdullaha1b2c3d4/DevArticles";

// ===============================
// LOAD ARTICLES (WITH CACHE)
// ===============================
async function loadArticles() {
    try {
        console.log('=== DEBUG: Starting to fetch articles ===');
        
        const res = await fetch(`https://api.github.com/repos/${repo}/contents/content/articles`);
        
        console.log('GitHub API Response Status:', res.status);
        
        if (!res.ok) {
            console.error('GitHub API failed with status:', res.status);
            throw new Error("GitHub API failed");
        }

        const files = await res.json();
        console.log('Files found:', files.length);
        console.log('File names:', files.map(f => f.name));

        if (!Array.isArray(files)) {
            console.error("Not an array:", files);
            return [];
        }

        const articles = [];

        for (const file of files) {
            if (!file.name.endsWith(".md")) {
                console.log(`Skipping non-md file: ${file.name}`);
                continue;
            }

            console.log(`\n--- Processing: ${file.name} ---`);
            
            const raw = await fetch(file.download_url);
            const text = await raw.text();
            console.log(`File content length: ${text.length} characters`);
            console.log(`First 200 chars: ${text.substring(0, 200)}`);
            
            const data = parseFrontmatter(text);
            console.log('Parsed frontmatter:', data);

            if (!data.title) {
                console.warn(`⚠️ Skipping: No title in ${file.name}`);
                continue;
            }
            
            if (!data.image) {
                console.warn(`⚠️ Warning: No image in ${file.name}`);
            }

            articles.push(data);
            console.log(`✅ Added article: ${data.title}`);
        }

        console.log(`\n=== Total articles loaded: ${articles.length} ===`);
        return articles;

    } catch (err) {
        console.error("Error loading articles:", err);
        return [];
    }
}

// ===============================
// LOAD TOOLS (WITH CACHE)
// ===============================
async function loadTools() {
    const cached = getCachedData('tools');
    if (cached) {
        console.log('Loading tools from cache');
        return cached;
    }
    
    try {
        console.log('Fetching tools from GitHub API');
        const res = await fetch(`https://api.github.com/repos/${repo}/contents/content/tools`);
        const files = await res.json();

        const tools = [];

        for (const file of files) {
            if (!file.name.endsWith(".md")) continue;

            const raw = await fetch(file.download_url);
            const text = await raw.text();
            const data = parseFrontmatter(text);

            if (typeof data.tags === "string") {
                data.tags = data.tags.replace('[', '').replace(']', '').split(',');
            }

            tools.push(data);
        }
        
        setCachedData('tools', tools);
        return tools;
        
    } catch (err) {
        console.error("Error loading tools:", err);
        const fallbackCache = localStorage.getItem('tools');
        if (fallbackCache) {
            return JSON.parse(fallbackCache).value;
        }
        return [];
    }
}

// ===============================
// LOAD TRENDING (WITH CACHE)
// ===============================
async function loadTrending() {
    const cached = getCachedData('trending');
    if (cached) {
        console.log('Loading trending from cache');
        return cached;
    }
    
    try {
        console.log('Fetching trending from GitHub API');
        const res = await fetch(`https://api.github.com/repos/${repo}/contents/content/trending`);
        const files = await res.json();

        const topics = [];

        for (const file of files) {
            if (!file.name.endsWith(".md")) continue;

            const raw = await fetch(file.download_url);
            const text = await raw.text();
            const data = parseFrontmatter(text);

            topics.push(data);
        }
        
        setCachedData('trending', topics);
        return topics;
        
    } catch (err) {
        console.error("Error loading trending:", err);
        const fallbackCache = localStorage.getItem('trending');
        if (fallbackCache) {
            return JSON.parse(fallbackCache).value;
        }
        return [];
    }
}

// ===============================
// LOAD TAGS (WITH CACHE)
// ===============================
async function loadTags() {
    const cached = getCachedData('tags');
    if (cached) {
        console.log('Loading tags from cache');
        return cached;
    }
    
    try {
        console.log('Fetching tags from GitHub API');
        const res = await fetch(`https://api.github.com/repos/${repo}/contents/content/tags`);
        const files = await res.json();

        const tags = [];

        for (const file of files) {
            if (!file.name.endsWith(".md")) continue;

            const raw = await fetch(file.download_url);
            const text = await raw.text();
            const data = parseFrontmatter(text);

            tags.push(data.name);
        }
        
        setCachedData('tags', tags);
        return tags;
        
    } catch (err) {
        console.error("Error loading tags:", err);
        const fallbackCache = localStorage.getItem('tags');
        if (fallbackCache) {
            return JSON.parse(fallbackCache).value;
        }
        return [];
    }
}

// ===============================
// RENDER ARTICLES
// ===============================
async function renderArticles() {
    const grid = document.getElementById('articlesGrid');
    if (!grid) return;

    const articles = await loadArticles();

    if (articles.length === 0) {
        grid.innerHTML = `
            <div style="text-align: center; padding: 60px; grid-column: 1/-1;">
                <i class="fas fa-newspaper" style="font-size: 3rem; opacity: 0.5; margin-bottom: 20px; display: block;"></i>
                <h3>No articles found</h3>
                <p style="color: var(--text-muted);">Check back later for new content!</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = articles.map(article => `
        <div class="post-card">
            <div class="post-image">
                <img src="${article.image}" alt="${article.title}" loading="lazy">
                <span class="post-tag ${article.categoryClass}">${article.category}</span>
            </div>
            <div class="post-body">
                <div class="post-meta">
                    <span>${article.date}</span>
                    <span>${article.readTime}</span>
                </div>
                <h3>${article.title}</h3>
                <p>${article.description}</p>
<a href="article.html?slug=${article.slug || article.title.toLowerCase().replace(/\s+/g, '-')}" class="read-more">Read More</a>
            </div>
        </div>
    `).join('');
}

// ===============================
// RENDER TOOLS
// ===============================
async function renderTools() {
    const grid = document.getElementById('toolsGrid');
    if (!grid) return;

    const tools = await loadTools();

    if (tools.length === 0) {
        grid.innerHTML = `
            <div style="text-align: center; padding: 60px; grid-column: 1/-1;">
                <i class="fas fa-tools" style="font-size: 3rem; opacity: 0.5; margin-bottom: 20px; display: block;"></i>
                <h3>No tools found</h3>
                <p style="color: var(--text-muted);">Check back later for new AI tools!</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = tools.map(tool => `
        <div class="tool-card">
            <div class="tool-header">
                <div class="tool-logo" style="background:${tool.iconBg}">
                    <i class="${tool.icon}"></i>
                </div>
                <div>
                    <h3>${tool.name}</h3>
                    <span>${tool.company}</span>
                </div>
            </div>
            <p>${tool.description}</p>
            <div class="tool-tags">
                ${(tool.tags || []).map(tag => `<span>${tag}</span>`).join('')}
            </div>
            <div class="tool-footer">
                <span>${tool.rating}/5</span>
                <span>${tool.priceLabel}</span>
            </div>
        </div>
    `).join('');
}

// ===============================
// RENDER TRENDING
// ===============================
async function renderTrending() {
    const list = document.getElementById('trendingList');
    if (!list) return;

    const topics = await loadTrending();

    if (topics.length === 0) {
        list.innerHTML = '<li style="padding: 12px 0; color: var(--text-muted);">No trending topics</li>';
        return;
    }

    list.innerHTML = topics.map((t, i) => `
        <li class="trending-item">
            <span class="trending-num">${String(i + 1).padStart(2, '0')}</span>
            <div class="trending-text">
                <h4>${t.title}</h4>
                <span>${t.views} views</span>
            </div>
        </li>
    `).join('');
}

// ===============================
// RENDER TAG CLOUD
// ===============================
async function renderTagCloud() {
    const cloud = document.getElementById('tagCloud');
    if (!cloud) return;

    const tags = await loadTags();

    if (tags.length === 0) {
        cloud.innerHTML = '<span style="color: var(--text-muted);">No tags available</span>';
        return;
    }

    cloud.innerHTML = tags.map(tag => `<a href="category.html?cat=${encodeURIComponent(tag)}">${tag}</a>`).join('');
}

// ===============================
// INITIAL LOAD
// ===============================
document.addEventListener('DOMContentLoaded', () => {
    renderArticles();
    renderTools();
    renderTrending();
    renderTagCloud();
});

// ===============================
// MANUAL REFRESH FUNCTION
// ===============================
async function refreshContent() {
    localStorage.removeItem('articles');
    localStorage.removeItem('tools');
    localStorage.removeItem('trending');
    localStorage.removeItem('tags');
    
    const grid = document.getElementById('articlesGrid');
    if (grid) {
        grid.innerHTML = '<div class="loading-spinner" style="text-align: center; padding: 60px;"><div class="loader"></div><p style="margin-top: 20px;">Refreshing articles...</p></div>';
    }
    
    await renderArticles();
    await renderTools();
    await renderTrending();
    await renderTagCloud();
}

// ===============================
// NAVBAR & SCROLL
// ===============================
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// ===============================
// MOBILE MENU
// ===============================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const mobileOverlay = document.getElementById('mobileOverlay');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
    });
}

// ===============================
// THEME TOGGLE
// ===============================
const themeToggle = document.getElementById('themeToggle');

if (themeToggle) {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });
}

// ===============================
// SEARCH OVERLAY
// ===============================
const searchToggle = document.getElementById('searchToggle');
const searchOverlay = document.getElementById('searchOverlay');

if (searchToggle) {
    searchToggle.addEventListener('click', () => {
        searchOverlay.classList.add('active');
        searchOverlay.querySelector('input').focus();
    });
}

if (searchOverlay) {
    searchOverlay.addEventListener('click', (e) => {
        if (e.target === searchOverlay) {
            searchOverlay.classList.remove('active');
        }
    });
}

// ===============================
// COOKIE BANNER
// ===============================
function acceptCookies() {
    localStorage.setItem('cookies_accepted', 'true');
    const banner = document.getElementById('cookieBanner');
    if (banner) banner.classList.remove('show');
}

if (!localStorage.getItem('cookies_accepted')) {
    setTimeout(() => {
        const banner = document.getElementById('cookieBanner');
        if (banner) banner.classList.add('show');
    }, 2000);
}

// ===============================
// ACTIVE NAV LINK ON SCROLL
// ===============================
const mainSections = document.querySelectorAll('#home, #categories, #articles, #tools, #about, #contact');
const navBarLinks = document.querySelectorAll('.nav-links a');

function updateActiveLink() {
    let current = '';
    const scrollPosition = window.scrollY + 100;

    mainSections.forEach(section => {
        if (!section) return;
        
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            current = section.getAttribute('id');
        }
    });

    navBarLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${current}`) {
            link.classList.add('active');
        }
    });
}

if (mainSections.length > 0) {
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();
}

navBarLinks.forEach(link => {
    link.addEventListener('click', function() {
        navBarLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// ===============================
// CATEGORY CARD CLICK HANDLER
// ===============================
const categoryCards = document.querySelectorAll('.category-card');

categoryCards.forEach((card, index) => {
    card.style.cursor = 'pointer';
    
    card.addEventListener('click', () => {
        let category = '';
        const title = card.querySelector('h3')?.innerText || '';
        
        if (title.includes('AI Tools') || index === 0) {
            category = 'AI Tools';
        } else if (title.includes('Web Development') || index === 1) {
            category = 'Web Dev';
        } else if (title.includes('Tech') || index === 2) {
            category = 'Tech';
        }
        
        window.location.href = `category.html?cat=${encodeURIComponent(category)}`;
    });
});