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
// LOAD ARTICLES
// ===============================
async function loadArticles() {
    try {
        const res = await fetch(`https://api.github.com/repos/${repo}/contents/content/articles`);

        if (!res.ok) throw new Error("GitHub API failed");

        const files = await res.json();

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

            // 🛑 Skip broken data
            if (!data.title || !data.image) continue;

            articles.push(data);
        }

        return articles;

    } catch (err) {
        console.error("Error loading articles:", err);
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
// LOAD TOOLS
// ===============================
async function loadTools() {
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

    return tools;
}

// ===============================
// RENDER TOOLS
// ===============================
async function renderTools() {
    const grid = document.getElementById('toolsGrid');
    if (!grid) return;

    const tools = await loadTools();

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
// LOAD TRENDING
// ===============================
async function loadTrending() {
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

    return topics;
}

// ===============================
// RENDER TRENDING
// ===============================
async function renderTrending() {
    const list = document.getElementById('trendingList');
    if (!list) return;

    const topics = await loadTrending();

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
// LOAD TAGS
// ===============================
async function loadTags() {
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

    return tags;
}

// ===============================
// RENDER TAG CLOUD
// ===============================
async function renderTagCloud() {
    const cloud = document.getElementById('tagCloud');
    if (!cloud) return;

    const tags = await loadTags();

    cloud.innerHTML = tags.map(tag => `<a href="#">${tag}</a>`).join('');
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
// NAVBAR & SCROLL
// ===============================
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

// Intersection Observer for fade-in animations
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

// Update active link on scroll (only if sections exist)
if (mainSections.length > 0) {
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();
}

// Update active link when clicking nav links
navBarLinks.forEach(link => {
    link.addEventListener('click', function() {
        navBarLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});