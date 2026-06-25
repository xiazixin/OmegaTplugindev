// Snapshot-like output for finding the textarea ref
const ta = document.getElementById('ctrl_message_html');
if (ta) {
  const rect = ta.getBoundingClientRect();
  return JSON.stringify({
    id: ta.id, 
    name: ta.name,
    tag: ta.tagName,
    visible: rect.width > 0 && rect.height > 0,
    x: Math.round(rect.x),
    y: Math.round(rect.y),
    w: Math.round(rect.width),
    h: Math.round(rect.height),
    parentTag: ta.parentElement.tagName,
    parentClass: ta.parentElement.className
  });
}
return 'not found';
