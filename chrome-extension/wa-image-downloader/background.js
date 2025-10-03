chrome.action.onClicked.addListener((tab) => {
  if (tab.url.includes("web.whatsapp.com")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content.js"]
    });
  } else {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => alert("Apri WhatsApp Web per usare questa estensione.")
    });
  }
});