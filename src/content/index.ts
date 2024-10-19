const getPageContent = () => {
  const title = document.title;
  const url = window.location.href;
  return { title, url };
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getPageContent") {
    sendResponse(getPageContent());
    return true; // Indicates that the response is sent asynchronously
  }
});
