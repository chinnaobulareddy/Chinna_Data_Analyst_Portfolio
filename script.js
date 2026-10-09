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
   6. CERTIFICATION LIGHTBOX MODAL & CREDENTIAL SYSTEM (F12)
   =================================================================== */
const certData = {
  excelr: {
    title: "ExcelR – Certificate of Excellence (Data Analyst Program)",
    issuer: "ExcelR Solutions • Director: Ram Tavva",
    date: "16th October 2025",
    id: "30331/EXCELR/16102025",
    recipient: "Beemireddy Chinna Obula Reddy",
    image: "assets/images/excelr_certificate.png",
    driveUrl: "https://drive.google.com/file/d/1OzrMr8UsDxYfTLlWLnKy9gFDyfO4SAos/view"
  },
  cisco: {
    title: "Cisco – Data Analytics Essentials",
    issuer: "Cisco Networking Academy • Director: Lynn Bloomer",
    date: "20th October 2025",
    id: "Cisco Networking Academy Professional Credential",
    recipient: "Bheemireddy Chinna obula reddy",
    image: "assets/images/cisco_certificate.png",
    driveUrl: "https://drive.google.com/file/d/1bD_s4WVyig8LFR8BWr3lrBSrsKLDaPhG/view"
  }
};

function initCertModals() {
  const modalOverlay = document.getElementById('certModalOverlay');
  const modalCloseBtn = document.getElementById('certModalCloseBtn');
  const modalCloseBottomBtn = document.getElementById('certModalCloseBottomBtn');

  if (!modalOverlay) return;

  function openCertModal(key) {
    const data = certData[key];
    if (!data) return;

    const img = document.getElementById('certModalImg');
    const title = document.getElementById('certModalTitle');
    const issuer = document.getElementById('certModalIssuer');
    const meta = document.getElementById('certModalMeta');
    const driveLink = document.getElementById('certModalDriveLink');
    const downloadLink = document.getElementById('certModalDownloadLink');

    if (img) {
      img.src = data.image;
      img.alt = `${data.title} - ${data.recipient}`;
    }
    if (title) title.textContent = data.title;
    if (issuer) issuer.textContent = data.issuer;
    if (meta) {
      meta.innerHTML = `
        <span><i class="fa-regular fa-calendar-check" style="color: #2563EB;"></i> <strong>Completion Date:</strong> ${data.date}</span>
        <span><i class="fa-solid fa-id-badge" style="color: #2563EB;"></i> <strong>Certificate ID:</strong> ${data.id}</span>
        <span><i class="fa-solid fa-user-graduate" style="color: #2563EB;"></i> <strong>Candidate:</strong> ${data.recipient}</span>
      `;
    }
    if (driveLink) {
      driveLink.href = data.driveUrl;
    }
    if (downloadLink) {
      downloadLink.href = data.image;
      downloadLink.download = `${key}_certificate.png`;
    }

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCertModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Handle click on any element with data-cert-key (images, badges, preview buttons)
  document.querySelectorAll('[data-cert-key]').forEach(el => {
    el.addEventListener('click', (e) => {
      if (el.tagName === 'A' && el.getAttribute('target') === '_blank') return;
      e.preventDefault();
      const key = el.getAttribute('data-cert-key');
      openCertModal(key);
    });
  });

  // Handle backward compatibility for any data-cert elements
  document.querySelectorAll('[data-cert]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const certAttr = (el.getAttribute('data-cert') || '').toLowerCase();
      const key = certAttr.includes('cisco') ? 'cisco' : 'excelr';
      openCertModal(key);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeCertModal);
  if (modalCloseBottomBtn) modalCloseBottomBtn.addEventListener('click', closeCertModal);

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeCertModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeCertModal();
    }
  });
}

/* ===================================================================
   7. INTERACTIVE CONTACT FORM & CLIPBOARD COPY (F5, F10)
   =================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const statusBox = document.getElementById('contactFormStatus');
  const submitBtn = document.getElementById('btnSubmitContact');

  function showStatus(type, html) {
    if (!statusBox) return;
    statusBox.className = `form-status-msg ${type}`;
    statusBox.innerHTML = html;
    statusBox.style.display = 'flex';
  }

  function hideStatus() {
    if (!statusBox) return;
    statusBox.style.display = 'none';
    statusBox.innerHTML = '';
  }

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('senderName')?.value.trim() || '';
      const email = document.getElementById('senderEmail')?.value.trim() || '';
      const message = document.getElementById('senderMessage')?.value.trim() || '';

      if (!name || !email || !message) {
        showStatus('error', '<i class="fa-solid fa-circle-exclamation" style="margin-top: 2px;"></i> <span>Please fill in all required fields.</span>');
        showToast('Please fill out all required fields.');
        return;
      }

      // If viewing directly as local file:/// (FormSubmit requires HTTP/HTTPS origin)
      if (window.location.protocol === 'file:') {
        showStatus('info', '<i class="fa-solid fa-circle-info" style="margin-top: 2px;"></i> <span>Direct web form sending works on live websites (GitHub Pages) or local servers (localhost). Opening your email app as fallback...</span>');
        const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
        const body = encodeURIComponent(`Hi Chinna,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        window.location.href = `mailto:chinnaobulareddy66@gmail.com?subject=${subject}&body=${body}`;
        return;
      }

      // Set loading state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Sending Message...</span>';
      }
      hideStatus();

      try {
        const response = await fetch('https://formsubmit.co/ajax/chinnaobulareddy66@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: name,
            email: email,
            message: message,
            _replyto: email,
            _subject: `New Portfolio Message from ${name}!`,
            _template: 'table',
            _captcha: 'false'
          })
        });

        const data = await response.json();

        if (response.ok && (data.success === 'true' || data.success === true)) {
          showStatus('success', '<i class="fa-solid fa-circle-check" style="margin-top: 2px;"></i> <span><strong>Message Sent Successfully!</strong> Thank you ' + name + ', your message has been delivered to Chinna.</span>');
          showToast('Message sent successfully!');
          form.reset();
        } else if (data.message && data.message.toLowerCase().includes('activation')) {
          showStatus('info', '<i class="fa-solid fa-bell" style="margin-top: 2px;"></i> <span><strong>One-Time Activation Required:</strong> FormSubmit sent an activation link to <strong>chinnaobulareddy66@gmail.com</strong>. Please check your inbox (or Spam folder) and click <em>"Activate Form"</em>. After clicking it once, all messages will be received automatically!</span>');
          showToast('Check chinnaobulareddy66@gmail.com to activate form!');
          form.reset();
        } else {
          throw new Error(data.message || 'Submission failed');
        }
      } catch (err) {
        console.warn('FormSubmit AJAX fallback:', err);
        showStatus('info', '<i class="fa-solid fa-envelope" style="margin-top: 2px;"></i> <span>Direct web service unavailable, launching email client to send to chinnaobulareddy66@gmail.com...</span>');
        const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
        const body = encodeURIComponent(`Hi Chinna,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        window.location.href = `mailto:chinnaobulareddy66@gmail.com?subject=${subject}&body=${body}`;
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> <span>Send Message</span>';
        }
      }
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
