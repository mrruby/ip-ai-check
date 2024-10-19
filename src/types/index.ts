export interface PageContent {
  title: string;
  url: string;
  content: string;
  html: string;
  metaTags: Record<string, string>;
  links: string[];
}

export interface RobotsResult {
  parsedRobots: {
    rules: Array<{
      userAgent: string;
      disallows: string[];
      allows: string[];
    }>;
    sitemaps: string[];
  };
  isAllowed: boolean;
}
