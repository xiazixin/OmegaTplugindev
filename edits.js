const links = document.querySelectorAll('a');
const result = [];
links.forEach(l => {
  if (l.textContent.trim() === 'Edit' && l.href.endsWith('/edit')) {
    const msg = l.closest('.message');
    const author = msg ? (msg.getAttribute('data-author') || '?') : '?';
    const h = l.closest('li[id^=post-]') || msg;
    result.push({href: l.href, author: author});
  }
});
return JSON.stringify(result);
