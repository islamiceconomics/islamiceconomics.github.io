/**
 * Islamic Economics Website - Main JavaScript
 * Provides core functionality for navigation, animations, forms, and interactive features
 */

// ============================================================================
// FORMSPREE CONFIGURATION
// ============================================================================
// To enable contact form and newsletter:
// 1. Go to https://formspree.io and create a free account
// 2. Create a new form → copy the form ID (e.g. 'xrgvblqk')
// 3. Replace 'YOUR_FORMSPREE_ID' below with your form ID
// Messages will be forwarded to the email you used to sign up.
// ============================================================================
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mnjbonlp';

const getLocaleStrings = () => {
  const lang = (document.documentElement.lang || 'en').toLowerCase();
  const locale = lang.startsWith('ur') ? 'ur' : lang.startsWith('ar') ? 'ar' : lang.startsWith('tr') ? 'tr' : 'en';

  const strings = {
    en: {
      newsletterThanks: 'Thank you for subscribing!',
      invalidEmail: 'Please enter a valid email address',
      genericError: 'Something went wrong. Please try again.',
      sending: 'Sending...',
      contactSuccess: 'Thank you! Your message has been sent successfully.',
    },
    ur: {
      newsletterThanks: 'سبسکرائب کرنے کا شکریہ!',
      invalidEmail: 'براہ کرم درست ای میل درج کریں',
      genericError: 'کچھ غلط ہو گیا۔ براہ کرم دوبارہ کوشش کریں۔',
      sending: 'بھیجا جا رہا ہے...',
      contactSuccess: 'شکریہ! آپ کا پیغام کامیابی سے بھیج دیا گیا ہے۔',
    },
    ar: {
      newsletterThanks: 'شكرا لاشتراكك!',
      invalidEmail: 'يرجى إدخال بريد إلكتروني صحيح',
      genericError: 'حدث خطأ ما. يرجى المحاولة مرة أخرى.',
      sending: 'جارٍ الإرسال...',
      contactSuccess: 'شكرا لك! تم إرسال رسالتك بنجاح.',
    },
    tr: {
      newsletterThanks: 'Abone oldugunuz icin tesekkurler!',
      invalidEmail: 'Lutfen gecerli bir e-posta adresi girin',
      genericError: 'Bir sorun olustu. Lutfen tekrar deneyin.',
      sending: 'Gonderiliyor...',
      contactSuccess: 'Tesekkurler! Mesajiniz basariyla gonderildi.',
    },
  };

  return strings[locale];
};

// ============================================================================
// 1. MOBILE NAVIGATION TOGGLE
// ============================================================================

const mobileNavToggle = () => {
  const navToggleBtn = document.querySelector('[data-nav-toggle]');
  const body = document.body;

  if (!navToggleBtn) return;

  navToggleBtn.addEventListener('click', () => {
    body.classList.toggle('nav-open');

    // Update aria-expanded for accessibility
    const isOpen = body.classList.contains('nav-open');
    navToggleBtn.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when a nav link is clicked
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      body.classList.remove('nav-open');
      navToggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
};

// ============================================================================
// 2. SCROLL-BASED NAVIGATION
// ============================================================================

const scrollBasedNavigation = () => {
  const nav = document.querySelector('nav');
  if (!nav) return;

  const scrollThreshold = 50;

  window.addEventListener('scroll', () => {
    if (window.scrollY > scrollThreshold) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
};

// ============================================================================
// 3. SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================================================

const smoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');

      // Ignore empty hashes
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });
};

// ============================================================================
// 4. FADE-IN ON SCROLL WITH INTERSECTION OBSERVER
// ============================================================================

const fadeInOnScroll = () => {
  const elements = document.querySelectorAll('[class*="fade-in"]');
  if (elements.length === 0) return;

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optional: unobserve after element becomes visible
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  elements.forEach(element => {
    observer.observe(element);
  });
};

// ============================================================================
// 5. ACTIVE NAVIGATION HIGHLIGHTING
// ============================================================================

const activeNavigation = () => {
  const navLinks = document.querySelectorAll('.nav-link, a[data-nav-link]');
  const currentPath = window.location.pathname;

  navLinks.forEach(link => {
    const href = link.getAttribute('href');

    // Check if the link matches the current page
    if (href && currentPath.includes(href.replace(/^\//, ''))) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });
};

// ============================================================================
// 6. NEWSLETTER FORM HANDLER
// ============================================================================

const newsletterFormHandler = () => {
  const form = document.querySelector('[data-newsletter-form]');
  if (!form) return;

  const localeStrings = getLocaleStrings();
  const emailInput = form.querySelector('[type="email"]');
  const successMessage = document.createElement('div');
  successMessage.className = 'newsletter-success-message';
  successMessage.setAttribute('role', 'alert');
  successMessage.innerHTML = `<p>${localeStrings.newsletterThanks}</p>`;
  successMessage.style.display = 'none';

  form.parentElement.appendChild(successMessage);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = emailInput?.value || '';

    if (!email || !isValidEmail(email)) {
      showFormError(form, localeStrings.invalidEmail);
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '...';
    submitBtn.disabled = true;

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email, _formtype: 'newsletter' })
      });

      if (response.ok) {
        form.style.display = 'none';
        successMessage.style.display = 'block';
        setTimeout(() => {
          form.reset();
          form.style.display = 'block';
          successMessage.style.display = 'none';
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }, 3000);
      } else {
        throw new Error('Submission failed');
      }
    } catch (err) {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      showFormError(form, localeStrings.genericError);
    }
  });
};

// ============================================================================
// 6b. CONTACT FORM HANDLER
// ============================================================================

const contactFormHandler = () => {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;

  const localeStrings = getLocaleStrings();
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = form.querySelector('#contact-name')?.value || '';
    const email = form.querySelector('#contact-email')?.value || '';
    const subject = form.querySelector('#contact-subject')?.value || '';
    const message = form.querySelector('#contact-message')?.value || '';

    if (!email || !isValidEmail(email)) {
      showFormError(form, localeStrings.invalidEmail);
      return;
    }

    const submitBtn = form.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = localeStrings.sending;
    submitBtn.disabled = true;

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name, email, subject, message, _formtype: 'contact' })
      });

      if (response.ok) {
        form.innerHTML = `<div class="form-success" role="alert"><p>${localeStrings.contactSuccess}</p></div>`;
      } else {
        throw new Error('Submission failed');
      }
    } catch (err) {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      showFormError(form, localeStrings.genericError);
    }
  });
};

/**
 * Basic email validation helper
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Show form error message
 */
const showFormError = (form, message) => {
  let errorElement = form.querySelector('.form-error');

  if (!errorElement) {
    errorElement = document.createElement('div');
    errorElement.className = 'form-error';
    errorElement.setAttribute('role', 'alert');
    form.insertBefore(errorElement, form.firstChild);
  }

  errorElement.textContent = message;
  errorElement.style.display = 'block';

  // Hide error after 5 seconds
  setTimeout(() => {
    errorElement.style.display = 'none';
  }, 5000);
};

// ============================================================================
// 7. DASHBOARD PLACEHOLDER - CSS-BASED BAR CHART
// ============================================================================

/**
 * Creates a simple bar chart using CSS
 * @param {Object} data - Object with country/label as key and value as number
 * @param {HTMLElement} containerElement - Target element to render chart
 */
const createBarChart = (data, containerElement) => {
  if (!containerElement || !data || Object.keys(data).length === 0) {
    console.warn('Invalid data or container for bar chart');
    return;
  }

  // Find max value for scaling
  const values = Object.values(data);
  const maxValue = Math.max(...values);

  // Clear container
  containerElement.innerHTML = '';

  // Create chart wrapper
  const chartWrapper = document.createElement('div');
  chartWrapper.className = 'bar-chart';

  // Create bars
  Object.entries(data).forEach(([label, value]) => {
    const barContainer = document.createElement('div');
    barContainer.className = 'bar-item';

    const label_el = document.createElement('div');
    label_el.className = 'bar-label';
    label_el.textContent = label;

    const barOuter = document.createElement('div');
    barOuter.className = 'bar-outer';

    const bar = document.createElement('div');
    bar.className = 'bar';

    // Calculate percentage for width
    const percentage = (value / maxValue) * 100;
    bar.style.width = percentage + '%';

    const valueLabel = document.createElement('span');
    valueLabel.className = 'bar-value';
    valueLabel.textContent = value.toLocaleString();

    barOuter.appendChild(bar);
    barOuter.appendChild(valueLabel);

    barContainer.appendChild(label_el);
    barContainer.appendChild(barOuter);

    chartWrapper.appendChild(barContainer);
  });

  containerElement.appendChild(chartWrapper);
};

// ============================================================================
// 8. COUNTER ANIMATION FOR STAT CARDS
// ============================================================================

const counterAnimation = () => {
  const countElements = document.querySelectorAll('[data-count]');
  if (countElements.length === 0) return;

  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        const targetValue = parseInt(entry.target.getAttribute('data-count'), 10);
        animateCounter(entry.target, targetValue);
        entry.target.classList.add('counted');
      }
    });
  }, observerOptions);

  countElements.forEach(element => {
    observer.observe(element);
  });
};

/**
 * Animate a counter from 0 to target value
 */
const animateCounter = (element, targetValue) => {
  const duration = 2000; // 2 seconds
  const startTime = Date.now();
  const startValue = 0;

  const updateCounter = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function for smooth animation
    const easedProgress = progress < 0.5
      ? 2 * progress * progress
      : -1 + (4 - 2 * progress) * progress;

    const currentValue = Math.floor(startValue + (targetValue - startValue) * easedProgress);
    element.textContent = currentValue.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = targetValue.toLocaleString();
    }
  };

  updateCounter();
};

// ============================================================================
// 9. SEARCH/FILTER FOR BLOG POSTS
// ============================================================================

const searchFilter = () => {
  const filterButtons = document.querySelectorAll('[data-filter-btn]');
  const filterCards = document.querySelectorAll('[data-category]');

  if (filterButtons.length === 0 || filterCards.length === 0) return;

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.getAttribute('data-filter-btn');

      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Filter cards
      filterCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (category === 'all' || cardCategory === category) {
          card.style.display = '';
          // Trigger fade-in animation
          setTimeout(() => {
            card.classList.add('visible');
          }, 10);
        } else {
          card.style.display = 'none';
          card.classList.remove('visible');
        }
      });
    });
  });
};

// ============================================================================
// 10. BACK TO TOP BUTTON
// ============================================================================

const backToTopButton = () => {
  const backToTopBtn = document.querySelector('[data-back-to-top]');
  if (!backToTopBtn) return;

  const scrollThreshold = 500;

  // Show/hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.scrollY > scrollThreshold) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  // Scroll to top on click
  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
};

// ============================================================================
// 11. THEME TOGGLE (DARK / LIGHT MODE)
// ============================================================================

const themeToggle = () => {
  const toggleBtn = document.querySelector('.theme-toggle');
  if (!toggleBtn) return;

  // Apply saved theme immediately (also handled by inline script for flash-free load)
  const savedTheme = localStorage.getItem('ie-theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  toggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('ie-theme', newTheme);
  });
};

// ============================================================================
// 12. LANGUAGE SWITCHER DROPDOWN
// ============================================================================

const languageSwitcherDropdown = () => {
  const switchers = document.querySelectorAll('.lang-switcher');
  if (switchers.length === 0) return;

  const closeAllSwitchers = (exception = null) => {
    switchers.forEach((switcher) => {
      if (switcher === exception) return;

      const trigger = switcher.querySelector('.lang-toggle.active') || switcher.querySelector('.lang-toggle');
      switcher.classList.remove('is-open');

      if (trigger) {
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
  };

  switchers.forEach((switcher, index) => {
    if (switcher.dataset.dropdownReady === 'true') return;

    const links = Array.from(switcher.querySelectorAll('.lang-toggle'));
    if (links.length <= 1) return;

    const activeLink = switcher.querySelector('.lang-toggle.active') || links[0];
    const alternativeLinks = links.filter(link => link !== activeLink);
    if (alternativeLinks.length === 0) return;

    const menu = document.createElement('div');
    menu.className = 'lang-menu';
    menu.id = `lang-menu-${index + 1}`;
    menu.setAttribute('aria-label', switcher.getAttribute('aria-label') || 'Language selector');

    alternativeLinks.forEach((link) => {
      menu.appendChild(link);
    });

    switcher.appendChild(menu);
    switcher.classList.add('lang-switcher--dropdown');
    switcher.dataset.dropdownReady = 'true';

    activeLink.setAttribute('aria-haspopup', 'true');
    activeLink.setAttribute('aria-expanded', 'false');
    activeLink.setAttribute('aria-controls', menu.id);

    activeLink.addEventListener('click', (event) => {
      event.preventDefault();

      const isOpening = !switcher.classList.contains('is-open');
      closeAllSwitchers(isOpening ? switcher : null);
      switcher.classList.toggle('is-open', isOpening);
      activeLink.setAttribute('aria-expanded', isOpening ? 'true' : 'false');
    });

    activeLink.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        closeAllSwitchers(switcher);
        switcher.classList.add('is-open');
        activeLink.setAttribute('aria-expanded', 'true');
        alternativeLinks[0]?.focus();
      }

      if (event.key === 'Escape') {
        switcher.classList.remove('is-open');
        activeLink.setAttribute('aria-expanded', 'false');
      }
    });

    menu.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        switcher.classList.remove('is-open');
        activeLink.setAttribute('aria-expanded', 'false');
        activeLink.focus();
      }
    });
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.lang-switcher')) {
      closeAllSwitchers();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeAllSwitchers();
    }
  });
};

// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Initialize all modules when DOM is ready
 */
const initializeApp = () => {
  // Ensure DOM is fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initModules);
  } else {
    initModules();
  }
};

/**
 * Load all modules
 */
const initModules = () => {
  console.log('Initializing Islamic Economics Website features...');

  themeToggle();
  mobileNavToggle();
  scrollBasedNavigation();
  smoothScroll();
  fadeInOnScroll();
  activeNavigation();
  newsletterFormHandler();
  contactFormHandler();
  counterAnimation();
  searchFilter();
  backToTopButton();
  languageSwitcherDropdown();

  console.log('All features initialized successfully.');
};

// Start initialization
initializeApp();

// ============================================================================
// EXPORTS FOR EXTERNAL USE (if needed in other modules)
// ============================================================================

window.IslamicEconomics = {
  createBarChart,
  animateCounter,
  isValidEmail,
  showFormError
};
