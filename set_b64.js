const ta = document.getElementById('ctrl_message_html');
if (!ta) return 'NO_TEXTAREA';
const b64 = 'B64CONTENT';
const decoded = atob(b64);
ta.value = decoded;
ta.dispatchEvent(new Event('input', { bubbles: true }));
return 'OK: ' + decoded.length + ' chars set';
