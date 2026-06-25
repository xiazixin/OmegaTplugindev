// Get first post text by finding the messageContent elements
const els = document.querySelectorAll('.messageContent .messageText, article .bbCodeBlock, article blockquote');
if (els.length > 0) return els[0].innerText.substring(0, 400);
// Try XenForo 1.x structure
const first = document.querySelector('#post-8094934 .messageContent');
if (first) return first.innerText.substring(0, 400);
// Last resort
return document.body.innerText.substring(0, 400);
