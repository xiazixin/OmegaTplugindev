const iframe = document.querySelector('iframe[id*="redactor"], .redactor-box iframe, .redactor-editor');
if (!iframe) return 'NO_IFRAME';
const doc = iframe.contentDocument || iframe.contentWindow.document;
if (!doc) return 'NO_DOC';
return 'iframe found, body.innerHTML length: ' + doc.body.innerHTML.length;
