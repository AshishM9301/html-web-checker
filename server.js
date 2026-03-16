const express = require('express');
const path = require('path');
const { isBot } = require('./lib/bot-detection');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from root folder

// Bot detection - uses external API with local fallback
async function detectBot(req) {
  const userAgent = req.headers['user-agent'] || '';
  
  // Option 1: Use external API
  try {
    const response = await fetch('https://node-agentic-ai.onrender.com/api/data', {
      headers: { 'User-Agent': userAgent }
    });
    const data = await response.json();
    if (data.agentDetected === true) return true;
  } catch (error) {
    console.log('External API failed, using local detection');
  }
  
  // Option 2: Fallback to local User-Agent detection
  return isBot(userAgent);
}

// Main route - serve different HTML based on bot detection
app.get('/', async (req, res) => {
  const isBot = await detectBot(req);
  if (isBot) {
    res.sendFile(path.join(__dirname, 'agent.html'));
  } else {
    res.sendFile(path.join(__dirname, 'home.html'));
  }
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Bot detection: ${require('./lib/bot-detection').isBot('Claude-Web') ? 'ACTIVE' : 'CHECKING'}`);
});
