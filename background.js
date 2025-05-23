let latestData = null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'saveHighlight') {
    latestData = message.data;
  } else if (message.action === 'getHighlight') {
    sendResponse({ data: latestData });
  }
});