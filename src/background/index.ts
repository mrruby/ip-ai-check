import type { Message } from "../types/message";

const API_URL = "http://localhost:3001";

const fetchMessages = async (): Promise<Message[]> => {
  const response = await fetch(`${API_URL}/messages`);
  if (!response.ok) {
    throw new Error("Failed to fetch messages");
  }
  return response.json();
};

const checkForNewMessages = async () => {
  try {
    const messages = await fetchMessages();
    const storedMessages = await chrome.storage.local.get("messages");
    const newMessages = messages.filter(
      (message: Message) =>
        !storedMessages.messages?.some((m: Message) => m.id === message.id)
    );

    if (newMessages.length > 0) {
      await chrome.storage.local.set({
        messages: [...newMessages, ...(storedMessages.messages || [])],
      });
      chrome.action.setBadgeText({ text: newMessages.length.toString() });
    }
  } catch (error) {
    console.error("Error checking for new messages:", error);
  }
};

chrome.alarms.create("checkMessages", { periodInMinutes: 1 });

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "checkMessages") {
    checkForNewMessages();
  }
});

checkForNewMessages();
