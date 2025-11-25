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
    
    // Extract the page name (index.html, privacy.html, etc.)
    const pageName = currentPath.split('/').pop() || 'index.html';
    
    // Build new path
    const newPath = `/${newLang}/${pageName}`;
    
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
