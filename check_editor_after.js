const ta = document.getElementById('ctrl_message_html');
if (!ta) return 'NO';
return ta.value.substring(0, 400);
