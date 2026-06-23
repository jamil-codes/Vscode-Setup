// file-browser.js – builds a collapsible file explorer from files.json
// Exposes initFileBrowser(openModalCallback)

export async function initFileBrowser(openModal) {
  const response = await fetch('docs.json');
  if (!response.ok) {
    console.error('Failed to load files.json');
    return;
  }
  const files = await response.json(); // [{path, size}]
  const treeContainer = document.getElementById('file-tree');
  const searchInput = document.getElementById('search');

  // Build hierarchical tree structure
  const root = {};
  files.forEach(({ path }) => {
    const parts = path.split('/');
    let node = root;
    parts.forEach((part, idx) => {
      if (!node[part]) node[part] = { __children: {} };
      if (idx === parts.length - 1) {
        node[part].__file = true; // leaf file
      }
      node = node[part].__children;
    });
  });

  function createElement(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text) el.textContent = text;
    return el;
  }

  function buildTree(node, parentPath = '') {
    const fragment = document.createDocumentFragment();
    Object.entries(node).forEach(([name, meta]) => {
      const fullPath = parentPath ? `${parentPath}/${name}` : name;
      if (meta.__file) {
        // file entry
        const fileEl = createElement('div', 'file-item', name);
        fileEl.style.cursor = 'pointer';
        fileEl.dataset.path = fullPath;
        fileEl.addEventListener('click', async (e) => {
          e.stopPropagation();
          // Build the raw GitHub URL for the file
        const rawBase = 'https://raw.githubusercontent.com/jamil-codes/Vscode-Setup/main';
        const fileResp = await fetch(`${rawBase}/${fullPath}`);
        if (!fileResp.ok) return alert('Unable to load file');
        const content = await fileResp.text();
        // Use Prism to highlight based on extension (fallback to plain text)
        const ext = name.split('.').pop();
        const langClass = `language-${ext}`;
        const codeEl = document.getElementById('file-content');
        codeEl.className = langClass;
        codeEl.textContent = content;
        Prism.highlightElement(codeEl);
        openModal(fullPath, content);
        });
        fragment.appendChild(fileEl);
      } else {
        // directory
        const details = document.createElement('details');
        const summary = document.createElement('summary');
        summary.textContent = name;
        details.appendChild(summary);
        const childFrag = buildTree(meta.__children, fullPath);
        details.appendChild(childFrag);
        fragment.appendChild(details);
      }
    });
    return fragment;
  }

  // Initial render
  treeContainer.appendChild(buildTree(root));

  // Search filtering
  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const items = treeContainer.querySelectorAll('.file-item');
    items.forEach((el) => {
      const match = el.textContent.toLowerCase().includes(term);
      el.style.display = match ? '' : 'none';
    });
  });
}
