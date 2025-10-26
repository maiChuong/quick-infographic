// layoutManager.js — Handles layout template loading and rendering

let currentLayoutId = null;
let layoutTemplates = [];

export function initLayoutManager() {
  const layoutPane = document.getElementById('layout-pane');
  const canvasArea = document.getElementById('editor-canvas');

  // Load templates from assets/templates (simulated here)
  layoutTemplates = [
    { id: 'grid-2x2', name: '2x2 Grid', slots: 4 },
    { id: 'vertical-3', name: 'Vertical 3', slots: 3 },
    { id: 'poster-1', name: 'Poster', slots: 1 }
  ];

  renderLayoutOptions(layoutPane);
}

function renderLayoutOptions(container) {
  container.innerHTML = '';
  layoutTemplates.forEach(template => {
    const btn = document.createElement('button');
    btn.className = 'layout-option';
    btn.textContent = template.name;
    btn.onclick = () => {
      currentLayoutId = template.id;
      renderLayoutTemplate(template);
    };
    container.appendChild(btn);
  });
}

function renderLayoutTemplate(template) {
  const canvasArea = document.getElementById('editor-canvas');
  canvasArea.innerHTML = ''; // Clear previous layout

  for (let i = 0; i < template.slots; i++) {
    const slot = document.createElement('div');
    slot.className = 'layout-slot';
    slot.dataset.slotIndex = i;
    slot.textContent = `Slot ${i + 1}`;
    canvasArea.appendChild(slot);
  }

  window.dispatchEvent(new CustomEvent('layout-selected', {
    detail: { layoutId: template.id, slots: template.slots }
  }));
}

export function getCurrentLayoutId() {
  return currentLayoutId;
}
