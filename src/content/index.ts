const getPageContent = () => {
  const title = document.title;
  const url = window.location.href;
  const content = document.body.innerText;
  const html = document.documentElement.outerHTML;
  const metaTags = Array.from(document.getElementsByTagName("meta")).map(
    (meta) => ({
      name: meta.getAttribute("name"),
      content: meta.getAttribute("content"),
    })
  );
  const links = Array.from(document.getElementsByTagName("a")).map(
    (a) => a.href
  );

  return { title, url, content, html, metaTags, links };
};

const getRobotsTxt = async () => {
  const url = new URL(window.location.href);
  const robotsUrl = `${url.protocol}//${url.hostname}/robots.txt`;
  try {
    const response = await fetch(robotsUrl);
    if (response.ok) {
      return await response.text();
    }
  } catch (error) {
    console.error("Error fetching robots.txt:", error);
  }
  return null;
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getPageContent") {
    sendResponse(getPageContent());
    return true;
  }
  if (request.action === "getRobots") {
    getRobotsTxt().then((content) => sendResponse({ content }));
    return true;
  }
});

console.log("content");
