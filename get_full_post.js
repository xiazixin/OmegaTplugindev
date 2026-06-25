const firstPost = document.querySelector('#post-8094934 .messageContent');
if (!firstPost) return 'NOT_FOUND';
// Get the raw HTML
const text = firstPost.innerText;
// Also try getting the HTML
const html = firstPost.innerHTML;
return JSON.stringify({text: text, htmlLength: html.length});
