// Initialize AOS
  AOS.init({
    duration: 1000,
    once: true,
    offset: 100
  });

  // Loading Screen
  window.addEventListener('load', () => {
    setTimeout(() => {
      const loader = document.getElementById('loader');
      loader.style.opacity = '0';
      loader.style.visibility = 'hidden';
    }, 1500);
  });

  // Create Particles
  function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 15 + 's';
      particle.style.animationDuration = (15 + Math.random() * 10) + 's';
      particlesContainer.appendChild(particle);
    }
  }
  createParticles();

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    const navbar = document.getElementById('mainNav');
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active nav link highlighting
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 100) {
        current = section.getAttribute('id');
      }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });

  // Countdown timer
  function countdown() {
    const eventDate = new Date("October 23, 2025 00:00:00").getTime();
    const timer = document.getElementById("timer");

    setInterval(() => {
      const now = new Date().getTime();
      const diff = eventDate - now;

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const mins = Math.floor((diff / (1000 * 60)) % 60);
        const secs = Math.floor((diff / 1000) % 60);

        if (timer) {
          timer.innerHTML = `
            <div class="text-center"><div class="h1 fw-bold">${String(days).padStart(2,'0')}</div><div class="text-uppercase small text-purple">Days</div></div>
            <div class="text-center"><div class="h1 fw-bold">${String(hours).padStart(2,'0')}</div><div class="text-uppercase small text-purple">Hours</div></div>
            <div class="text-center"><div class="h1 fw-bold">${String(mins).padStart(2,'0')}</div><div class="text-uppercase small text-purple">Minutes</div></div>
            <div class="text-center"><div class="h1 fw-bold">${String(secs).padStart(2,'0')}</div><div class="text-uppercase small text-purple">Seconds</div></div>
          `;
        }
      } else {
        if (timer) timer.innerHTML = "Event Started!";
      }
    }, 1000);
  }
  countdown();

  // Sport card click functionality
  document.querySelectorAll('.sport-card').forEach(card => {
    card.addEventListener('click', function() {
      const sportNameEl = this.querySelector('.sport-name');
      const sportRankEl = this.querySelector('.sport-rank');
      const sportName = sportNameEl ? sportNameEl.textContent.trim() : 'Sport';
      const sportRank = sportRankEl ? sportRankEl.textContent.trim() : '';
      
      // Create a custom modal instead of alert
      const modal = document.createElement('div');
      modal.className = 'modal fade show';
      modal.style.display = 'block';
      modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
      modal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">${sportRank} ${sportName}</h5>
              <button type="button" class="btn-close" onclick="this.closest('.modal').remove()"></button>
            </div>
            <div class="modal-body">
              <p>Viewing details for ${sportRank} ${sportName}</p>
              <p>This sport is one of the most popular activities at IDN Boarding School Sport Area.</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-main" onclick="this.closest('.modal').remove()">Close</button>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    });
  });

  // Stats animation
  function animateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
      const raw = stat.textContent.replace('+','').trim();
      const target = parseInt(raw) || 0;
      const isPlus = stat.textContent.includes('+');
      let current = 0;
      const increment = Math.max(1, Math.ceil(target / 50));

      const updateNumber = () => {
        if (current < target) {
          current += increment;
          if (current > target) current = target;
          stat.textContent = Math.floor(current) + (isPlus ? '+' : '');
          requestAnimationFrame(updateNumber);
        } else {
          stat.textContent = target + (isPlus ? '+' : '');
        }
      };
      updateNumber();
    });
  }

  // Trigger animation when visible
  try {
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateNumbers();
            obs.unobserve(entry.target);
          }
        });
      }, {threshold: 0.3});
      observer.observe(statsSection);
    }
  } catch (e) {
    // IntersectionObserver not supported, run immediately
    animateNumbers();
  }

  // Stat cards click handlers
  document.querySelectorAll('.stat-item').forEach(item => {
    item.addEventListener('click', function() {
      const labelEl = this.querySelector('.stat-label');
      const numberEl = this.querySelector('.stat-number');
      const label = labelEl ? labelEl.textContent.trim() : 'Items';
      const number = numberEl ? numberEl.textContent.trim() : '';
      
      // Create a custom modal instead of alert
      const modal = document.createElement('div');
      modal.className = 'modal fade show';
      modal.style.display = 'block';
      modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
      modal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">${number} ${label}</h5>
              <button type="button" class="btn-close" onclick="this.closest('.modal').remove()"></button>
            </div>
            <div class="modal-body">
              <p>Viewing details for ${number} ${label}</p>
              <p>This represents our achievement in building a comprehensive sports program.</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-main" onclick="this.closest('.modal').remove()">Close</button>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    });
  });

  // News card button handlers
  document.querySelectorAll('.read-more-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const card = this.closest('.news-card');
      const title = card.querySelector('.news-title').textContent;
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    });
  });

  // Scroll reveal animation
  const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
  
  const scrollRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1 });

  scrollRevealElements.forEach(element => {
    scrollRevealObserver.observe(element);
  });

  // Add ripple effect to buttons
  document.querySelectorAll('.btn-main, .btn-outline').forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Add CSS for ripple effect
  const style = document.createElement('style');
  style.textContent = `
    .btn-main, .btn-outline {
      position: relative;
      overflow: hidden;
    }
    .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.5);
      transform: scale(0);
      animation: ripple-animation 0.6s ease-out;
    }
    @keyframes ripple-animation {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);