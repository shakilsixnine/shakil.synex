/* =============================================
   MOHAMMAD SHAKIL | Cybersecurity Portfolio
   script.js – Vanilla JS, No Frameworks
   ============================================= */

/* ===== EMAILJS INIT ===== */
(function () {
  emailjs.init('9kkw4ieYN17zA5jxC');
})();

/* ===== HELPERS ===== */
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

/* ===== DOM READY ===== */
document.addEventListener('DOMContentLoaded', () => {

  /* ---- Footer year ---- */
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Navbar scroll effect ---- */
  const navbar = $('#navbar');
  function handleNavbarScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  /* ---- Hamburger menu ---- */
  const hamburger = $('#hamburger');
  const navLinks  = $('#navLinks');
  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    navLinks.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
  });
  // Close on nav-link click
  $$('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---- Active nav link on scroll ---- */
  const sections = $$('section[id]');
  function updateActiveLink() {
    const scrollY = window.scrollY + 90;
    sections.forEach(sec => {
      const top    = sec.offsetTop;
      const height = sec.offsetHeight;
      const id     = sec.getAttribute('id');
      const link   = $$(`.nav-link[href="#${id}"]`);
      link.forEach(l => {
        if (scrollY >= top && scrollY < top + height) {
          $$('.nav-link').forEach(a => a.classList.remove('active'));
          l.classList.add('active');
        }
      });
    });
  }
  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

  /* ---- Back to Top ---- */
  const backTop = $('#backTop');
  window.addEventListener('scroll', () => {
    backTop.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  backTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---- Typing Effect ---- */
  const typingEl   = $('#typingText');
  const typingList = [
    'Cybersecurity Specialist',
    'Social Media Security Expert',
    'Account Recovery Expert',
  ];
  let tIdx = 0, cIdx = 0, deleting = false;

  function typeLoop() {
    const current = typingList[tIdx];
    if (!deleting) {
      typingEl.textContent = current.substring(0, cIdx + 1);
      cIdx++;
      if (cIdx === current.length) {
        deleting = true;
        setTimeout(typeLoop, 1800);
        return;
      }
    } else {
      typingEl.textContent = current.substring(0, cIdx - 1);
      cIdx--;
      if (cIdx === 0) {
        deleting = false;
        tIdx = (tIdx + 1) % typingList.length;
      }
    }
    setTimeout(typeLoop, deleting ? 48 : 80);
  }
  if (typingEl) typeLoop();

  /* ---- Scroll Reveal ---- */
  const revealEls = $$('.reveal');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObs.observe(el));

  /* ---- Animated Skill Bars ---- */
  const fills   = $$('.sk-fill');
  const skillObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const w   = bar.getAttribute('data-w') || '0';
        bar.style.width = w + '%';
        skillObs.unobserve(bar);
      }
    });
  }, { threshold: 0.4 });
  fills.forEach(f => skillObs.observe(f));

  /* ---- Contact Form & EmailJS ---- */
  const form      = $('#contactForm');
  const submitBtn = $('#submitBtn');
  const formMsg   = $('#formMsg');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Basic validation
      const fullName = $('#fullName').value.trim();
      const email    = $('#email').value.trim();
      const subject  = $('#subject').value.trim();
      const message  = $('#message').value.trim();

      if (!fullName || !email || !subject || !message) {
        showFormMsg('Please fill in all required fields.', 'error');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showFormMsg('Please enter a valid email address.', 'error');
        return;
      }

      // Show loading
      setLoading(true);
      clearFormMsg();

      // Build template params matching your EmailJS template variables
      const templateParams = {
        from_name:    fullName,
        from_email:   email,
        phone:        $('#phone').value.trim() || 'Not provided',
        subject:      subject,
        message:      message,
        to_name:      'Mohammad Shakil',
      };

      try {
        await emailjs.send(
          'service_k1bpsb8',    // Service ID
          'template_bero54c',   // Template ID
          templateParams
        );
        showFormMsg('✓ Message sent successfully! I will respond within 24 hours.', 'success');
        form.reset();
      } catch (err) {
        console.error('EmailJS error:', err);
        showFormMsg('✗ Failed to send message. Please try again or email directly.', 'error');
      } finally {
        setLoading(false);
      }
    });
  }

  function setLoading(loading) {
    const label   = submitBtn.querySelector('.btn-label');
    const spinner = submitBtn.querySelector('.btn-loading');
    if (loading) {
      label.style.display   = 'none';
      spinner.style.display = 'inline-flex';
      submitBtn.disabled    = true;
    } else {
      label.style.display   = 'inline-flex';
      spinner.style.display = 'none';
      submitBtn.disabled    = false;
    }
  }

  function showFormMsg(text, type) {
    formMsg.textContent = text;
    formMsg.className   = 'form-msg ' + type;
  }

  function clearFormMsg() {
    formMsg.textContent = '';
    formMsg.className   = 'form-msg';
  }

});
