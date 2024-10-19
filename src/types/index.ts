export interface PageContent {
  title: string;
  url: string;
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
