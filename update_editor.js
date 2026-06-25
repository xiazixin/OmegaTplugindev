// Read file and set editor content
const fs = require('fs');
const path = require('path');
const content = fs.readFileSync(path.join(__dirname, 'new_post.html'), 'utf8');
const ta = document.getElementById('ctrl_message_html');
if (ta) {
  ta.value = content;
  ta.dispatchEvent(new Event('input', { bubbles: true }));
  return 'Updated: ' + content.length + ' chars';
}
return 'textarea not found';
