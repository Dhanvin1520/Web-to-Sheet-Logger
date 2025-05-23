const metadataDiv = document.getElementById('metadata');
const sendBtn = document.getElementById('send-btn');

let currentData = null;

chrome.runtime.sendMessage({ action: 'getHighlight' }, (response) => {
  if (response && response.data) {
    currentData = response.data;
    displayData(currentData);
    sendBtn.disabled = false;
  }
});

function displayData(data) {
  metadataDiv.innerHTML = `
    <strong>Text:</strong> ${escapeHtml(data.text)}<br/>
    <strong>Title:</strong> ${escapeHtml(data.title)}<br/>
    <strong>URL:</strong> <a href="${data.url}" target="_blank">${escapeHtml(data.url)}</a><br/>
    <strong>Timestamp:</strong> ${escapeHtml(data.timestamp)}
  `;
}

function escapeHtml(text) {
  return text.replace(/&/g, "&amp;")
             .replace(/</g, "&lt;")
             .replace(/>/g, "&gt;")
             .replace(/"/g, "&quot;")
             .replace(/'/g, "&#039;");
}

sendBtn.addEventListener('click', () => {
  if (!currentData) return;

  alert('Data sent! (Simulated)');

  metadataDiv.textContent = 'No highlight selected yet.';
  sendBtn.disabled = true;


  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]?.id) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'removeButton' });
    }
  });

  currentData = null;
});

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  if (tabs[0]?.id) {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'removeButton' });
  }
});