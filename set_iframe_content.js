// This runs inside the iframe
const body = document.body;
if (!body) return 'NO_BODY';
// Set the content
body.innerHTML = '<p>[ATTACH=full]126090[/ATTACH]</p><p>Are you tired of seeing posts about new AI tools for novel translators \u2014 yet still clinging to your old translation memories, glossaries, and all that fuzzy match data you have built up over the years while everyone else is embracing AI?</p><p><br /></p><p>I bring you a <b>plugin</b> \u2014 yes, an actual plugin. Not a scam link, not a web-based online service.</p><p><br /></p><p>[ATTACH=full]125983[/ATTACH]</p><p>With AI becoming cheaper than ever, the cost-effectiveness of AI has finally caught up with human translators. It\u2019s now no longer cheaper to hire a human than to let AI translate your novels.</p><p>Also, <b>DeepSeek offers 5 million free tokens</b> \u2014 so you\u2019re free to test the DeepSeek API at no cost!</p><p><br /></p><p><b>100% Free</b> (other than third-party API fees)</p><p><br /></p><p><b>Source Code:</b></p><p><a href=\"https://github.com/xiazixin/deepseek-omegat-plugin\">https://github.com/xiazixin/deepseek-omegat-plugin</a></p>';
return 'SET: ' + body.innerHTML.length;
