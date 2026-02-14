/**
 * Islamic Economics Website - Main JavaScript
 * Provides core functionality for navigation, animations, forms, and interactive features
 */

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

  const emailInput = form.querySelector('[type="email"]');
  const successMessage = document.createElement('div');
  successMessage.className = 'newsletter-success-message';
  successMessage.setAttribute('role', 'alert');
  successMessage.innerHTML = '<p>Thank you for subscribing! Please check your email for confirmation.</p>';
  successMessage.style.display = 'none';

  form.parentElement.appendChild(successMessage);

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = emailInput?.value || '';

    // Basic email validation
    if (!email || !isValidEmail(email)) {
      showFormError(form, 'Please enter a valid email address');
      return;
    }

    // Simulate form submission
    form.style.display = 'none';
    successMessage.style.display = 'block';

    // Optional: Reset form after delay
    setTimeout(() => {
      form.reset();
      form.style.display = 'block';
      successMessage.style.display = 'none';
    }, 3000);

    // In a real application, you would send the email to a backend service here
    console.log('Newsletter subscription:', email);
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
  counterAnimation();
  searchFilter();
  backToTopButton();

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
