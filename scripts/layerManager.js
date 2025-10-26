// layerManager.js — Manages layer stacking, visibility, and locking

let layerRegistry = [];

export function initLayerManager() {
  const layerPane = document.getElementById('layer-pane');
  window.addEventListener('layout-selected', () => {
    layerRegistry = [];
    renderLayerPane(layerPane);
  });

  window.addEventListener('element-added', e => {
    const { id, type } = e.detail;
    layerRegistry.push({ id, type, visible: true, locked: false });
    renderLayerPane(layerPane);
  });
}

function renderLayerPane(container) {
  container.innerHTML = '<h3>Layers</h3>';

  layerRegistry.slice().reverse().forEach(layer => {
    const row = document.createElement('div');
    row.className = 'layer-row';
    row.textContent = `${layer.type} (${layer.id})`;

    const btnUp = createControlButton('⬆', () => moveLayer(layer.id, 'up'));
    const btnDown = createControlButton('⬇', () => moveLayer(layer.id, 'down'));
    const btnLock = createControlButton(layer.locked ? '🔒' : '🔓', () => toggleLock(layer.id));
    const btnHide = createControlButton(layer.visible ? '👁️' : '🚫', () => toggleVisibility(layer.id));

    row.append(btnUp, btnDown, btnLock, btnHide);
    container.appendChild(row);
  });
}

function createControlButton(label, action) {
  const btn = document.createElement('button');
  btn.textContent = label;
  btn.onclick = action;
  return btn;
}

function moveLayer(id, direction) {
  const index = layerRegistry.findIndex(l => l.id === id);
  if (index === -1) return;

  const swapWith = direction === 'up' ? index + 1 : index - 1;
  if (swapWith < 0 || swapWith >= layerRegistry.length) return;

  [layerRegistry[index], layerRegistry[swapWith]] = [layerRegistry[swapWith], layerRegistry[index]];
  updateZIndices();
  renderLayerPane(document.getElementById('layer-pane'));
}

function updateZIndices() {
  layerRegistry.forEach((layer, i) => {
    const el = document.querySelector(`[data-id="${layer.id}"]`);
    if (el) el.style.zIndex = 3000 + i;
  });
}

function toggleLock(id) {
  const layer = layerRegistry.find(l => l.id === id);
  if (layer) {
    layer.locked = !layer.locked;
    renderLayerPane(document.getElementById('layer-pane'));
  }
}

function toggleVisibility(id) {
  const layer = layerRegistry.find(l => l.id === id);
  const el = document.querySelector(`[data-id="${id}"]`);
  if (layer && el) {
    layer.visible = !layer.visible;
    el.style.display = layer.visible ? 'block' : 'none';
    renderLayerPane(document.getElementById('layer-pane'));
  }
}
