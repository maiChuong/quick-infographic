// exportImage.js — Captures the canvas and exports it as PNG or JPG

export function initExportImage() {
  const exportBtn = document.getElementById('export-btn');
  const formatSelect = document.getElementById('export-format');

  exportBtn?.addEventListener('click', () => {
    const format = formatSelect?.value || 'png';
    exportCanvas(format);
  });
}

function exportCanvas(format = 'png') {
  const canvasArea = document.getElementById('editor-canvas');
  if (!canvasArea) return;

  import('https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js')
    .then(({ default: html2canvas }) => {
      html2canvas(canvasArea, {
        useCORS: true,
        backgroundColor: null,
        scale: 2
      }).then(canvas => {
        const mimeType = format === 'jpg' ? 'image/jpeg' : 'image/png';
        const link = document.createElement('a');
        link.download = `quick-infographic.${format}`;
        link.href = canvas.toDataURL(mimeType);
        link.click();
      });
    })
    .catch(err => {
      console.error('Export failed:', err);
      window.dispatchEvent(new CustomEvent('show-modal', {
        detail: {
          title: 'Export Error',
          message: 'Something went wrong while exporting your image.',
          buttons: [{ label: 'OK', action: 'close-modal' }]
        }
      }));
    });
}
