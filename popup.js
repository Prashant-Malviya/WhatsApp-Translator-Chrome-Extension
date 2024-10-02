document.getElementById('saveBtn').addEventListener('click', () => {
    const userLang = document.getElementById('userLang').value;
    const contactLang = document.getElementById('contactLang').value;
    
    chrome.storage.sync.set({ userLang, contactLang }, () => {
      alert('Languages saved!');
    });
  });
  