$html = Get-Content "C:\Users\Administrator\deepseek-omegat-plugin\new_post.html" -Raw
$bytes = [Text.Encoding]::UTF8.GetBytes($html)
$b64 = [Convert]::ToBase64String($bytes)
$js = Get-Content "C:\Users\Administrator\deepseek-omegat-plugin\set_iframe_ref_ready.js" -Raw
$js = $js.Replace("B64CONTENT", $b64)
[System.IO.File]::WriteAllText("C:\Users\Administrator\deepseek-omegat-plugin\set_iframe_ref_ready.js", $js, [Text.UTF8Encoding]::new($false))
Write-Output "Done"
