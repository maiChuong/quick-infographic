// photoManager.js — Handles photo uploads and placement into layout slots

let uploadedPhotos = [];

export function initPhotoManager() {
  const uploadInput = document.getElementById('photo-upload');
  const photoPane = document.getElementById('photo-pane');

  uploadInput?.addEventListener('change', handlePhotoUpload);

  renderPhotoPane();
}

function handlePhotoUpload(event) {
  const files = Array.from(event.target.files);
  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = e => {
      uploadedPhotos.push({
        name: file.name,
        src: e.target.result
      });
      renderPhotoPane();
    };
    reader.readAsDataURL(file);
  });
}

function renderPhotoPane() {
  const photoPane = document.getElementById('photo-pane');
  photoPane.innerHTML = '';

  uploadedPhotos.forEach((photo, idx) => {
    const img = document.createElement('img');
    img.src = photo.src;
    img.alt = photo.name;
    img.className = 'photo-thumb';
    img.draggable = true;
    img.dataset.index = idx;

    img.addEventListener('dragstart', e => {
      e.dataTransfer.setData('photo-index', idx);
    });

    photoPane.appendChild(img);
  });

  setupDropTargets();
}

function setupDropTargets() {
  const slots = document.querySelectorAll('.layout-slot');
  slots.forEach(slot => {
    slot.addEventListener('dragover', e => e.preventDefault());
    slot.addEventListener('drop', e => {
      e.preventDefault();
      const idx = e.dataTransfer.getData('photo-index');
      const photo = uploadedPhotos[idx];
      if (!photo) return;

      slot.innerHTML = '';
      const img = document.createElement('img');
      img.src = photo.src;
      img.alt = photo.name;
      img.className = 'slot-photo';
      slot.appendChild(img);
    });
  });
}
