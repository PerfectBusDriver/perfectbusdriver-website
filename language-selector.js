// Language selector and manager for Perfect Bus Driver website

const languages = {
    fr: { name: 'Français', flag: '🇫🇷' },
    en: { name: 'English', flag: '🇬🇧' },
    es: { name: 'Español', flag: '🇪🇸' },
    pt: { name: 'Português', flag: '🇵🇹' },
    de: { name: 'Deutsch', flag: '🇩🇪' },
    nl: { name: 'Nederlands', flag: '🇳🇱' },
    it: { name: 'Italiano', flag: '🇮🇹' }
};

// Get the base path (for GitHub Pages subfolders like /perfectbusdriver-website/)
function getBasePath() {
    const path = window.location.pathname;
    // Check if we're in a GitHub Pages subfolder
    const match = path.match(/^(\/[^\/]+)?\/(fr|en|es|pt|de|nl|it)\//);
    if (match && match[1]) {
        return match[1]; // Returns something like /perfectbusdriver-website
    }
    // Check if we're at root level with a language folder
    const rootMatch = path.match(/^\/(fr|en|es|pt|de|nl|it)\//);
    if (rootMatch) {
        return ''; // Root level, no base path
    }
    // Try to detect base path from current location
    const parts = path.split('/').filter(p => p);
    if (parts.length > 0 && !['fr', 'en', 'es', 'pt', 'de', 'nl', 'it'].includes(parts[0])) {
        return '/' + parts[0]; // First part is likely the repository name
    }
    return ''; // Default to root
}

// Get current language from URL or browser
function getCurrentLanguage() {
    const path = window.location.pathname;
    const langMatch = path.match(/\/(fr|en|es|pt|de|nl|it)\//);
    if (langMatch) {
        return langMatch[1];
    }
    
    // Default to browser language or French
    const browserLang = navigator.language.split('-')[0];
    return languages[browserLang] ? browserLang : 'fr';
}

// Change language
function changeLanguage(newLang) {
    const currentPath = window.location.pathname;
    const currentLang = getCurrentLanguage();
    const basePath = getBasePath();
    
    // Extract the page name (index.html, privacy.html, etc.)
    const pageName = currentPath.split('/').pop() || 'index.html';
    
    // Build new path with base path
    const newPath = `${basePath}/${newLang}/${pageName}`;
    
    // Redirect
    window.location.href = newPath;
}

// Create language selector dropdown
function createLanguageSelector() {
    const currentLang = getCurrentLanguage();
    const selector = document.getElementById('language-selector');
    
    if (!selector) return;
    
    const currentLangData = languages[currentLang];
    
    const html = `
        <div class="language-dropdown">
            <button class="language-button" onclick="toggleLanguageMenu()">
                <span class="flag">${currentLangData.flag}</span>
                <span class="lang-name">${currentLangData.name}</span>
                <span class="arrow">▼</span>
            </button>
            <div class="language-menu" id="language-menu">
                ${Object.entries(languages).map(([code, data]) => `
                    <a href="#" onclick="changeLanguage('${code}'); return false;" class="language-option ${code === currentLang ? 'active' : ''}">
                        <span class="flag">${data.flag}</span>
                        <span>${data.name}</span>
                    </a>
                `).join('')}
            </div>
        </div>
    `;
    
    selector.innerHTML = html;
}

// Toggle language menu
function toggleLanguageMenu() {
    const menu = document.getElementById('language-menu');
    menu.classList.toggle('show');
}

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const dropdown = document.querySelector('.language-dropdown');
    if (dropdown && !dropdown.contains(event.target)) {
        const menu = document.getElementById('language-menu');
        if (menu) menu.classList.remove('show');
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', createLanguageSelector);
