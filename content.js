document.addEventListener('mouseup', () => {
  const selectedText = window.getSelection().toString().trim();


  const existingBtn = document.getElementById('save-highlight-btn');
  if (existingBtn) existingBtn.remove();

  if (selectedText.length === 0) return;

  const range = window.getSelection().getRangeAt(0);
  const rect = range.getBoundingClientRect();

  const btn = document.createElement('button');
  btn.id = 'save-highlight-btn';
  btn.textContent = 'Save';
  btn.style.position = 'absolute';
  btn.style.top = `${rect.bottom + window.scrollY + 5}px`;
  btn.style.left = `${rect.left + window.scrollX}px`;
  btn.style.zIndex = 9999;
  btn.style.padding = '5px 10px';
  btn.style.backgroundColor = '#007bff';
  btn.style.color = 'white';
  btn.style.border = 'none';
  btn.style.borderRadius = '4px';
  btn.style.cursor = 'pointer';
  btn.style.fontSize = '14px';
  btn.style.boxShadow = '0 2px 6px rgba(0,0,0,0.3)';

  document.body.appendChild(btn);

  btn.addEventListener('click', () => {
    console.log('Save button clicked');

    const data = {
      text: selectedText,
      title: document.title,
      url: window.location.href,
      timestamp: new Date().toISOString()
    };

    chrome.runtime.sendMessage({ action: 'saveHighlight', data }, () => {
      console.log('Message sent to background');
      btn.remove();
      console.log('Button removed');
    });
  });
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'removeButton') {
    const btn = document.getElementById('save-highlight-btn');
    if (btn) {
      console.log('Removing button on demand');
      btn.remove();
    }
  }
});