const ta = document.getElementById('ctrl_message_html');
if (!ta) return 'NO_TA';
const parent = ta.parentElement;
const structure = [];
let el = parent;
for (let i = 0; i < 5; i++) {
  structure.push(el.tagName + '.' + (el.className || '') + '#' + (el.id || ''));
  el = el.parentElement;
  if (!el) break;
}
// Also check if jQuery has a redactor fn
if (window.jQuery && window.jQuery.fn && window.jQuery.fn.redactor) {
  structure.push('REDACTOR_AVAILABLE');
}
// Check if there's Redactor object on window
const keys = Object.keys(window).filter(k => k.toLowerCase().includes('redactor'));
if (keys.length) structure.push('window keys: ' + keys.join(','));
return JSON.stringify(structure);
