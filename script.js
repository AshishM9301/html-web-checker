const loadingScreen = document.getElementById('loading-screen');

async function checkAgentAndRedirect() {
  try {
    const response = await fetch('https://node-agentic-ai.onrender.com/api/data');
    const data = await response.json();

    if (data.agentDetected) {
      window.location.href = '/agent';
    } else {
      window.location.href = '/home';
    }
  } catch (error) {
    console.error('Agent detection failed:', error);
    window.location.href = '/home';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  checkAgentAndRedirect();
});
