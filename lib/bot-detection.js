const BOT_USER_AGENTS = [
  // Claude
  'claude-web',
  'claude bot',
  'anthropic-ai',
  // OpenAI
  'gptbot',
  'chatgpt-user',
  'openai',
  'openai-callee',
  // Google
  'google-extended',
  'googleother',
  'google-inspectiontool',
  // Facebook/Meta
  'facebookbot',
  'meta-externalbot',
  // Amazon
  'amazonbot',
  // Microsoft
  'bingbot',
  'bingpreview',
  'msnbot',
  // Slack
  'slackbot',
  // Discord
  'discordbot',
  // Twitter
  'twitterbot',
  // Apple
  'applebot',
  // DuckDuckGo
  'duckduckbot',
  // Yandex
  'yandexbot',
  // Perplexity
  'perplexitybot',
  // Common AI agent patterns
  'ai bot',
  'crawl',
  'spider',
  'scraper',
];

function isBot(userAgent) {
  if (!userAgent) return false;
  
  const lowerUA = userAgent.toLowerCase();
  
  return BOT_USER_AGENTS.some(bot => lowerUA.includes(bot.toLowerCase()));
}

function detectBot(req) {
  const userAgent = req.headers['user-agent'] || '';
  return isBot(userAgent);
}

module.exports = { isBot, detectBot };
