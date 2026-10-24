// ── Slideshow ──
let currentSlide = 0;
const slideImg = document.getElementById('slide');

function showSlide(index) {
  slideImg.style.opacity = 0;
  setTimeout(() => {
    slideImg.src = 'photos/' + photos[index];
    slideImg.style.opacity = 1;
  }, 400);
}

if (photos.length > 0) {
  showSlide(0);
  if (photos.length > 1) {
    setInterval(() => {
      currentSlide = (currentSlide + 1) % photos.length;
      showSlide(currentSlide);
    }, 4000);
  }
}

// ── Music ──
const music = document.getElementById('bg-music');
const muteBtn = document.getElementById('mute-btn');
let musicStarted = false;
let muted = false;

function toggleMusic() {
  if (!musicStarted) {
    music.play().catch(() => {});
    musicStarted = true;
    muteBtn.textContent = '🔊 Mute Music';
    return;
  }
  muted = !muted;
  music.muted = muted;
  muteBtn.textContent = muted ? '🔇 Unmute Music' : '🔊 Mute Music';
}

// ── Floating Hearts ──
const heartEmojis = ['💕', '💗', '💖', '💝', '✨', '🌸', '💫', '🎀'];
function spawnHeart() {
  const el = document.createElement('span');
  el.className = 'floating-heart';
  el.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
  el.style.left = (Math.random() * 95) + 'vw';
  el.style.fontSize = (Math.random() * 18 + 14) + 'px';
  const dur = (Math.random() * 5 + 5).toFixed(1);
  el.style.animationDuration = dur + 's';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), parseFloat(dur) * 1000);
}
setInterval(spawnHeart, 900);

// ── Confetti ──
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const colors = ['#ff6bae', '#c0467e', '#9b59b6', '#f1c40f', '#ff8c42', '#ffffff'];
const pieces = Array.from({ length: 120 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height - canvas.height,
  w: Math.random() * 10 + 6,
  h: Math.random() * 6 + 4,
  color: colors[Math.floor(Math.random() * colors.length)],
  speed: Math.random() * 2 + 1,
  angle: Math.random() * Math.PI * 2,
  spin: (Math.random() - 0.5) * 0.1,
}));

let frame = 0;
function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  pieces.forEach(p => {
    ctx.save();
    ctx.translate(p.x + p.w / 2, p.y + p.h / 2);
    ctx.rotate(p.angle);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    ctx.restore();
    p.y += p.speed;
    p.angle += p.spin;
    if (p.y > canvas.height) {
      p.y = -p.h;
      p.x = Math.random() * canvas.width;
    }
  });
  if (frame < 600) {
    requestAnimationFrame(drawConfetti);
    frame++;
  } else {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}
drawConfetti();
