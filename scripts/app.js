// app.js — Entry point for Quick Infographic

import { initLayoutManager } from './layoutManager.js';
import { initPhotoManager } from './photoManager.js';
import { initTextStickerManager } from './textStickerManager.js';
import { initWatermarkManager } from './watermarkManager.js';
import { initLayerManager } from './layerManager.js';
import { initDragDrop } from './dragDrop.js';
import { initModalSystem } from './modal.js';
import { initExportImage } from './exportImage.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Quick Infographic initializing...');

  // Initialize all core modules
  initLayoutManager();
  initPhotoManager();
  initTextStickerManager();
  initWatermarkManager();
  initLayerManager();
  initDragDrop();
  initModalSystem();
  initExportImage();

  // Optional: Show welcome modal
  setTimeout(() => {
    window.dispatchEvent(new CustomEvent('show-modal', {
      detail: {
        title: 'Welcome to Quick Infographic',
        message: 'Start by selecting a layout template and uploading your photos.',
        buttons: [{ label: 'Got it', action: 'close-modal' }]
      }
    }));
  }, 500);
});
