export interface RobotsRule {
  userAgent: string;
  disallows: string[];
  allows: string[];
}

export interface ParsedRobotsTxt {
  rules: RobotsRule[];
  sitemaps: string[];
}

// Function to parse robots.txt and determine access rules
export const parseRobotsTxt = (robotsTxt: string): ParsedRobotsTxt => {
  const parsed: ParsedRobotsTxt = {
    rules: [],
    sitemaps: [],
  };
  if (robotsTxt) {
    const lines = robotsTxt
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#")); // Filter out empty lines and comments

    let currentUserAgent: string | null = null;
    let currentRule: RobotsRule | null = null;

    lines.forEach((line) => {
      const [directive, value] = line.split(":").map((part) => part.trim());

      if (directive.toLowerCase() === "user-agent") {
        if (currentRule) parsed.rules.push(currentRule);
        currentUserAgent = value;
        currentRule = {
          userAgent: currentUserAgent,
          disallows: [],
          allows: [],
        };
      } else if (directive.toLowerCase() === "disallow") {
        if (currentRule && value) currentRule.disallows.push(value);
      } else if (directive.toLowerCase() === "allow") {
        if (currentRule && value) currentRule.allows.push(value);
      } else if (directive.toLowerCase() === "sitemap") {
        parsed.sitemaps.push(value);
      }
    });

    if (currentRule) parsed.rules.push(currentRule);
  }

  return parsed;
};

// Function to check if a specific bot is allowed access to a path
export const isBotAllowed = (
  parsed: ParsedRobotsTxt,
  botNames: string[], // List of bot names to check
  path: string
): boolean => {
  // Check rules for each bot in the list (e.g., GPTBot, ChatGPT-User, OAI-SearchBot)
  for (const botName of botNames) {
    const botRule = parsed.rules.find(
      (rule) => rule.userAgent === botName || rule.userAgent === "*"
    );

    if (botRule) {
      if (
        botRule.disallows.some((disallowedPath) =>
          path.startsWith(disallowedPath)
        )
      ) {
        return false; // If disallowed for any bot, deny access
      }
      if (botRule.allows.some((allowedPath) => path.startsWith(allowedPath))) {
        return true; // If allowed for the bot, grant access
      }
    }
  }

  // If no rules are found for the bots, assume access is allowed
  return true;
};

export const IMPORTANT_BOTS = [
  "Amazonbot",
  "Applebot-Extended",
  "ClaudeBot",
  "Google-Extended",
  "GPTBot",
] as const;

export type ImportantBot = (typeof IMPORTANT_BOTS)[number];

export const checkBotPrevention = (
  parsed: ParsedRobotsTxt
): Record<ImportantBot, boolean> => {
  const prevention: Partial<Record<ImportantBot, boolean>> = {};

  IMPORTANT_BOTS.forEach((bot) => {
    const botRule = parsed.rules.find((rule) => rule.userAgent === bot);
    const wildcardRule = parsed.rules.find((rule) => rule.userAgent === "*");

    prevention[bot] = botRule
      ? botRule.disallows.includes("/")
      : wildcardRule
      ? wildcardRule.disallows.includes("/")
      : false;
  });

  return prevention as Record<ImportantBot, boolean>;
};

export const areAllBotsBlocked = (
  prevention: Record<string, boolean>
): boolean => {
  return Object.values(prevention).every((blocked) => blocked);
};

export const isEntireSiteBlocked = (parsed: ParsedRobotsTxt): boolean => {
  const wildcardRule = parsed.rules.find((rule) => rule.userAgent === "*");
  return wildcardRule ? wildcardRule.disallows.includes("/") : false;
};
