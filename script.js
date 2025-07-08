const card = document.getElementById('card');
const cardInner = document.getElementById('card-inner');
let flipCount = 0;
let rotationX = 0;
let rotationY = 0;

const paMsg = document.getElementById('paul-allen-message');
paMsg.style.display = 'none';




cardInner.style.transition = 'transform 0.7s cubic-bezier(0.23, 1, 0.32, 1)';

function applyTransform() {
  const totalY = rotationY + flipCount * 180;
  cardInner.style.transform = `rotateX(${rotationX}deg) rotateY(${totalY}deg)`;
}

document.addEventListener('mousemove', (e) => {
  rotationY = (e.clientX / window.innerWidth - 0.5) * 10;
  rotationX = -(e.clientY / window.innerHeight - 0.5) * 10;
  applyTransform();
});

// Create and style the flip counter element
const flipCounter = document.createElement('div');
flipCounter.style.position = 'fixed';
flipCounter.style.bottom = '10px';
flipCounter.style.right = '16px';
flipCounter.style.background = 'none';
flipCounter.style.color = '#000';
flipCounter.style.padding = '0';
flipCounter.style.borderRadius = '0';
flipCounter.style.fontFamily = 'Times New Roman, serif';
flipCounter.style.fontSize = '1rem';
flipCounter.style.zIndex = '1000';
flipCounter.style.pointerEvents = 'none';
flipCounter.textContent = `Flips: ${flipCount}`;
document.body.appendChild(flipCounter);

const cardBackFace = document.querySelector('.card-face.card-back');
const cardFrontFace = document.querySelector('.card-face.card-front');

function updateCardFaceGoldenEffect() {
  if (flipCount >= 100) {
    cardBackFace.classList.add('golden-effect');
    cardFrontFace.classList.add('golden-effect');
  } else {
    cardBackFace.classList.remove('golden-effect');
    cardFrontFace.classList.remove('golden-effect');
  }
}

function updateBottomCardFaceStyle() {
  if (flipCount > 100) {
    cardBackFace.classList.add('card-face-bottom-active');
  } else {
    cardBackFace.classList.remove('card-face-bottom-active');
  }
  updateCardFaceGoldenEffect();
}

function updateFlipCounter() {
  flipCounter.textContent = `Flips: ${flipCount}`;
  updateBottomCardFaceStyle();
  if (flipCount > 100) {
    card.classList.add('golden');
  } else {
    card.classList.remove('golden');
  }
  // Show Paul Allen message if flipCount >= 100 or if previously shown
  if (flipCount >= 100 || localStorage.getItem('paulAllenShown') === 'true') {
    paMsg.style.display = 'block';
    localStorage.setItem('paulAllenShown', 'true');
  } else {
    paMsg.style.display = 'none';
  }
}

// Load flip count and flip side from localStorage if available
const savedFlipCount = localStorage.getItem('flipCount');
if (savedFlipCount !== null) {
  flipCount = parseInt(savedFlipCount, 10) || 0;
}
let isBack = false;
const savedIsBack = localStorage.getItem('isBack');
if (savedIsBack !== null) {
  isBack = savedIsBack === 'true';
}
// Set flipCount parity to match isBack (even = front, odd = back)
if (isBack && flipCount % 2 === 0) flipCount++;
if (!isBack && flipCount % 2 === 1) flipCount--;
flipCounter.textContent = `Flips: ${flipCount}`;
applyTransform();
updateBottomCardFaceStyle();

card.addEventListener('click', () => {
  flipCount++;
  isBack = !isBack;
  localStorage.setItem('flipCount', flipCount);
  localStorage.setItem('isBack', isBack);
  applyTransform();
  updateFlipCounter();
  // If 100 flips reached, persist Paul Allen message
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


if (flipCount >= 100) {
  localStorage.setItem('paulAllenShown', 'true');
  paMsg.style.display = 'block';
}