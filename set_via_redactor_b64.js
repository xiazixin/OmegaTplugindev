const ta = document.getElementById('ctrl_message_html');
if (!ta) return 'NO_TA';
const b64 = 'B64CONTENT';
const html = decodeURIComponent(atob(b64).split('').map(function(c) {return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);}).join(''));
if (window.jQuery) {
  window.jQuery(ta).redactor('set', html);
  return 'REDACTOR_SET';
}
ta.value = html;
return 'DIRECT_SET';
