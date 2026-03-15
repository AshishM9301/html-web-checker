const form = document.getElementById('check-form');
const urlInput = document.getElementById('url-input');
const result = document.getElementById('result');
const htmlContent = document.getElementById('html-content');
const loading = document.getElementById('loading');
const error = document.getElementById('error');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const url = urlInput.value.trim();
  if (!url) return;

  result.classList.add('hidden');
  error.classList.add('hidden');
  loading.classList.remove('hidden');

  try {
    const response = await fetch(url);
    const html = await response.text();
    
    htmlContent.textContent = html;
    result.classList.remove('hidden');
  } catch (err) {
    error.textContent = `Error: ${err.message}`;
    error.classList.remove('hidden');
  } finally {
    loading.classList.add('hidden');
  }
});
