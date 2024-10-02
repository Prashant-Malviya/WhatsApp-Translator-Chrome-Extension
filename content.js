chrome.storage.sync.get(["userLang", "contactLang"], (data) => {
    const translateChat = (text) => {
      chrome.runtime.sendMessage(
        { type: "translate", text: text, from: "auto", to: data.userLang },
        (response) => {
          // Replace chat text with translated text
          const chatNodes = document.querySelectorAll('.message-text'); // assuming these are chat elements
          chatNodes.forEach(node => node.textContent = response.translatedText);
        }
      );
    };
  
    // MutationObserver to detect new messages and translate them
    const chatObserver = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.addedNodes) {
          mutation.addedNodes.forEach(node => {
            if (node.classList.contains('message-text')) {
              translateChat(node.textContent);
            }
          });
        }
      });
    });
  
    const chatContainer = document.querySelector('.chat-container'); // adjust selector based on WhatsApp DOM
    chatObserver.observe(chatContainer, { childList: true, subtree: true });
  });
  