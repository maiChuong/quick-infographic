// modal.js — Reusable modal system for alerts, confirmations, and user decisions

export function initModalSystem() {
  const modalContainer = document.createElement('div');
  modalContainer.id = 'modal-container';
  modalContainer.style.display = 'none';
  document.body.appendChild(modalContainer);

  window.addEventListener('show-modal', e => {
    const { title, message, content, buttons } = e.detail;
    renderModal({ title, message, content, buttons });
  });

  window.addEventListener('close-modal', () => {
    modalContainer.style.display = 'none';
    modalContainer.innerHTML = '';
  });
}

function renderModal({ title, message, content, buttons }) {
  const modalContainer = document.getElementById('modal-container');
  modalContainer.innerHTML = '';

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';

  const modal = document.createElement('div');
  modal.className = 'modal-box';

  const header = document.createElement('h2');
  header.textContent = title;

  const body = document.createElement('p');
  body.textContent = message;

  modal.appendChild(header);
  modal.appendChild(body);

  if (content) {
    const custom = document.createElement('div');
    custom.className = 'modal-content';
    custom.appendChild(content);
    modal.appendChild(custom);
  }

  const footer = document.createElement('div');
  footer.className = 'modal-footer';

  buttons.forEach(btn => {
    const button = document.createElement('button');
    button.textContent = btn.label;
    button.onclick = () => {
      if (typeof btn.action === 'function') {
        btn.action();
      } else if (typeof btn.action === 'string') {
        window.dispatchEvent(new Event(btn.action));
      }
      window.dispatchEvent(new Event('close-modal'));
    };
    footer.appendChild(button);
  });

  modal.appendChild(footer);
  overlay.appendChild(modal);
  modalContainer.appendChild(overlay);
  modalContainer.style.display = 'block';
}
