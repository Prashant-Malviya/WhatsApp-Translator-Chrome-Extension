chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ userLang: "en", contactLang: "en" });
  });
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "translate") {
      fetch(`https://api.mymemory.translated.net/get?q=${message.text}&langpair=${message.from}|${message.to}`)
        .then(response => response.json())
        .then(data => {
          sendResponse({ translatedText: data.responseData.translatedText });
        });
      return true;
    }
  });
  