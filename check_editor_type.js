// Check what editor is being used
const ta = document.getElementById('ctrl_message_html');
if (!ta) return 'no textarea';

// Check if Redactor is attached
if (window.Redactor) return 'Redactor found globally';
if (window.jQuery) {
  const $ = window.jQuery;
  const el = $('#ctrl_message_html');
  if (el.data && el.data('redactor')) return 'Redactor via jQuery data';
}

// Check if there's a Redactor instance on the element
for (const key in ta) {
  if (key.startsWith('redactor') || key.includes('Redactor')) return 'Redactor on element: ' + key;
}

// Check the iframe
const iframe = document.querySelector('iframe[id*="redactor"], iframe[class*="redactor"], .redactor-box iframe');
if (iframe) return 'Redactor iframe found: ' + iframe.id;

// Check what's near the textarea
const parent = ta.parentElement;
return 'parent.tag=' + parent.tagName + ' parent.class=' + (parent.className || 'none') + ' siblings: ' + Array.from(parent.children).map(c => c.tagName + '.' + (c.className || '')).join(', ');
