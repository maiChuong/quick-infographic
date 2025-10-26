// textStickerManager.js — Handles adding and positioning text and stickers

let textStickerIdCounter = 0;

export function initTextStickerManager() {
  const addTextBtn = document.getElementById('add-text-btn');
  const addStickerBtn = document.getElementById('add-sticker-btn');

  addTextBtn?.addEventListener('click', () => {
    const text = prompt('Enter your text:');
    if (text) {
      createTextSticker({ type: 'text', content: text });
    }
  });

  addStickerBtn?.addEventListener('click', () => {
    const stickerSrc = prompt('Enter sticker image URL:');
    if (stickerSrc) {
      createTextSticker({ type: 'sticker', content: stickerSrc });
    }
  });
}

function createTextSticker({ type, content }) {
  const canvasArea = document.getElementById('editor-canvas');
  const el = document.createElement(type === 'text' ? 'div' : 'img');
  const id = `ts-${++textStickerIdCounter}`;

  el.className = 'text-sticker';
  el.dataset.id = id;
  el.draggable = true;
  el.style.position = 'absolute';
  el.style.left = '50px';
  el.style.top = '50px';
  el.style.zIndex = 3000 + textStickerIdCounter;

  if (type === 'text') {
    el.textContent = content;
    el.contentEditable = true;
    el.style.fontSize = '18px';
    el.style.color = '#333';
    el.style.padding = '4px 8px';
    el.style.background = 'rgba(255,255,255,0.7)';
    el.style.borderRadius = '4px';
  } else {
    el.src = content;
    el.alt = 'Sticker';
    el.style.width = '80px';
    el.style.height = '80px';
  }

  el.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text-sticker-id', id);
  });

  canvasArea.appendChild(el);
  enableDragDrop(el);
}

function enableDragDrop(el) {
  const canvasArea = document.getElementById('editor-canvas');

  canvasArea.addEventListener('dragover', e => e.preventDefault());
  canvasArea.addEventListener('drop', e => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text-sticker-id');
    const draggedEl = document.querySelector(`[data-id="${id}"]`);
    if (draggedEl) {
      const rect = canvasArea.getBoundingClientRect();
      draggedEl.style.left = `${e.clientX - rect.left - draggedEl.offsetWidth / 2}px`;
      draggedEl.style.top = `${e.clientY - rect.top - draggedEl.offsetHeight / 2}px`;
    }
  });
}
