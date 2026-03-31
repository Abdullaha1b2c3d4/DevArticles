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
// ===============================
// LOAD ARTICLES (WITH CACHE & FALLBACK)
// ===============================
// ===============================
// LOAD ARTICLES (WITH CACHE & FALLBACK)
// ===============================
async function loadArticles() {
    // Check cache first
    const cached = getCachedData('articles');
    if (cached && cached.length > 0) {
        console.log('✅ Loading articles from cache');
        return cached;
    }
    
    try {
        console.log('🔄 Fetching articles from GitHub API');
        const res = await fetch(`https://api.github.com/repos/${repo}/contents/content/articles`);
        
        console.log('GitHub API Response Status:', res.status);
        
        if (!res.ok) {
            if (res.status === 403 || res.status === 429) {
                console.warn('⚠️ Rate limited! Using cached data');
                const anyCache = localStorage.getItem('articles');
                if (anyCache) {
                    const fallback = JSON.parse(anyCache);
                    return fallback.value || [];
                }
            }
            throw new Error(`GitHub API failed: ${res.status}`);
        }

        const files = await res.json();
        console.log('Files found:', files.length);

        if (!Array.isArray(files)) {
            console.error("Not an array:", files);
            return [];
        }

        const articles = [];

        for (const file of files) {
            if (!file.name.endsWith(".md")) continue;

            const raw = await fetch(file.download_url);
            const text = await raw.text();
            const data = parseFrontmatter(text);

            if (!data.title) continue;
            
            // FIX IMAGE URL - Convert GitHub relative paths to raw URLs
            let imageUrl = data.image || '';
            
            if (imageUrl) {
                // If it's a relative path like "assets/images/image.jpg"
                if (!imageUrl.startsWith('http') && !imageUrl.startsWith('//')) {
                    // Remove leading slash if present
                    if (imageUrl.startsWith('/')) {
                        imageUrl = imageUrl.substring(1);
                    }
                    // Construct raw GitHub URL
                    imageUrl = `https://raw.githubusercontent.com/${repo}/main/${imageUrl}`;
                }
            } else {
                imageUrl = 'https://via.placeholder.com/400x200?text=No+Image';
            }
            
            // Set defaults for missing fields
            if (!data.category) data.category = 'General';
            if (!data.categoryClass) {
                if (data.category === 'AI Tools') data.categoryClass = 'tag-ai';
                else if (data.category === 'Web Dev') data.categoryClass = 'tag-webdev';
                else if (data.category === 'Tech') data.categoryClass = 'tag-tech';
                else data.categoryClass = 'tag-ai';
            }
            if (!data.date) data.date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            if (!data.readTime) data.readTime = '5 min read';
            if (!data.description) data.description = 'Read more about this topic...';
            
            // Add the fixed image URL to the article data
            data.image = imageUrl;

            articles.push(data);
        }

        console.log(`✅ Total articles loaded: ${articles.length}`);
        
        // Save to cache
        if (articles.length > 0) {
            setCachedData('articles', articles);
        }
        
        return articles;

    } catch (err) {
        console.error("Error loading articles:", err);
        
        const anyCache = localStorage.getItem('articles');
        if (anyCache) {
            console.log('⚠️ Using expired cache as last resort');
            try {
                const fallback = JSON.parse(anyCache);
                return fallback.value || [];
            } catch (e) {
                return [];
            }
        }
        
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

    if (!articles || articles.length === 0) {
        grid.innerHTML = `
            <div style="text-align: center; padding: 60px; grid-column: 1/-1;">
                <i class="fas fa-newspaper" style="font-size: 3rem; opacity: 0.5; margin-bottom: 20px; display: block;"></i>
                <h3>No articles found</h3>
                <p style="color: var(--text-muted);">Check back later for new content!</p>
                <button onclick="refreshContent()" class="btn btn-outline" style="margin-top: 20px;">
                    <i class="fas fa-sync-alt"></i> Refresh
                </button>
            </div>
        `;
        return;
    }

    grid.innerHTML = articles.map(article => {
        // Fix image path
        let imageUrl = article.image || 'https://via.placeholder.com/400x200?text=No+Image';
        if (imageUrl && !imageUrl.startsWith('http') && !imageUrl.startsWith('//')) {
            if (imageUrl.startsWith('/')) {
                imageUrl = imageUrl;
            } else {
                imageUrl = '/' + imageUrl;
            }
        }
        
        return `
            <div class="post-card">
                <div class="post-image">
                    <img src="${imageUrl}" alt="${article.title}" loading="lazy" onerror="this.src='https://via.placeholder.com/400x200?text=Image+Error'; this.onerror=null;">
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
        `;
    }).join('');
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