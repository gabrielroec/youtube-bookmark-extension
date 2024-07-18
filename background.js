chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.url && tab.url.includes("youtube.com/watch")) {
    const queryParameters = tab.url.split("?")[1];
    const urlParameters = new URLSearchParams(queryParameters);

    chrome.tabs.sendMessage(tabId, {
      type: "NEW",
      videoId: urlParameters.get("v"),
    });
  }
});

// Escutando mensagens do content script
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.type === "bookmarkAdded") {
    chrome.notifications.create("", {
      type: "basic",
      iconUrl: "assets/bookmark.png",
      title: "Bookmark Added",
      message: message.message,
      priority: 2,
    });
  }
});
