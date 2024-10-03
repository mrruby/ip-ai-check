import type { Message } from "../types/message";

const API_URL = "http://localhost:3001";

const fetchMessages = async (): Promise<Message[]> => {
  const response = await fetch(`${API_URL}/messages`);
  if (!response.ok) {
    throw new Error("Failed to fetch messages");
  }
  return response.json();
};

const updateUnreadCount = (messages: Message[]): void => {
  const unreadCount = messages.filter((m: Message) => !m.read).length;
  chrome.action.setBadgeText({ text: unreadCount.toString() });
};

const mergeMessages = (
  fetchedMessages: Message[],
  storedMessages: Message[]
): Message[] =>
  fetchedMessages.map((fetchedMsg) => ({
    ...fetchedMsg,
    read:
      storedMessages.find((m) => m.id === fetchedMsg.id)?.read ??
      fetchedMsg.read,
  }));

const syncMessages = async (): Promise<void> => {
  try {
    const fetchedMessages = await fetchMessages();
    const { messages: storedMessages = [] } = await chrome.storage.local.get(
      "messages"
    );

    const updatedMessages = mergeMessages(fetchedMessages, storedMessages);

    await chrome.storage.local.set({ messages: updatedMessages });
    updateUnreadCount(updatedMessages);
  } catch (error) {
    console.error("Error syncing messages:", error);
  }
};

chrome.alarms.create("syncMessages", { periodInMinutes: 1 });

chrome.alarms.onAlarm.addListener(({ name }) => {
  if (name === "syncMessages") {
    syncMessages();
  }
});

syncMessages();
