const t = document.querySelector('textarea');
if (t) return 'textarea: ' + (t.id || t.className || t.name || 'no-id');
const ed = document.querySelector('.mce-tinymce, .tox-tinymce, .fr-box, .note-editor');
if (ed) return 'rich editor: ' + ed.className;
const ifr = document.querySelector('iframe[title*="editor"], iframe[id*="editor"]');
if (ifr) return 'iframe: ' + ifr.id;
return 'no editor found - page content: ' + document.body.innerText.substring(0, 500);
