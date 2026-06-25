const b64 = 'B64CONTENT';
const html = decodeURIComponent(atob(b64).split('').map(function(c) {return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);}).join(''));
const doc = el.contentDocument || el.contentWindow.document;
if (!doc) return 'NO_DOC';
doc.body.innerHTML = html;
return 'DONE:' + html.length;
