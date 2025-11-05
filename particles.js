// ===== Particles.js =====
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const colors = ["#7209b7", "#4361ee", "#b5179e", "#4cc9f0"];
const maxParticles = 80;

// Buat partikel
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Batas layar
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 15;
    ctx.fill();
  }
}

function initParticles() {
  for (let i = 0; i < maxParticles; i++) {
    particlesArray.push(new Particle());
  }
}

function connectParticles() {
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {
      const dx = particlesArray[a].x - particlesArray[b].x;
      const dy = particlesArray[a].y - particlesArray[b].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 120) {
        ctx.beginPath();
        ctx.strokeStyle = "rgba(150,150,255,0.1)";
        ctx.lineWidth = 1;
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
        ctx.closePath();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach(p => {
    p.update();
    p.draw();
  });
  connectParticles();
  requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  particlesArray = [];
  initParticles();
});

initParticles();
animate();