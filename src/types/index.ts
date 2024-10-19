import { ParsedRobotsTxt } from "../functions/analyze-robots";

export interface PageContent {
  title: string;
  url: string;
  content: string;
  html: string;
  metaTags: Record<string, string>;
  links: string[];
}

export interface RobotsResult {
  parsedRobots: ParsedRobotsTxt;
  isAllowed: boolean;
}
