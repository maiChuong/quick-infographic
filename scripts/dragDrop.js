// dragDrop.js — Enables drag-and-drop interactions across layout slots and canvas elements

export function initDragDrop() {
  setupSlotDropZones();
  setupCanvasDragDrop();
}

function setupSlotDropZones() {
  const slots = document.querySelectorAll('.layout-slot');
  slots.forEach(slot => {
    slot.addEventListener('dragover', e => e.preventDefault());
    slot.addEventListener('drop', e => {
      e.preventDefault();
      const photoIndex = e.dataTransfer.getData('photo-index');
      const photoEl = document.querySelector(`.photo-thumb[data-index="${photoIndex}"]`);
      if (!photoEl) return;

      const img = document.createElement('img');
      img.src = photoEl.src;
      img.alt = photoEl.alt;
      img.className = 'slot-photo';

      slot.innerHTML = '';
      slot.appendChild(img);
    });
  });
}

function setupCanvasDragDrop() {
  const canvasArea = document.getElementById('editor-canvas');

  canvasArea.addEventListener('dragover', e => e.preventDefault());
  canvasArea.addEventListener('drop', e => {
    e.preventDefault();
    const stickerId = e.dataTransfer.getData('text-sticker-id');
    const el = document.querySelector(`[data-id="${stickerId}"]`);
    if (!el) return;

    const rect = canvasArea.getBoundingClientRect();
    const x = e.clientX - rect.left - el.offsetWidth / 2;
    const y = e.clientY - rect.top - el.offsetHeight / 2;

    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
  });
}
