const ta = document.getElementById('ctrl_message_html');
if (!ta) return 'NO';
const val = ta.value;
return val.substring(0, 300);
