// watermarkManager.js — Handles watermark selection, placement, and preview

let currentWatermarkSrc = null;
let watermarkOpacity = 0.5;
let watermarkScale = 1;
let watermarkZIndex = 'top'; // 'top' or 'bottom'

export function initWatermarkManager() {
  const watermarkDropdown = document.getElementById('watermark-dropdown');
  const watermarkInput = document.getElementById('watermark-upload');

  watermarkInput?.addEventListener('change', handleWatermarkUpload);
  watermarkDropdown?.addEventListener('change', e => {
    const position = e.target.value;
    previewWatermark(position);
  });
}

function handleWatermarkUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = e => {
    currentWatermarkSrc = e.target.result;
    previewWatermark('bottom-right');
  };
  reader.readAsDataURL(file);
}

function previewWatermark(position) {
  const canvasArea = document.getElementById('editor-canvas');
  removeExistingWatermark();

  if (!currentWatermarkSrc) return;

  const img = document.createElement('img');
  img.src = currentWatermarkSrc;
  img.className = 'watermark-preview';
  img.style.position = 'absolute';
  img.style.opacity = watermarkOpacity;
  img.style.pointerEvents = 'none';
  img.style.zIndex = watermarkZIndex === 'top' ? 9999 : 1000;
  img.style.transform = `scale(${watermarkScale})`;

  const { x, y } = getWatermarkPosition(canvasArea, img, position);
  img.style.left = `${x}px`;
  img.style.top = `${y}px`;

  canvasArea.appendChild(img);
}

function getWatermarkPosition(container, img, position) {
  const cw = container.offsetWidth;
  const ch = container.offsetHeight;
  const iw = 100 * watermarkScale;
  const ih = 40 * watermarkScale;

  switch (position) {
    case 'top-left': return { x: 10, y: 10 };
    case 'top-right': return { x: cw - iw - 10, y: 10 };
    case 'center': return { x: (cw - iw) / 2, y: (ch - ih) / 2 };
    case 'bottom-left': return { x: 10, y: ch - ih - 10 };
    case 'bottom-right': return { x: cw - iw - 10, y: ch - ih - 10 };
    default: return { x: cw - iw - 10, y: ch - ih - 10 };
  }
}

function removeExistingWatermark() {
  const canvasArea = document.getElementById('editor-canvas');
  const existing = canvasArea.querySelector('.watermark-preview');
  if (existing) canvasArea.removeChild(existing);
}

export function applyWatermark({ position = 'bottom-right', zIndex = 'top' }) {
  watermarkZIndex = zIndex;
  previewWatermark(position);
}
