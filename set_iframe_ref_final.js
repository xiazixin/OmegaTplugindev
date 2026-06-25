const b64 = 'B64CONTENT';
const html = decodeURIComponent(atob(b64).split('').map(function(c) {return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);}).join(''));
// The 'el' is passed as the iframe element via --ref
const doc = el.contentDocument || el.contentWindow.document;
if (!doc) return 'NO_DOC';
doc.body.innerHTML = html;
// Also trigger the change event on the iframe
if (doc.body.dispatchEvent) {
  doc.body.dispatchEvent(new Event('input', { bubbles: true }));
}
return 'DONE:' + html.length;
