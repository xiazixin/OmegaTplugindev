// Get editor content
const ta = document.querySelector('textarea');
if (ta) return ta.value;
// Otherwise get first 3000 chars of innerText
return document.documentElement.innerText.substring(0, 3000);
