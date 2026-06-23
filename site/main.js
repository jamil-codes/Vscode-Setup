// main.js – bootstrap for the Vscode‑Setup showcase website
// ES module (type="module" in index.html)

import { initThree } from './three-setup.js';
import { initFileBrowser } from './file-browser.js';

// ---------- Theme handling ----------
const THEME_KEY = 'vscodeSetupTheme';
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme(dark) {
  document.body.classList.toggle('dark', dark);
  localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light');
}

function loadTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved) {
    setTheme(saved === 'dark');
  } else {
    setTheme(prefersDark.matches);
  }
}

document.getElementById('theme-toggle').addEventListener('click', () => {
  const isDark = document.body.classList.contains('dark');
  setTheme(!isDark);
});

// ---------- Modal handling ----------
const modal = document.getElementById('file-modal');
const modalContent = document.getElementById('file-content');
const closeBtn = modal.querySelector('.close');
const downloadBtn = document.getElementById('download-btn');

function openModal(path, content) {
  modalContent.textContent = content;
  // Update download link – the raw file is served from /site/files/<path>
  downloadBtn.href = `https://raw.githubusercontent.com/jamil-codes/Vscode-Setup/main/${path}`;
  downloadBtn.download = path.split('/').pop();
  modal.classList.remove('hidden');
}

function closeModal() {
  modal.classList.add('hidden');
  modalContent.textContent = '';
}

closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

// ---------- Clipboard (copy) ----------
// Clipboard.js auto‑binds to elements with data-clipboard-target
// No extra JS needed beyond library load.

// ---------- Initialize everything ----------
window.addEventListener('DOMContentLoaded', () => {
  loadTheme();
  initThree();
  initFileBrowser(openModal);
});
