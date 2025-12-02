(() => {
  chrome.runtime.onMessage.addListener((Message, sender, sendResponse) => {
    if (!Message || !Message.Message) { return; }
    if (Message.Message === "persistDownloadState") {
      const data = Message.data || {};
      chrome.storage.local.set({ m3u8DownloadState: data }, () => { sendResponse("ok"); });
      return true;
    }
    if (Message.Message === "offscreenPing") {
      sendResponse("pong");
      return true;
    }
  });
  setInterval(() => { chrome.storage.local.get({ m3u8DownloadState: {} }, () => {}); }, 20000);
})();
