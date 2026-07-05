// Loader handling
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.classList.add('loader-done');
    }
    document.body.classList.remove('is-loading');
  }, 2200);
});

// Section fade-in animation
const sections = document.querySelectorAll('section');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = 1;
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.08 });

sections.forEach(s => {
  s.style.opacity = 0;
  s.style.transform = 'translateY(18px)';
  s.style.transition = 'opacity .6s ease, transform .6s ease';
  io.observe(s);
});

// Journey Map with Leaflet
const initialView = { center: [12.0, 78.6], zoom: 7 };

const map = L.map('journey-map', {
  center: initialView.center,
  zoom: initialView.zoom,
  scrollWheelZoom: false,
  zoomControl: true
});

// Cooper Hewitt Watercolor Map tiles
L.tileLayer('https://watercolormaps.collection.cooperhewitt.org/tile/watercolor/{z}/{x}/{y}.jpg', {
  attribution: '© Stamen Design, © OpenStreetMap contributors',
  maxZoom: 16
}).addTo(map);

// Add custom home button control
L.Control.Home = L.Control.extend({
  onAdd: function (map) {
    const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-home');
    const link = L.DomUtil.create('a', '', container);
    link.href = '#';
    link.title = 'Reset map view';
    link.innerHTML = '<i class="fas fa-home"></i>';

    L.DomEvent.on(link, 'click', function (e) {
      e.preventDefault();
      map.setView(initialView.center, initialView.zoom);
    });

    return container;
  }
});

new L.Control.Home({ position: 'topright' }).addTo(map);

// Timeline marker locations
const locations = [
  {
    coords: [11.0809615, 76.9983231],
    name: 'KGiSL Institute of Technology',
    label: 'KGiSL IT',
    colorClass: 'neo-marker-yellow',
    key: 'KGiSL Institute of Technology',
    companies: [
      {
        company: 'KGiSL Institute of Technology',
        role: 'B.E. CSE Student',
        city: 'Coimbatore',
        period: '2022 - 2026'
      }
    ]
  },
  {
    coords: [11.9416, 79.8083],
    name: 'Fnext (Remote)',
    label: 'Fnext (Remote)',
    colorClass: 'neo-marker-red',
    key: 'Fnext Solutions',
    companies: [
      {
        company: 'Fnext Solutions',
        role: 'Web Development Intern (Remote)',
        city: 'Puducherry',
        period: 'Jun 2025'
      }
    ]
  },
  {
    coords: [13.0827, 80.2707],
    name: 'Vulture (Remote)',
    label: 'Vulture (Remote)',
    colorClass: 'neo-marker-green',
    key: 'Vulture Lines',
    companies: [
      {
        company: 'Vulture Lines Tech Management Pvt Ltd',
        role: 'IoT Engineer Intern (Remote)',
        city: 'Chennai',
        period: 'Oct 2024'
      }
    ]
  }
];

// Store markers by location key
const markers = {};

locations.forEach(location => {
  const markerIcon = L.divIcon({
    className: `neo-marker ${location.colorClass}`,
    html: `
      <div class="neo-marker-label">${location.label}</div>
      <div class="neo-marker-pin"></div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 45],
    popupAnchor: [0, -45]
  });

  let popupContent = `
    <div class="map-popup">
      <div class="map-popup-country">${location.name}</div>
  `;

  location.companies.forEach((comp, idx) => {
    if (idx > 0) {
      popupContent += `<div class="map-popup-divider"></div>`;
    }
    popupContent += `
      <div class="map-popup-company">
        <strong>${comp.company}</strong>
        <span>${comp.role}</span>
        <small>${comp.city} | ${comp.period}</small>
      </div>
    `;
  });

  popupContent += `</div>`;

  const marker = L.marker(location.coords, { icon: markerIcon }).addTo(map);
  marker.bindPopup(popupContent);

  markers[location.key] = marker;
});

// Add click handlers to timeline items
document.querySelectorAll('.timeline-item-flat').forEach(item => {
  item.addEventListener('click', () => {
    const key = item.getAttribute('data-location');
    const marker = markers[key];
    if (marker) {
      map.setView(marker.getLatLng(), 13, {
        animate: true,
        duration: 1
      });
      setTimeout(() => {
        marker.openPopup();
      }, 500);
    }
  });
});

// Journey Timeline Book Page Effect
const journeyTimeline = document.querySelector('.journey-timeline');
const journeyTimelineBack = document.querySelector('.journey-timeline-back');
const journeyTimelineData = {
  hasStarted: false,
  startScroll: 0,
  pageRange: 200
};

function updateJourneyTimeline() {
  if (!journeyTimeline || !journeyTimelineBack) return;

  // Only run animation on desktop
  if (window.innerWidth < 769) {
    const piratePlaceholder = document.querySelector('.map-pirate-overlay-placeholder');
    if (piratePlaceholder) {
      piratePlaceholder.classList.add('active');
    }
    return;
  }

  const windowHeight = window.innerHeight;
  const rect = journeyTimeline.getBoundingClientRect();

  // Start opening when the top of the element is 90% down the viewport
  // Fully open when the top of the element is 35% down the viewport (above center screen)
  const animStart = windowHeight * 0.90;
  const animEnd = windowHeight * 0.35;
  
  let progress = (animStart - rect.top) / (animStart - animEnd);
  progress = Math.min(1, Math.max(0, progress));

  // Book left page opening - timeline rotates from back to front
  const rotateY = 180 - (180 * progress); // 180 -> 0

  // Both rotate together
  journeyTimeline.style.transform = `rotateY(${rotateY}deg)`;
  journeyTimelineBack.style.transform = `rotateY(${rotateY}deg)`;

  // Switch z-index at 90 degrees
  if (rotateY > 95) {
    // Map is visible (when book is closed)
    journeyTimeline.style.zIndex = '1';
    journeyTimelineBack.style.zIndex = '100';
  } else {
    // Timeline content is visible (when book is open)
    journeyTimeline.style.zIndex = '100';
    journeyTimelineBack.style.zIndex = '1';
  }



  // Animate map pirate image when fully open (desktop)
  const piratePlaceholder = document.querySelector('.map-pirate-overlay-placeholder');
  if (piratePlaceholder) {
    if (progress >= 0.92) {
      piratePlaceholder.classList.add('active');
    } else {
      piratePlaceholder.classList.remove('active');
    }
  }
}

window.addEventListener('scroll', updateJourneyTimeline);
window.addEventListener('resize', updateJourneyTimeline);
// Run on init
requestAnimationFrame(updateJourneyTimeline);

// Fix Leaflet rendering grey box size bugs on section intersection
const journeySection = document.getElementById('journey');
if (journeySection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          map.invalidateSize();
        }, 300);
      }
    });
  }, { threshold: 0.05 });
  observer.observe(journeySection);
}

// ---------- INK SPILL THEME TOGGLE ----------
(function() {
  const inkToggle = document.getElementById('inkToggle');
  const canvas = document.getElementById('inkCanvas');
  if (!inkToggle || !canvas) return;

  const ctx = canvas.getContext('2d');
  let currentTheme = localStorage.getItem('theme') || 'light';
  
  // Set default theme state on load
  document.body.setAttribute('data-theme', currentTheme);

  // Sync canvas size
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Easing utilities
  function easeOutCubic(x) {
    return 1 - Math.pow(1 - x, 3);
  }
  function easeInCubic(x) {
    return x * x * x;
  }

  // Animation variables
  let animId = null;
  let baseRadius = 0;
  let maxRadius = 0;
  let animStartTime = null;
  let isAnimating = false;
  let direction = 'out'; // 'out' (light->dark) or 'in' (dark->light)

  // Respect prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Calculate center coordinates matching inkToggle button
  function getToggleCenter() {
    const rect = inkToggle.getBoundingClientRect();
    return {
      cx: rect.left + rect.width / 2,
      cy: rect.top + rect.height / 2
    };
  }

  // Draw organic falling drip
  function drawDrip(progress, cx, cy) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0D0D0D';
    
    // A falling teardrop shape
    const dropY = cy + progress * 32; // falls down 32px
    const r = 3.5 + progress * 13.5; // grows as it drops
    
    ctx.beginPath();
    ctx.moveTo(cx, dropY - r * 1.6);
    ctx.quadraticCurveTo(cx + r * 1.3, dropY + r * 0.5, cx, dropY + r);
    ctx.quadraticCurveTo(cx - r * 1.3, dropY + r * 0.5, cx, dropY - r * 1.6);
    ctx.closePath();
    ctx.fill();
  }

  // Draw irregular ink blob
  function drawBlob(time, cx, cy, radius, noiseDecay = 1.0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0D0D0D'; 
    ctx.beginPath();
    
    const points = 160;
    const progressFactor = radius / maxRadius;

    for (let i = 0; i <= points; i++) {
      const theta = (i / points) * Math.PI * 2;
      
      // Multi-frequency hand-drawn wave distortion
      const w1 = Math.sin(theta * 3 + time * 0.005) * 26;
      const w2 = Math.sin(theta * 7 - time * 0.003) * 15;
      const w3 = Math.cos(theta * 12 + time * 0.002) * 8;
      const w4 = Math.sin(theta * 21) * 3;
      
      // High-frequency outline jitter simulating paper texture resistance
      const wobble = Math.sin(theta * 75) * 2.2 * Math.sin(theta * 10);
      
      // Total edge distortion multiplied by noiseDecay (for settle ripple)
      const waveAmplitude = (w1 + w2 + w3 + w4 + wobble) * (0.28 + 1.15 * progressFactor) * noiseDecay;
      const r = Math.max(0, radius + waveAmplitude);
      
      const x = cx + Math.cos(theta) * r;
      const y = cy + Math.sin(theta) * r;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.closePath();
    ctx.fill();
  }

  // Draw satellite splatter particles
  function drawSplatters(progress, cx, cy, currentRadius) {
    ctx.fillStyle = '#0D0D0D';
    const progressFactor = currentRadius / maxRadius;
    
    if (progressFactor > 0.05 && progressFactor < 0.85) {
      const splatters = [
        { angle: -2.3, distMult: 1.45, rMult: 0.12 },
        { angle: -1.75, distMult: 1.55, rMult: 0.09 },
        { angle: -1.0, distMult: 1.25, rMult: 0.07 },
        { angle: -2.9, distMult: 1.3, rMult: 0.08 }
      ];
      splatters.forEach(s => {
        const sDist = currentRadius * s.distMult;
        const sx = cx + Math.cos(s.angle) * sDist;
        const sy = cy + Math.sin(s.angle) * sDist;
        const sr = currentRadius * s.rMult + 5;
        
        ctx.beginPath();
        const sPoints = 10;
        for (let j = 0; j <= sPoints; j++) {
          const sTheta = (j / sPoints) * Math.PI * 2;
          const sNoise = Math.sin(sTheta * 3) * (sr * 0.15);
          const px = sx + Math.cos(sTheta) * (sr + sNoise);
          const py = sy + Math.sin(sTheta) * (sr + sNoise);
          if (j === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();
      });
    }
  }

  // Animation Loop
  function animate(timestamp) {
    if (!animStartTime) animStartTime = timestamp;
    const elapsed = timestamp - animStartTime;

    const coords = getToggleCenter();

    if (direction === 'out') {
      // Light -> Dark Sequence: Drip (200ms) -> Spread (550ms) -> Settle Ripple (200ms)
      const totalDuration = 950;
      let progress = elapsed / totalDuration;
      if (progress > 1) progress = 1;

      if (elapsed <= 200) {
        // Phase 1: Drip falling
        const dripProgress = elapsed / 200;
        drawDrip(dripProgress, coords.cx, coords.cy);
        animId = requestAnimationFrame(animate);
      } else if (elapsed <= 750) {
        // Phase 2: Spill & Spread
        const spreadProgress = (elapsed - 200) / 550;
        baseRadius = maxRadius * easeOutCubic(spreadProgress);
        drawBlob(timestamp, coords.cx, coords.cy, baseRadius, 1.0);
        drawSplatters(spreadProgress, coords.cx, coords.cy, baseRadius);
        animId = requestAnimationFrame(animate);
      } else if (elapsed <= 950) {
        // Phase 3: Settle Ripple
        const settleProgress = (elapsed - 750) / 200;
        const decay = Math.max(0, 1.0 - settleProgress);
        drawBlob(timestamp, coords.cx, coords.cy, maxRadius, decay);
        animId = requestAnimationFrame(animate);
      } else {
        // Finished spreading
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        
        // Soft fade out to reveal dark theme page
        canvas.style.transition = 'opacity 0.4s ease';
        canvas.style.opacity = '0';
        
        setTimeout(() => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          canvas.style.transition = '';
          canvas.style.opacity = '1';
          isAnimating = false;
          inkToggle.classList.remove('spilling');
        }, 400);
      }
    } else {
      // Dark -> Light Sequence: Ripple (150ms) -> Recede Shrink (550ms) -> Suck back drip (150ms)
      const totalDuration = 850;
      let progress = elapsed / totalDuration;
      if (progress > 1) progress = 1;

      if (elapsed <= 150) {
        // Phase 1: Pre-shrink ripple
        const settleProgress = elapsed / 150;
        const decay = Math.max(0, 1.0 - settleProgress);
        
        // Instantly swap theme underneath the dark cover
        document.body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        
        drawBlob(timestamp, coords.cx, coords.cy, maxRadius, decay);
        animId = requestAnimationFrame(animate);
      } else if (elapsed <= 700) {
        // Phase 2: Shrink back
        const recedeProgress = (elapsed - 150) / 550;
        baseRadius = maxRadius * (1.0 - easeInCubic(recedeProgress));
        drawBlob(timestamp, coords.cx, coords.cy, baseRadius, 1.0);
        animId = requestAnimationFrame(animate);
      } else if (elapsed <= 850) {
        // Phase 3: Suck back drip
        const suckProgress = (elapsed - 700) / 150;
        drawDrip(1.0 - suckProgress, coords.cx, coords.cy);
        animId = requestAnimationFrame(animate);
      } else {
        // Finished receding
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        isAnimating = false;
        inkToggle.classList.remove('spilling');
      }
    }
  }

  // Toggle Action Handler
  function toggleTheme() {
    if (isAnimating) return;
    
    currentTheme = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    
    // Respect prefers-reduced-motion (instant fade swap)
    if (prefersReducedMotion) {
      document.body.setAttribute('data-theme', currentTheme);
      localStorage.setItem('theme', currentTheme);
      return;
    }

    isAnimating = true;
    animStartTime = null;
    const coords = getToggleCenter();
    maxRadius = Math.sqrt(coords.cx * coords.cx + coords.cy * coords.cy) * 1.15;
    
    inkToggle.classList.add('spilling');

    if (currentTheme === 'dark') {
      direction = 'out';
      baseRadius = 0;
      animId = requestAnimationFrame(animate);
    } else {
      direction = 'in';
      baseRadius = maxRadius;
      animId = requestAnimationFrame(animate);
    }
  }

  inkToggle.addEventListener('click', toggleTheme);
})();

// Scroll Progress Tracker & Checkpoints logic
window.addEventListener('scroll', () => {
  const winScroll = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
  
  const fill = document.querySelector('.top-strip-fill');
  if (fill) fill.style.width = scrolled + '%';

  document.querySelectorAll('.top-strip span.checkpoint').forEach(el => {
    const pct = parseFloat(el.getAttribute('data-pct'));
    if (scrolled >= pct) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });
});

// Scroll-linked about highlights
const hlxElements = document.querySelectorAll('#about .hlx');
function updateHighlights() {
  const viewportHeight = window.innerHeight;
  hlxElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    const startPoint = viewportHeight * 0.90; // starts highlighting when entering bottom
    const endPoint = viewportHeight * 0.40;   // fully highlighted past center
    
    let progress = 0;
    if (rect.top < startPoint) {
      progress = (startPoint - rect.top) / (startPoint - endPoint);
      progress = Math.min(Math.max(progress, 0), 1);
    }
    el.style.setProperty('--hlx-progress', `${progress * 100}%`);
    if (progress > 0.5) {
      el.classList.add('highlighted');
    } else {
      el.classList.remove('highlighted');
    }
  });
}

window.addEventListener('scroll', updateHighlights);
window.addEventListener('load', updateHighlights);

// Page gap attachment scroll animation
const secondFrame = document.querySelector('.page-frame.second-frame');
const tearBottom = document.querySelector('.paper-tear-bottom');
const tapeSticker = document.querySelector('.tear-tape-sticker');
const tearShadows = document.querySelectorAll('.tear-shadow');

function updatePageGap() {
  if (!secondFrame || !tearBottom) return;
  const scrollY = window.scrollY;
  
  // The gap has height 220px, but the top/bottom outlines are offset by 30px.
  // We pull it up by 250px to overlap the outline paths and completely merge them.
  const totalTravel = 250; 
  const offset = Math.min(scrollY * 0.85, totalTravel); 
  const progress = offset / totalTravel;
  
  // Pull the bottom tear (and second frame layout flow) up
  tearBottom.style.marginTop = `-${offset}px`;

  // Fade out the paper thickness shadows as they attach (to keep it completely white/page-colored)
  tearShadows.forEach(shadow => {
    shadow.style.opacity = 1 - progress;
  });

  // Control tape sticker opacity and dynamic scale based on gap attachment progress
  if (tapeSticker) {
    tapeSticker.style.opacity = progress;
    // Slightly rotate/scale the tape as it sticks!
    tapeSticker.style.transform = `rotate(-10deg) scale(${0.85 + progress * 0.15})`;
  }
}

window.addEventListener('scroll', updatePageGap);
window.addEventListener('load', updatePageGap);

// Function for robust smooth scrolling with offset
function scrollToSection(targetId) {
  const targetSection = document.querySelector(targetId);
  const nav = document.querySelector('nav');
  if (targetSection) {
    const navHeight = nav ? nav.offsetHeight : 80;
    const offset = navHeight + 16; // height + spacing buffer
    const elementPosition = targetSection.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

// Checkpoint click navigation
const checkpoints = document.querySelectorAll('.top-strip span.checkpoint');
checkpoints.forEach(checkpoint => {
  checkpoint.addEventListener('click', () => {
    const targetId = checkpoint.getAttribute('data-target');
    if (targetId) {
      scrollToSection(targetId);
    }
  });
});

// Navigation links smooth scroll
document.querySelectorAll('nav a, nav .logo').forEach(link => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    if (targetId && targetId.startsWith('#')) {
      e.preventDefault();
      scrollToSection(targetId);
    }
  });
});

// Smart sticky navigation (reveal on scroll up)
const navElement = document.querySelector('nav');
let lastScrollY = window.scrollY || document.documentElement.scrollTop;
let isScrolling = false;

function handleSmartNav() {
  const currentScrollY = window.scrollY || document.documentElement.scrollTop;
  const clampedScrollY = Math.max(currentScrollY, 0);

  if (clampedScrollY <= 0) {
    // Always show at the very top of the page
    navElement.classList.remove('nav-hidden');
  } else if (clampedScrollY > lastScrollY && clampedScrollY > 150) {
    // Scrolling down -> hide nav
    navElement.classList.add('nav-hidden');
  } else if (clampedScrollY < lastScrollY) {
    // Scrolling up -> show nav immediately
    navElement.classList.remove('nav-hidden');
  }

  lastScrollY = clampedScrollY;
  isScrolling = false;
}

window.addEventListener('scroll', () => {
  if (!isScrolling) {
    window.requestAnimationFrame(handleSmartNav);
    isScrolling = true;
  }
}, { passive: true });

// Mobile Hamburger Navigation Controller
(function() {
  const navToggle = document.querySelector('.nav-toggle');
  const navlinks = document.querySelector('.navlinks');
  
  if (navToggle && navlinks) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navToggle.classList.toggle('active');
      navlinks.classList.toggle('active');
    });

    // Close menu when clicking outside of nav
    document.addEventListener('click', (e) => {
      if (!navlinks.contains(e.target) && !navToggle.contains(e.target)) {
        navToggle.classList.remove('active');
        navlinks.classList.remove('active');
      }
    });

    // Close menu when clicking links
    navlinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navlinks.classList.remove('active');
      });
    });
  }
})();
