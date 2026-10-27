document.documentElement.classList.add('js-ready');

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-nav');
if (menuButton && navigation) {
  menuButton.hidden = false;
  const closeMenu = () => {
    navigation.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
  };
  menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') !== 'true';
    navigation.classList.toggle('is-open', expanded);
    menuButton.setAttribute('aria-expanded', String(expanded));
  });
  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
      closeMenu();
      menuButton.focus();
    }
  });
}

const newsButton = document.querySelector('#toggle-news');
const newsItems = [...document.querySelectorAll('#news-list > li')];
if (newsButton && newsItems.length > 5) {
  newsButton.hidden = false;
  newsItems.slice(5).forEach((item) => { item.hidden = true; });
  newsButton.addEventListener('click', () => {
    const expanded = newsButton.getAttribute('aria-expanded') !== 'true';
    newsItems.slice(5).forEach((item) => { item.hidden = !expanded; });
    newsButton.setAttribute('aria-expanded', String(expanded));
    newsButton.innerHTML = expanded
      ? 'Show less news <span aria-hidden="true">↑</span>'
      : 'Show all news <span aria-hidden="true">↓</span>';
    // Keep the control reachable when a long expanded list collapses.
    if (!expanded && newsButton.getBoundingClientRect().top < 80) {
      newsButton.scrollIntoView({ block: 'center', behavior: 'instant' });
    }
  });
}

// Highlight the current section without changing navigation or browser history.
const sections = [...document.querySelectorAll('section[id]')];
const sectionLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
if ('IntersectionObserver' in window && sectionLinks.length) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      sectionLinks.forEach((link) => {
        if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
  }, { rootMargin: '-10% 0px -65% 0px', threshold: 0 });
  sections.forEach((section) => observer.observe(section));
}
