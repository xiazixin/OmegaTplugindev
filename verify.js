// Find the first message (OP) content on the page
const msg = document.querySelector('.messageContent .messageText, article blockquote');
if (msg) return msg.innerText.substring(0, 400);
// Try another selector
const firstPost = document.querySelector('#post-8094934 .messageContent');
if (firstPost) return firstPost.innerText.substring(0, 400);
return document.body.innerText.substring(0, 500);
