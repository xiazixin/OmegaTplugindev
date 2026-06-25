const links = document.querySelectorAll('a');
const results = [];
links.forEach(l => {
  const href = l.href || '';
  const text = (l.textContent || '').trim();
  if (text.toLowerCase() === 'edit' && href.endsWith('/edit')) {
    // Find the parent post to identify which post this is
    const postBlock = l.closest('.message') || l.closest('[data-author]') || l.closest('li');
    const author = postBlock ? (postBlock.getAttribute('data-author') || 'unknown') : 'unknown';
    results.push({ href, author, text });
  }
});
return JSON.stringify(results, null, 2);
