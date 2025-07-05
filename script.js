const card = document.getElementById('card');
const cardInner = document.getElementById('card-inner');
let flipped = false;
let rotationX = 0;
let rotationY = 0;

function applyTransform() {
  const flip = flipped ? 180 : 0;
  const totalY = rotationY + flip;
  cardInner.style.transform = `rotateX(${rotationX}deg) rotateY(${totalY}deg)`;
}

document.addEventListener('mousemove', (e) => {
  rotationY = (e.clientX / window.innerWidth - 0.5) * 10;
  rotationX = -(e.clientY / window.innerHeight - 0.5) * 10;
  applyTransform();
});

card.addEventListener('click', () => {
  flipped = !flipped;
  applyTransform();
});

const cardFace = document.querySelector('.card-face.card-front');
const glistenCanvas = document.createElement('canvas');
glistenCanvas.width = card.offsetWidth;
glistenCanvas.height = card.offsetHeight;
glistenCanvas.style.position = 'absolute';
glistenCanvas.style.top = '0';
glistenCanvas.style.left = '0';
glistenCanvas.style.width = '100%';
glistenCanvas.style.height = '100%';
glistenCanvas.style.pointerEvents = 'none';
glistenCanvas.style.zIndex = '2';
cardFace.appendChild(glistenCanvas);

function drawGlistenEdge(x, y) {
  const ctx = glistenCanvas.getContext('2d');
  ctx.clearRect(0, 0, glistenCanvas.width, glistenCanvas.height);
  const cx = glistenCanvas.width / 2;
  const cy = glistenCanvas.height / 2;
  const dx = x - cx;
  const dy = y - cy;
  const angle = Math.atan2(dy, dx);
  const edgeWidth = 18; 
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);
  const grad = ctx.createLinearGradient(-glistenCanvas.width/2, 0, glistenCanvas.width/2, 0);
  grad.addColorStop(0, 'rgba(255,255,255,0.0)');
  grad.addColorStop(0.48, 'rgba(255,255,255,0.0)');
  grad.addColorStop(0.5, 'rgba(255,255,255,0.18)');
  grad.addColorStop(0.52, 'rgba(255,255,255,0.0)');
  grad.addColorStop(1, 'rgba(255,255,255,0.0)');
  ctx.globalCompositeOperation = 'lighter';
  ctx.fillStyle = grad;
  ctx.fillRect(-glistenCanvas.width/2, -glistenCanvas.height/2, glistenCanvas.width, edgeWidth);
  ctx.restore();
  ctx.globalCompositeOperation = 'source-over';
}

card.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  drawGlistenEdge(x, y);
});
card.addEventListener('mouseleave', () => {
  const ctx = glistenCanvas.getContext('2d');
  ctx.clearRect(0, 0, glistenCanvas.width, glistenCanvas.height);
});