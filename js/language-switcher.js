// Tableau de correspondance des routes entre FR et EN
const languageRoutes = {
  // FR → EN
  '/': '/en/',
  '/fr/': '/en/',
  '/fr/a-propos/': '/en/about/',
  '/fr/nos-activites/': '/en/our-activities/',
  '/fr/contact/': '/en/contact/',     // ✅ Correct
  '/fr/cgv/': '/en/cgv/',
  '/fr/cgu/': '/en/cgu/',
  '/fr/politique/': '/en/privacy-policy/',
  '/fr/farm/': '/en/farm/',

  // EN → FR
  '/en/': '/',
  '/en/about/': '/fr/a-propos/',
  '/en/our-activities/': '/fr/nos-activites/',
  '/en/contact/': '/fr/contact/',     // ✅ Correct
  '/en/cgv/': '/fr/cgv/',
  '/en/cgu/': '/fr/cgu/',
  '/en/privacy-policy/': '/fr/politique/',
  '/en/farm/': '/fr/farm/'
};

// Fonction appelée au clic sur une langue
function switchToLanguage(lang) {
  const currentPath = window.location.pathname;
  let targetUrl;

  if (lang === 'fr') {
    // Trouver la clé FR correspondant à l'URL actuelle EN
    targetUrl = Object.keys(languageRoutes).find(key => languageRoutes[key] === currentPath);
    if (!targetUrl) targetUrl = '/';
  } else {
    // FR → EN : utiliser la table
    targetUrl = languageRoutes[currentPath] || '/en/';
  }

  // Sauvegarde la langue choisie
  localStorage.setItem('site-lang', lang);

  // Met à jour visuellement drapeau/texte
  updateLanguageDisplay(lang);

  // Redirige
  window.location.href = targetUrl;
}

// Met à jour le drapeau et le texte selon la langue
function updateLanguageDisplay(lang) {
  const flag = document.getElementById('lang-flag');
  const text = document.getElementById('lang-text');
  if (!flag) return;

  if (lang === 'en') {
    flag.className = 'flag-icon flag-icon-us';
    if (text) text.textContent = ' English';
  } else {
    flag.className = 'flag-icon flag-icon-fr';
    if (text) text.textContent = ' Français';
  }
}

// Exécute au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('site-lang') || 'fr';
  updateLanguageDisplay(savedLang);
});