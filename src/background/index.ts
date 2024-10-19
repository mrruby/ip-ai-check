console.log("background");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getPageContent") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab.id) {
        chrome.tabs.sendMessage(
          activeTab.id,
          { action: "getPageContent" },
          (response) => {
            if (chrome.runtime.lastError) {
              console.log(chrome.runtime.lastError.message);
              // Handle the error appropriately
            } else {
              // Process the response
              console.log(response);
              sendResponse(response);
            }
          }
        );
      }
    });
    return true; // Indicates that the response will be sent asynchronously
  }
});
