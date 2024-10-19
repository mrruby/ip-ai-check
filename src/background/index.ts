import { parseRobotsTxt, isBotAllowed } from "../functions/analyze-robots";

const handleGetPageContent = (sendResponse: (response: any) => void) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    if (activeTab.id) {
      chrome.tabs.sendMessage(
        activeTab.id,
        { action: "getPageContent" },
        (response) => {
          if (chrome.runtime.lastError) {
            console.log(chrome.runtime.lastError.message);
          } else {
            console.log(response);
            sendResponse(response);            
          }
        }
      );
    }
  });
};

const handleGetRobots = (sendResponse: (response: any) => void) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    if (activeTab.id) {
      chrome.tabs.sendMessage(
        activeTab.id,
        { action: "getRobots" },
        (response) => {
          if (chrome.runtime.lastError) {
            console.log(chrome.runtime.lastError.message);
          } else {
            const parsedRobots = parseRobotsTxt(response.content);
            const botNames = ["GPTBot", "ChatGPT-User", "OAI-SearchBot"];
            const isAllowed = isBotAllowed(parsedRobots, botNames, "/");
            sendResponse({ parsedRobots, isAllowed });
          }
        }
      );
    }
  });
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getPageContent") {
    handleGetPageContent(sendResponse);
    return true;
  }
  if (request.action === "getRobots") {
    handleGetRobots(sendResponse);
    return true;
  }
});
