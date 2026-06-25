// Get the ref-like identifier for the textarea
const ta = document.getElementById('ctrl_message_html');
if (ta) {
  return 'textarea id=' + ta.id + ' name=' + (ta.name || 'none') + ' class=' + (ta.className || 'none');
}
return 'not found';
