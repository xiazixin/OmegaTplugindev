$html = Get-Content "C:\Users\Administrator\deepseek-omegat-plugin\new_post.html" -Raw
$escaped = $html.Replace("\", "\\").Replace("'", "\'").Replace("`n", "\n").Replace("`r", "")
$js = "const ta=document.getElementById('ctrl_message_html');" + 
      "if(!ta)return'NO';" + 
      "if(window.jQuery){window.jQuery(ta).redactor('set','$escaped');return'SET_VIA_REDACTOR';}" + 
      "return'NO_JQ';"
[System.IO.File]::WriteAllText("C:\Users\Administrator\deepseek-omegat-plugin\set_redactor.js", $js, [Text.UTF8Encoding]::new($false))
Write-Output "Done. JS length: $($js.Length)"
