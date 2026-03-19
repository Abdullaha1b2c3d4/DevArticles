// ===== DATA ARRAYS =====
const articles = [
    {
        id: 1,
        title: "ChatGPT vs Claude 3.5: Which AI Assistant Wins in 2025?",
        description: "A comprehensive comparison of the two leading AI assistants, testing their capabilities in coding, writing, analysis, and creative tasks.",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
        category: "AI Tools",
        categoryClass: "tag-ai",
        date: "Dec 15, 2024",
        readTime: "8 min read",
        url: "#",
        views: 12500
    },
    {
        id: 2,
        title: "Next.js 15: Everything New You Need to Know About",
        description: "Explore the latest features in Next.js 15, including improved server components, Turbopack stability, and enhanced caching strategies.",
        image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600&h=400&fit=crop",
        category: "Web Dev",
        categoryClass: "tag-webdev",
        date: "Dec 12, 2024",
        readTime: "12 min read",
        url: "#",
        views: 9800
    },
    {
        id: 3,
        title: "Quantum Computing in 2025: What Developers Should Know",
        description: "Quantum computing is no longer just theory. Here's how it's becoming practical and what it means for software development.",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop",
        category: "Tech",
        categoryClass: "tag-tech",
        date: "Dec 10, 2024",
        readTime: "6 min read",
        url: "#",
        views: 8200
    },
    {
        id: 4,
        title: "Top 10 AI Code Assistants That Will Boost Your Productivity",
        description: "From GitHub Copilot to Cursor AI — discover the best AI-powered coding tools that help you write better code faster.",
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop",
        category: "AI Tools",
        categoryClass: "tag-ai",
        date: "Dec 8, 2024",
        readTime: "10 min read",
        url: "#",
        views: 7100
    },
    {
        id: 5,
        title: "Modern CSS in 2025: Container Queries, Layers & More",
        description: "CSS has evolved massively. Learn about the newest features like container queries, cascade layers, and the :has() selector.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
        category: "Web Dev",
        categoryClass: "tag-webdev",
        date: "Dec 5, 2024",
        readTime: "7 min read",
        url: "#",
        views: 6600
    },
    {
        id: 6,
        title: "Cybersecurity in the AI Era: Threats & Defenses for 2025",
        description: "AI is being used both to attack and defend. Learn about the latest cybersecurity trends and how to protect your applications.",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop",
        category: "Tech",
        categoryClass: "tag-tech",
        date: "Dec 2, 2024",
        readTime: "9 min read",
        url: "#",
        views: 5900
    }
];

const aiTools = [
    {
        id: 1,
        name: "ChatGPT",
        company: "OpenAI",
        description: "Advanced conversational AI for writing, coding, analysis, and creative tasks. The most versatile AI assistant available.",
        icon: "fas fa-comments",
        iconBg: "linear-gradient(135deg, #10a37f, #1a7f5a)",
        tags: ["Chatbot", "Writing", "Coding"],
        rating: 4.8,
        priceType: "freemium",
        priceLabel: "Freemium"
    },
    {
        id: 2,
        name: "Midjourney",
        company: "Midjourney Inc.",
        description: "Create stunning, photorealistic images from text descriptions. The leading AI image generation tool for designers.",
        icon: "fas fa-palette",
        iconBg: "linear-gradient(135deg, #5436DA, #7B68EE)",
        tags: ["Image Gen", "Design", "Art"],
        rating: 4.9,
        priceType: "paid",
        priceLabel: "From $10/mo"
    },
    {
        id: 3,
        name: "GitHub Copilot",
        company: "GitHub / Microsoft",
        description: "AI pair programmer that suggests code completions, functions, and entire algorithms right in your editor.",
        icon: "fas fa-code",
        iconBg: "linear-gradient(135deg, #000, #333)",
        tags: ["Coding", "IDE", "Autocomplete"],
        rating: 4.7,
        priceType: "paid",
        priceLabel: "From $10/mo"
    },
    {
        id: 4,
        name: "Runway ML",
        company: "Runway",
        description: "AI-powered video editing and generation. Create professional videos with text-to-video, image-to-video, and more.",
        icon: "fas fa-video",
        iconBg: "linear-gradient(135deg, #FF6B6B, #ee5a24)",
        tags: ["Video", "Editing", "Gen AI"],
        rating: 4.6,
        priceType: "freemium",
        priceLabel: "Freemium"
    },
    {
        id: 5,
        name: "Claude AI",
        company: "Anthropic",
        description: "Advanced AI assistant excelling at thoughtful analysis, coding, math, and long-form content with 200K context window.",
        icon: "fas fa-brain",
        iconBg: "linear-gradient(135deg, #D4A574, #C19A6B)",
        tags: ["Chatbot", "Analysis", "Writing"],
        rating: 4.8,
        priceType: "freemium",
        priceLabel: "Freemium"
    },
    {
        id: 6,
        name: "Cursor IDE",
        company: "Anysphere",
        description: "AI-first code editor built on VS Code. Write, edit, and debug code with natural language and intelligent completions.",
        icon: "fas fa-pen-fancy",
        iconBg: "linear-gradient(135deg, #00D2FF, #3A7BD5)",
        tags: ["IDE", "Coding", "Productivity"],
        rating: 4.7,
        priceType: "freemium",
        priceLabel: "Freemium"
    }
];

const trendingTopics = [
    { title: "How to Use Midjourney V6 for Web Design", views: "12.5K" },
    { title: "Building APIs with Hono.js: A Complete Guide", views: "9.8K" },
    { title: "Apple Vision Pro: Developer's Perspective", views: "8.2K" },
    { title: "Tailwind CSS v4: What's Actually New?", views: "7.1K" }
];

const popularTags = [
    "JavaScript", "React", "ChatGPT", "Python", "AI", "CSS", 
    "Node.js", "API", "TypeScript", "Next.js", "Figma", "Cloud"
];

// ===== RENDER FUNCTIONS =====
function renderArticles() {
    const grid = document.getElementById('articlesGrid');
    if (!grid) {
        console.error("articlesGrid not found!");
        return;
    }
    
    grid.innerHTML = articles.map(article => `
        <div class="post-card" style="opacity: 1; transform: none;">
            <div class="post-image">
                <img src="${article.image}" alt="${article.title}" loading="lazy">
                <span class="post-tag ${article.categoryClass}">${article.category}</span>
            </div>
            <div class="post-body">
                <div class="post-meta">
                    <span><i class="far fa-calendar"></i> ${article.date}</span>
                    <span><i class="far fa-clock"></i> ${article.readTime}</span>
                </div>
                <h3>${article.title}</h3>
                <p>${article.description}</p>
                <a href="${article.url}" class="read-more">Read More <i class="fas fa-arrow-right"></i></a>
            </div>
        </div>
    `).join('');
    console.log("Articles rendered successfully!");
}

function renderTools() {
    const grid = document.getElementById('toolsGrid');
    if (!grid) {
        console.error("toolsGrid not found!");
        return;
    }
    
    grid.innerHTML = aiTools.map(tool => `
        <div class="tool-card" style="opacity: 1; transform: none;">
            <div class="tool-header">
                <div class="tool-logo" style="background: ${tool.iconBg};">
                    <i class="${tool.icon}"></i>
                </div>
                <div class="tool-header-text">
                    <h3>${tool.name}</h3>
                    <span>by ${tool.company}</span>
                </div>
            </div>
            <p>${tool.description}</p>
            <div class="tool-tags">
                ${tool.tags.map(tag => `<span class="tool-tag">${tag}</span>`).join('')}
            </div>
            <div class="tool-footer">
                <span class="tool-rating"><i class="fas fa-star"></i> ${tool.rating}/5</span>
                <span class="tool-price price-${tool.priceType}">${tool.priceLabel}</span>
            </div>
        </div>
    `).join('');
    console.log("Tools rendered successfully!");
}

function renderTrending() {
    const list = document.getElementById('trendingList');
    if (!list) {
        console.error("trendingList not found!");
        return;
    }
    
    list.innerHTML = trendingTopics.map((topic, index) => `
        <li class="trending-item">
            <span class="trending-num">${String(index + 1).padStart(2, '0')}</span>
            <div class="trending-text">
                <h4>${topic.title}</h4>
                <span><i class="far fa-eye"></i> ${topic.views} views</span>
            </div>
        </li>
    `).join('');
    console.log("Trending rendered successfully!");
}

function renderTagCloud() {
    const cloud = document.getElementById('tagCloud');
    if (!cloud) {
        console.error("tagCloud not found!");
        return;
    }
    
    cloud.innerHTML = popularTags.map(tag => `<a href="#">${tag}</a>`).join('');
    console.log("Tag cloud rendered successfully!");
}

// ===== CALL RENDER FUNCTIONS WHEN DOM IS READY =====
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded, rendering content...");
    
    // Render all dynamic content
    renderArticles();
    renderTools();
    renderTrending();
    renderTagCloud();
    
    console.log("All rendering complete!");
});

// ===== REST OF YOUR EXISTING CODE (navbar, theme, etc.) =====
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    backToTop.classList.toggle('visible', window.scrollY > 500);

    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (link) {
            link.classList.toggle('active', scrollY >= top && scrollY < top + height);
        }
    });
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const mobileOverlay = document.getElementById('mobileOverlay');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
});

mobileOverlay.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    mobileOverlay.classList.remove('active');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        mobileOverlay.classList.remove('active');
    });
});

const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon(next);
});

function updateThemeIcon(theme) {
    themeToggle.innerHTML = theme === 'dark'
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
}

const searchToggle = document.getElementById('searchToggle');
const searchOverlay = document.getElementById('searchOverlay');

searchToggle.addEventListener('click', () => {
    searchOverlay.classList.add('active');
    searchOverlay.querySelector('input').focus();
});

searchOverlay.addEventListener('click', (e) => {
    if (e.target === searchOverlay) {
        searchOverlay.classList.remove('active');
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') searchOverlay.classList.remove('active');
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchOverlay.classList.add('active');
        searchOverlay.querySelector('input').focus();
    }
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

function handleNewsletter(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
    btn.style.background = 'var(--success)';
    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        e.target.reset();
    }, 3000);
}

function handleContact(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    btn.style.background = 'var(--success)';
    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        e.target.reset();
    }, 3000);
}

if (!localStorage.getItem('cookies_accepted')) {
    setTimeout(() => {
        document.getElementById('cookieBanner').classList.add('show');
    }, 2000);
}

function acceptCookies() {
    localStorage.setItem('cookies_accepted', 'true');
    document.getElementById('cookieBanner').classList.remove('show');
}

const pages = {
    privacy: `
        <h1>Privacy Policy</h1>
        <p class="updated">Last updated: December 15, 2024</p>
        <p>At TechPulse, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>
        <h2>Information We Collect</h2>
        <p>We may collect information about you in various ways, including:</p>
        <ul>
            <li><strong>Personal Data:</strong> Name and email address when you subscribe to our newsletter or contact us.</li>
            <li><strong>Usage Data:</strong> Information about how you access and use our website, including IP address, browser type, pages visited, and time spent.</li>
            <li><strong>Cookies:</strong> We use cookies and similar tracking technologies to enhance your experience.</li>
        </ul>
        <h2>How We Use Your Information</h2>
        <ul>
            <li>To provide and maintain our website</li>
            <li>To send you newsletters and updates (with your consent)</li>
            <li>To respond to your inquiries</li>
            <li>To analyze website usage and improve our content</li>
            <li>To display relevant advertisements through Google AdSense</li>
        </ul>
        <h2>Google AdSense & Third-Party Advertising</h2>
        <p>We use Google AdSense to display advertisements. Google may use cookies and web beacons to serve ads based on your prior visits to our website or other websites. You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" style="color:var(--accent-light)">Google Ads Settings</a>.</p>
        <h2>Your Rights</h2>
        <p>You have the right to access, update, or delete your personal information. You may also opt out of receiving our newsletter at any time by clicking the unsubscribe link.</p>
        <h2>Contact Us</h2>
        <p>If you have questions about this Privacy Policy, please contact us at hello@techpulse.com.</p>
    `,
    terms: `
        <h1>Terms of Service</h1>
        <p class="updated">Last updated: December 15, 2024</p>
        <p>Welcome to TechPulse. By accessing and using this website, you agree to be bound by these Terms of Service.</p>
        <h2>Use of Content</h2>
        <p>All content on TechPulse is for informational purposes only. You may not reproduce, distribute, or modify our content without prior written permission.</p>
        <h2>User Conduct</h2>
        <ul>
            <li>You agree not to use our website for any unlawful purpose</li>
            <li>You agree not to attempt to gain unauthorized access to our systems</li>
            <li>You agree not to spam or distribute malicious content</li>
        </ul>
        <h2>Intellectual Property</h2>
        <p>All content, logos, and trademarks on this website are the property of TechPulse unless otherwise stated. Third-party trademarks mentioned are the property of their respective owners.</p>
        <h2>Limitation of Liability</h2>
        <p>TechPulse shall not be liable for any damages arising from the use of our website or the information provided herein.</p>
        <h2>Changes to Terms</h2>
        <p>We reserve the right to modify these terms at any time. Continued use of the website constitutes acceptance of the updated terms.</p>
    `,
    disclaimer: `
        <h1>Disclaimer</h1>
        <p class="updated">Last updated: December 15, 2024</p>
        <h2>General Disclaimer</h2>
        <p>The information provided on TechPulse is for general informational purposes only. While we strive to keep the information up-to-date and accurate, we make no representations or warranties of any kind about the completeness, accuracy, or reliability of the information.</p>
        <h2>Affiliate Disclaimer</h2>
        <p>Some links on TechPulse may be affiliate links. This means we may earn a small commission if you make a purchase through these links, at no additional cost to you. This helps us maintain the website and continue creating quality content.</p>
        <h2>Product Reviews</h2>
        <p>Our product reviews and AI tool recommendations are based on our honest opinions and testing. We are not responsible for any decisions made based on our reviews. Always do your own research before making a purchase.</p>
        <h2>External Links</h2>
        <p>Our website may contain links to external websites. We are not responsible for the content or privacy practices of these external sites.</p>
        <h2>Professional Advice</h2>
        <p>Content on TechPulse should not be considered as professional advice. For specific technical or business decisions, please consult with qualified professionals.</p>
    `
};

function showPage(page) {
    event.preventDefault();
    document.getElementById('pageModalContent').innerHTML = pages[page];
    document.getElementById('pageModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);
}

function closePageModal() {
    document.getElementById('pageModal').style.display = 'none';
    document.body.style.overflow = '';
}

function animateCounters() {
    document.querySelectorAll('.stat h3, .about-stat-card h4').forEach(el => {
        const text = el.textContent;
        const num = parseInt(text.replace(/\D/g, ''));
        const suffix = text.replace(/[\d]/g, '');
        let current = 0;
        const step = Math.ceil(num / 40);
        const timer = setInterval(() => {
            current += step;
            if (current >= num) {
                current = num;
                clearInterval(timer);
            }
            el.textContent = current + suffix;
        }, 30);
    });
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.disconnect();
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);