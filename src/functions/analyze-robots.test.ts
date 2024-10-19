import { parseRobotsTxt, isBotAllowed } from './analyze-robots';

describe('parseRobotsTxt for specific bots', () => {
  it('parses robots.txt with GPTBot Disallow rule', () => {
    const robotsTxt = `
      User-agent: GPTBot
      Disallow: /private
    `;

    const parsed = parseRobotsTxt(robotsTxt);

    expect(parsed.rules.length).toBe(1);
    expect(parsed.rules[0].userAgent).toBe('GPTBot');
    expect(parsed.rules[0].disallows).toContain('/private');
    expect(isBotAllowed(parsed, ['GPTBot'], '/private')).toBe(false); // GPTBot is disallowed
  });

  it('parses robots.txt with ChatGPT-User Allow rule', () => {
    const robotsTxt = `
      User-agent: ChatGPT-User
      Allow: /public
      Disallow: /admin
    `;

    const parsed = parseRobotsTxt(robotsTxt);

    expect(parsed.rules.length).toBe(1);
    expect(parsed.rules[0].userAgent).toBe('ChatGPT-User');
    expect(parsed.rules[0].allows).toContain('/public');
    expect(parsed.rules[0].disallows).toContain('/admin');
    expect(isBotAllowed(parsed, ['ChatGPT-User'], '/public')).toBe(true);  // ChatGPT-User is allowed
    expect(isBotAllowed(parsed, ['ChatGPT-User'], '/admin')).toBe(false); // ChatGPT-User is disallowed
  });

  it('parses robots.txt with OAI-SearchBot and wildcard rules', () => {
    const robotsTxt = `
      User-agent: OAI-SearchBot
      Disallow: /search
      User-agent: *
      Allow: /
    `;

    const parsed = parseRobotsTxt(robotsTxt);

    expect(parsed.rules.length).toBe(2);
    expect(parsed.rules[0].userAgent).toBe('OAI-SearchBot');
    expect(parsed.rules[0].disallows).toContain('/search');
    expect(parsed.rules[1].userAgent).toBe('*');
    expect(parsed.rules[1].allows).toContain('/');

    expect(isBotAllowed(parsed, ['OAI-SearchBot'], '/search')).toBe(false); // OAI-SearchBot is disallowed
    expect(isBotAllowed(parsed, ['OAI-SearchBot'], '/home')).toBe(true);   // OAI-SearchBot is allowed (default *)
  });

  it('checks if any bot is allowed based on multiple User-agent rules', () => {
    const robotsTxt = `
      User-agent: GPTBot
      Disallow: /private
      User-agent: ChatGPT-User
      Allow: /public
      Disallow: /admin
    `;

    const parsed = parseRobotsTxt(robotsTxt);

    expect(isBotAllowed(parsed, ['GPTBot'], '/private')).toBe(false);      // GPTBot is disallowed
    expect(isBotAllowed(parsed, ['ChatGPT-User'], '/public')).toBe(true);  // ChatGPT-User is allowed
    expect(isBotAllowed(parsed, ['ChatGPT-User'], '/admin')).toBe(false);  // ChatGPT-User is disallowed
    expect(isBotAllowed(parsed, ['OAI-SearchBot'], '/public')).toBe(true); // No OAI-SearchBot rule, allowed by default
  });

  it('checks access for multiple bots with wildcard rules', () => {
    const robotsTxt = `
      User-agent: *
      Disallow: /private
    `;

    const parsed = parseRobotsTxt(robotsTxt);

    expect(isBotAllowed(parsed, ['GPTBot', 'ChatGPT-User', 'OAI-SearchBot'], '/private')).toBe(false); // All bots disallowed
    expect(isBotAllowed(parsed, ['GPTBot', 'ChatGPT-User', 'OAI-SearchBot'], '/public')).toBe(true);  // All bots allowed by default
  });

  it("all bots should be disallowed", () => {
    const robotsTxt = `
          User-agent: GPTBot
      Disallow: /

      User-agent: ChatGPT-User
      Disallow: /

      User-agent: OAI-SearchBot
      Disallow: /`;

    const parsed = parseRobotsTxt(robotsTxt);

    expect(isBotAllowed(parsed, ['GPTBot', 'ChatGPT-User', 'OAI-SearchBot'], '/')).toBe(false);

  });

});