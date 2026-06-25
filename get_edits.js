// Find all Edit links on the page
const links = document.querySelectorAll('a');
const edits = [];
for (const l of links) {
  const text = l.textContent.trim();
  if (text === 'Edit' && l.href.endsWith('/edit')) {
    let postEl = l.closest('.message');
    let author = postEl ? (postEl.getAttribute('data-author') || '?') : '?';
    edits.push({ href: l.href, author: author });
  }
}
return JSON.stringify(edits);
