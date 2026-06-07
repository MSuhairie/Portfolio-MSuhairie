'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

const modal      = document.getElementById('projectModal');
const closeBtn   = document.getElementById('closeModal');
const slideshow  = document.getElementById('modalSlideshow');
const dotsWrap   = document.getElementById('slideDots');
const prevBtn    = document.getElementById('slidePrev');
const nextBtn    = document.getElementById('slideNext');

let currentSlide = 0;
let slides = [];
let autoPlay;

function buildSlides(imgs) {
  // Hapus slide lama (kecuali tombol & dots)
  slideshow.querySelectorAll('.slide').forEach(s => s.remove());
  dotsWrap.innerHTML = '';
  slides = [];
  currentSlide = 0;

  imgs.forEach((src, i) => {
    // Slide
    const slide = document.createElement('div');
    slide.className = 'slide' + (i === 0 ? ' active' : '');
    slide.innerHTML = `<img src="${src}" alt="slide ${i+1}" loading="lazy">`;
    slideshow.insertBefore(slide, prevBtn);
    slides.push(slide);

    // Dot
    const dot = document.createElement('button');
    dot.className = 'slide-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  // Sembunyikan tombol kalau cuma 1 foto
  const single = imgs.length <= 1;
  prevBtn.style.display = single ? 'none' : 'flex';
  nextBtn.style.display = single ? 'none' : 'flex';
  dotsWrap.style.display = single ? 'none' : 'flex';
}

function goTo(n) {
  slides[currentSlide].classList.remove('active');
  dotsWrap.children[currentSlide].classList.remove('active');
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  dotsWrap.children[currentSlide].classList.add('active');
}

prevBtn.addEventListener('click', () => { clearInterval(autoPlay); goTo(currentSlide - 1); });
nextBtn.addEventListener('click', () => { clearInterval(autoPlay); goTo(currentSlide + 1); });

// Buka modal
document.querySelectorAll('.project-item').forEach(item => {
  item.addEventListener('click', function () {
    const imgs = (this.dataset.imgs || this.dataset.img || '').split(',').map(s => s.trim()).filter(Boolean);
    buildSlides(imgs);

    document.getElementById('modalTitle').textContent    = this.dataset.title || '';
    document.getElementById('modalCategory').textContent = this.dataset.categoryLabel || '';
    document.getElementById('modalDesc').textContent     = this.dataset.desc || '';

    modal.classList.add('active');

    // Auto-play slideshow tiap 3 detik
    clearInterval(autoPlay);
    if (imgs.length > 1) {
      autoPlay = setInterval(() => goTo(currentSlide + 1), 3000);
    }
  });
});

// Tutup modal
function closeModal() {
  modal.classList.remove('active');
  clearInterval(autoPlay);
}

closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

document.addEventListener('mousemove', (e) => {
  document.body.style.setProperty('--mouse-x', e.clientX + 'px');
  document.body.style.setProperty('--mouse-y', e.clientY + 'px');
});


// Animasi Cursor Mouse
const dot  = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

// Posisi dot langsung ikut mouse
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  dot.style.left = mouseX + 'px';
  dot.style.top  = mouseY + 'px';
});

// Ring ngikut dengan animasi smooth (lerp)
function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  ring.style.left = ringX + 'px';
  ring.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

// Efek hover pada elemen interaktif
const hoverTargets = document.querySelectorAll('a, button, .project-item, [data-filter-btn]');
hoverTargets.forEach(el => {
  el.addEventListener('mouseenter', () => {
    dot.classList.add('hovered');
    ring.classList.add('hovered');
  });
  el.addEventListener('mouseleave', () => {
    dot.classList.remove('hovered');
    ring.classList.remove('hovered');
  });
});

// Sembunyikan saat keluar window
document.addEventListener('mouseleave', () => {
  dot.style.opacity  = '0';
  ring.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
  dot.style.opacity  = '1';
  ring.style.opacity = '1';
});

document.addEventListener('mousemove', (e) => {
  const particle = document.createElement('div');
  particle.style.cssText = `
    position: fixed;
    left: ${e.clientX}px;
    top: ${e.clientY}px;
    width: 6px;
    height: 6px;
    background: #f5c518;
    border-radius: 50%;
    pointer-events: none;
    z-index: 99997;
    transform: translate(-50%, -50%);
    transition: all 0.6s ease;
    opacity: 0.8;
  `;
  document.body.appendChild(particle);

  // Animasi partikel menghilang
  requestAnimationFrame(() => {
    particle.style.transform = `translate(
      calc(-50% + ${(Math.random() - 0.5) * 40}px),
      calc(-50% + ${(Math.random() - 0.5) * 40}px)
    )`;
    particle.style.opacity = '0';
    particle.style.width   = '2px';
    particle.style.height  = '2px';
  });

  // Hapus dari DOM setelah animasi selesai
  setTimeout(() => particle.remove(), 600);
});

  const loaderWrapper = document.getElementById('loaderWrapper');
  const loaderBar     = document.getElementById('loaderBar');
  const loaderPercent = document.getElementById('loaderPercent');

  let progress = 0;

  const interval = setInterval(() => {
    // Progress naik lebih cepat di awal, melambat di akhir
    if (progress < 70) {
      progress += Math.random() * 8;
    } else if (progress < 90) {
      progress += Math.random() * 3;
    } else if (progress < 99) {
      progress += Math.random() * 1;
    }

    if (progress > 100) progress = 100;

    loaderBar.style.width       = progress + '%';
    loaderPercent.textContent   = Math.floor(progress) + '%';

    // Selesai loading
    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        loaderWrapper.classList.add('hidden');
        // Pastikan konten utama muncul
        document.body.style.overflow = 'auto';
      }, 500);
    }
  }, 60);

  // Sembunyikan scroll saat loading
  document.body.style.overflow = 'hidden';

  // Fallback: paksa hilang setelah 5 detik
  setTimeout(() => {
    loaderWrapper.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }, 5000);

  // ── TYPING EFFECT ──
const typingTexts = [
  "Fullstack Developer",
  "Analyst Programmer",
  "Web Programmer",
  "Software Enginner",
  "IT Programmer",
  "IT Support",
  "Data Analyst",
];

let textIndex   = 0;
let charIndex   = 0;
let isDeleting  = false;
const typingEl  = document.getElementById('typingText');
const typeSpeed = 100;   // kecepatan ketik (ms)
const deleteSpeed = 50;  // kecepatan hapus (ms)
const pauseTime = 1800;  // jeda sebelum hapus (ms)

function typeEffect() {
  if (!typingEl) return;

  const currentText = typingTexts[textIndex];

  if (!isDeleting) {
    // Sedang mengetik
    typingEl.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentText.length) {
      // Selesai ketik → jeda lalu mulai hapus
      isDeleting = true;
      setTimeout(typeEffect, pauseTime);
      return;
    }
  } else {
    // Sedang menghapus
    typingEl.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      // Selesai hapus → pindah ke teks berikutnya
      isDeleting = false;
      textIndex  = (textIndex + 1) % typingTexts.length;
    }
  }

  setTimeout(typeEffect, isDeleting ? deleteSpeed : typeSpeed);
}

// Mulai setelah loading screen selesai
setTimeout(typeEffect, 1500);

// Particles khusus loading screen
particlesJS('loader-particles', {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: '#f5c518' },
    shape: { type: 'circle' },
    opacity: {
      value: 0.4,
      random: true,
      anim: { enable: true, speed: 1, opacity_min: 0.1 }
    },
    size: {
      value: 2,
      random: true
    },
    line_linked: {
      enable: true,
      distance: 120,
      color: '#f5c518',
      opacity: 0.2,
      width: 1
    },
    move: {
      enable: true,
      speed: 1.2,
      direction: 'none',
      random: true,
      out_mode: 'out'
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: { enable: false },
      onclick: { enable: false }
    }
  },
  retina_detect: true
});

// ── MARQUEE DUPLIKASI ──
const marqueeTrack = document.querySelector('.marquee-track');
if (marqueeTrack) {
  marqueeTrack.innerHTML += marqueeTrack.innerHTML;
}
  