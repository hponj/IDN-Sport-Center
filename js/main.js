// main.js (place in /js/main.js)

// Init AOS
AOS.init({ once: true, duration: 800, easing: 'ease-out-cubic' });

// Navbar shrink on scroll
(function(){
  const nav = document.getElementById('mainNav');
  const brandImg = document.querySelector('#mainNav .navbar-brand img');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.classList.add('shadow-lg');
      nav.style.paddingTop = '0.15rem';
      nav.style.paddingBottom = '0.15rem';
      if (brandImg) brandImg.style.width = '40px';
    } else {
      nav.classList.remove('shadow-lg');
      nav.style.paddingTop = '';
      nav.style.paddingBottom = '';
      if (brandImg) brandImg.style.width = '48px';
    }
  });
})();

// Simple Countdown (demo target: set to your real date)
(function(){
  const target = new Date();
  target.setDate(target.getDate() + 3); // contoh 3 hari lagi
  function update(){
    const now = new Date().getTime();
    const diff = target.getTime() - now;
    const days = Math.max(0, Math.floor(diff / (1000*60*60*24)));
    const hours = Math.max(0, Math.floor((diff % (1000*60*60*24)) / (1000*60*60)));
    const mins = Math.max(0, Math.floor((diff % (1000*60*60)) / (1000*60)));
    const secs = Math.max(0, Math.floor((diff % (1000*60)) / 1000));
    const elDays = document.getElementById('cd-days');
    const elHours = document.getElementById('cd-hours');
    const elMins = document.getElementById('cd-mins');
    const elSecs = document.getElementById('cd-secs');
    if(elDays) elDays.innerText = String(days).padStart(2,'0');
    if(elHours) elHours.innerText = String(hours).padStart(2,'0');
    if(elMins) elMins.innerText = String(mins).padStart(2,'0');
    if(elSecs) elSecs.innerText = String(secs).padStart(2,'0');
  }
  update();
  setInterval(update, 1000);
})();

// Optional: basic form submit placeholder
document.addEventListener('DOMContentLoaded', () => {
  const regForm = document.getElementById('regForm');
  if(regForm){
    regForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      alert('Registration submitted (demo). Replace with real endpoint.');
    });
  }
});
