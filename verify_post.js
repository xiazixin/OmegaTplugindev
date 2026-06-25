const firstPost = document.querySelector('#post-8094934 .messageContent');
if (firstPost) return firstPost.innerText.substring(0, 400);
const msg = document.querySelector('.messageContent');
if (msg) return msg.innerText.substring(0, 400);
return 'not found';
