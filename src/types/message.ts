export interface Message {
  id: string;
  content: string;
  priority: "high" | "medium" | "low";
  timestamp: string;
  read: boolean;
}
