const express = require('express');
const path = require('path');
const { isBot } = require('./lib/bot-detection');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from root folder
app.use(express.static(__dirname));

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

console.log(detectBot(req));

// Main route - serve different HTML based on bot detection
app.use(express.static(__dirname, { index: false }));


// Explicit routes for redirect fallback
app.get('/agent', (req, res) => {
  res.sendFile(path.join(__dirname, 'agent.html'));
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});

// API endpoint to check if a URL is accessible
app.get('/api/check', async (req, res) => {
  const { url } = req.query;
  
  if (!url) {
    return res.json({ success: false, error: 'URL is required' });
  }

  try {
    const response = await fetch(url);
    const html = await response.text();
    
    res.json({
      success: true,
      url,
      html,
      status: response.status,
      headers: {
        'content-type': response.headers.get('content-type'),
      },
    });
  } catch (error) {
    res.json({
      success: false,
      url,
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Bot detection: ${require('./lib/bot-detection').isBot('Claude-Web') ? 'ACTIVE' : 'CHECKING'}`);
});
