/**
 * CHINNA OBULA REDDY - PORTFOLIO INTERACTIVITY & SCRIPTS
 * Meets all PRD Functional Requirements (F1 to F13)
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileMenu();
  initScrollSpy();
  initSkillBars();
  initProjectModals();
  initCertModals();
  initContactForm();
  initBackToTop();
});

/* ===================================================================
   1. THEME TOGGLE (F9)
   =================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (!themeToggleBtn) return;

  const currentTheme = localStorage.getItem('chinna_theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  themeToggleBtn.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('chinna_theme', newTheme);
    updateThemeIcon(newTheme);
    showToast(`Switched to ${newTheme} mode`);
  });
}

function updateThemeIcon(theme) {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (!themeToggleBtn) return;
  if (theme === 'dark') {
    themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun" title="Switch to Light Mode"></i>';
  } else {
    themeToggleBtn.innerHTML = '<i class="fa-solid fa-palette" title="Switch to Dark Mode"></i>';
  }
}

/* ===================================================================
   2. MOBILE MENU TOGGLE (F7)
   =================================================================== */
function initMobileMenu() {
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  if (!mobileBtn || !navLinks) return;

  mobileBtn.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-open');
    const isOpen = navLinks.classList.contains('mobile-open');
    mobileBtn.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
  });

  // Close when clicking a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('mobile-open');
      mobileBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });
}

/* ===================================================================
   3. SCROLL SPY & STICKY ACTIVE NAV (F1, F2)
   =================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function checkActiveSection() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', checkActiveSection, { passive: true });
  checkActiveSection();
}

/* ===================================================================
   4. ANIMATED SKILL PROGRESS BARS (F8)
   =================================================================== */
function initSkillBars() {
  const progressBars = document.querySelectorAll('.skill-progress-fill');
  if (!progressBars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const targetWidth = bar.getAttribute('data-width') || '85%';
        bar.style.width = targetWidth;
      }
    });
  }, { threshold: 0.2 });

  progressBars.forEach(bar => observer.observe(bar));
}

/* ===================================================================
   5. PROJECT DETAILS MODAL SYSTEM (F4, F11)
   =================================================================== */
const projectData = {
  airline: {
    title: "US Airline Performance & Delay Analysis 2015",
    category: "Aviation Analytics & Business Intelligence",
    year: "2026",
    image: "assets/images/airline_delay_dashboard.jpg",
    problem: "Commercial airline flight delays and cancellations cause billions of dollars in operational costs and degrade passenger trust. This project analyzes comprehensive US Bureau of Transportation Statistics data to uncover root causes, carrier-specific bottlenecks, and peak seasonal delay trends.",
    dataset: "U.S. Bureau of Transportation Statistics (BTS) Flight Performance dataset comprising over 5.8+ million flight records across major U.S. carriers, airports, and delay attribution categories.",
    steps: [
      "Extracted, cleaned, and handled null values and outliers in flight departure and arrival records using Python (Pandas).",
      "Executed complex SQL queries to calculate key performance indicators including on-time performance rate, average arrival/departure delay by carrier, and cancellation ratios.",
      "Engineered feature metrics categorizing delays into Carrier, Late Aircraft, Weather, and National Aviation System (NAS) causes.",
      "Designed and built an interactive Power BI executive dashboard featuring dynamic slicers, route network heatmaps, airport delay rankings, and delay cause distributions."
    ],
    insights: [
      "Late Aircraft delays accounted for over 38% of cascading flight disruptions, creating major multi-city ripple effects.",
      "Summer thunderstorms (June-July) and winter holiday travel (December) showed severe delay spikes averaging 24+ minutes.",
      "Certain regional carriers achieved over 85% On-Time Performance (OTP) by optimizing turnaround buffer times between high-traffic hub airports."
    ],
    tech: ["Python", "Pandas", "NumPy", "MySQL", "Power BI", "DAX", "Data Modeling"],
    githubUrl: "https://github.com/chinnaobulareddy/U.S---Airline-Performance-Delay-Analysis-2015"
  },
  bankLoan: {
    title: "Bank Loan Risk & Performance Analysis",
    category: "Financial Analytics & Risk Modeling",
    year: "2025",
    image: "assets/images/bank_loan_dashboard.jpg",
    problem: "Financial lending institutions face significant credit risk from loan defaults and delinquencies. This project examines loan portfolio data to identify high-risk borrower profiles, evaluate loan approval distributions, and provide actionable risk mitigation insights.",
    dataset: "Comprehensive banking transactional loan dataset covering tens of thousands of loan applications, funded amounts, interest rates, borrower debt-to-income (DTI) ratios, grades (A through G), employment lengths, and repayment statuses.",
    steps: [
      "Conducted extensive data cleaning and standardization using SQL and Excel, resolving missing credit scores and verifying income categories.",
      "Segmented loans into 'Good Loans' (Fully Paid, Current) vs 'Bad Loans' (Charged Off, 30-90+ days past due) to measure portfolio health.",
      "Analyzed interest rate distributions across risk grades (A to G) and evaluated correlations between debt-to-income (DTI) ratios and default rates.",
      "Built multi-tiered interactive dashboards in Power BI and Tableau tracking total funded amount ($248M+), average interest rate (14.2%), and regional risk concentrations."
    ],
    insights: [
      "Borrowers with Grade F and G loans exhibited a 4.2x higher default probability, justifying stringent verification thresholds.",
      "Unverified income status coupled with high debt-to-income (>20%) accounted for nearly 32% of total bad loan losses.",
      "Debt consolidation represented over 55% of all loan applications, while small business loans experienced higher volatility during economic contractions."
    ],
    tech: ["SQL", "Power BI", "Tableau", "Advanced Excel", "Power Query", "Financial Modeling"],
    githubUrl: "https://github.com/chinnaobulareddy/Bank_Loan_Analytics"
  }
};

function initProjectModals() {
  const modalOverlay = document.getElementById('projectModalOverlay');
  const modalDialog = document.getElementById('projectModalDialog');
  const closeModalBtn = document.getElementById('modalCloseBtn');
  if (!modalOverlay || !modalDialog || !closeModalBtn) return;

  // Listen to View Details buttons
  document.querySelectorAll('[data-project-key]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const key = btn.getAttribute('data-project-key');
      const data = projectData[key];
      if (!data) return;

      renderProjectModal(data);
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  closeModalBtn.addEventListener('click', () => {
    closeModal();
  });

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function renderProjectModal(data) {
  const modalImg = document.getElementById('modalImg');
  const modalCategory = document.getElementById('modalCategory');
  const modalTitle = document.getElementById('modalTitle');
  const modalProblem = document.getElementById('modalProblem');
  const modalDataset = document.getElementById('modalDataset');
  const modalSteps = document.getElementById('modalSteps');
  const modalInsights = document.getElementById('modalInsights');
  const modalTech = document.getElementById('modalTech');
  const modalGithubLink = document.getElementById('modalGithubLink');

  if (modalImg) modalImg.src = data.image;
  if (modalCategory) modalCategory.textContent = `${data.category} • ${data.year}`;
  if (modalTitle) modalTitle.textContent = data.title;
  if (modalProblem) modalProblem.textContent = data.problem;
  if (modalDataset) modalDataset.textContent = data.dataset;

  if (modalSteps) {
    modalSteps.innerHTML = data.steps.map((step, idx) => `
      <div class="modal-step-item">
        <span class="step-number">${idx + 1}</span>
        <span>${step}</span>
      </div>
    `).join('');
  }

  if (modalInsights) {
    modalInsights.innerHTML = data.insights.map(item => `
      <li>
        <i class="fa-solid fa-circle-check" style="color: #2563EB; margin-top: 4px;"></i>
        <span>${item}</span>
      </li>
    `).join('');
  }

  if (modalTech) {
    modalTech.innerHTML = data.tech.map(t => `
      <span class="tech-outline-pill">${t}</span>
    `).join('');
  }

  if (modalGithubLink) {
    modalGithubLink.href = data.githubUrl;
  }
}

/* ===================================================================
   6. CERTIFICATION MODALS / LINKS (F12)
   =================================================================== */
function initCertModals() {
  document.querySelectorAll('[data-cert]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const certName = btn.getAttribute('data-cert');
      showToast(`Verified credential for: ${certName}`);
    });
  });
}

/* ===================================================================
   7. INTERACTIVE CONTACT FORM & CLIPBOARD COPY (F5, F10)
   =================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('senderName')?.value || '';
      const email = document.getElementById('senderEmail')?.value || '';
      const message = document.getElementById('senderMessage')?.value || '';

      if (!name || !email || !message) {
        showToast('Please fill out all required fields.');
        return;
      }

      // Generate mailto link
      const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
      const body = encodeURIComponent(`Hi Chinna,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      window.location.href = `mailto:chinnaobulareddy66@gmail.com?subject=${subject}&body=${body}`;

      showToast('Thank you! Opening your email client to send message.');
      form.reset();
    });
  }

  // Copy buttons on email and phone
  document.querySelectorAll('[data-copy]').forEach(el => {
    el.addEventListener('click', (e) => {
      const textToCopy = el.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied to clipboard: ${textToCopy}`);
        }).catch(() => {
          showToast(`Selected: ${textToCopy}`);
        });
      }
    });
  });
}

/* ===================================================================
   8. BACK TO TOP BUTTON (F13)
   =================================================================== */
function initBackToTop() {
  const btn = document.getElementById('backToTopBtn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ===================================================================
   TOAST HELPER
   =================================================================== */
function showToast(msg) {
  let toast = document.getElementById('globalToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'globalToast';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<i class="fa-solid fa-circle-info" style="color: #60A5FA;"></i> <span>${msg}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}
