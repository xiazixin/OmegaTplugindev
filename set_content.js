const ta = document.getElementById('ctrl_message_html');
if (!ta) return 'textarea not found';
const newContent = '<p>[ATTACH=full]126090[/ATTACH]</p>' +
'<p>Are you tired of seeing posts about new AI tools for novel translators \u2014 yet still clinging to your old translation memories, glossaries, and all that fuzzy match data you\'ve built up over the years while everyone else is embracing AI?</p>' +
'<p><br /></p>' +
'<p>I bring you a <b>plugin</b> \u2014 yes, an actual plugin. Not a scam link, not a web-based online service.</p>' +
'<p><br /></p>' +
'<p>[ATTACH=full]125983[/ATTACH]</p>' +
'<p>With AI becoming cheaper than ever, the cost-effectiveness of AI has finally caught up with human translators. It\'s now no longer cheaper to hire a human than to let AI translate your novels.</p>' +
'<p>Also, <b>DeepSeek offers 5 million free tokens</b> \u2014 so you\'re free to test the DeepSeek API at no cost!</p>' +
'<p><br /></p>' +
'<p><b><span style="font-size: 18px">\uD83D\uDCB0 100% Free</span></b><span style="font-size: 18px"> (other than third-party API fees)</span></p>' +
'<p><br /></p>' +
'<p><b>Source Code:</b></p>' +
'<p><a href="https://github.com/xiazixin/deepseek-omegat-plugin" target="_blank" class="externalLink ProxyLink" data-proxy-href="https://github.com/xiazixin/deepseek-omegat-plugin" rel="nofollow">https://github.com/xiazixin/deepseek-omegat-plugin</a></p>' +
'<p><br /></p>' +
'<p><b><span style="color: #ff0000">\u2B07\uFE0F Downloads:</span></b></p>' +
'<p><a href="https://github.com/xiazixin/deepseek-omegat-plugin/releases" target="_blank" class="externalLink ProxyLink" data-proxy-href="https://github.com/xiazixin/deepseek-omegat-plugin/releases" rel="nofollow">https://github.com/xiazixin/deepseek-omegat-plugin/releases</a></p>' +
'<p><br /></p>' +
'<p><b><font size="5">\uD83D\uDCCA Comparison (v1.0.0 \u2014 DeepSeek v4 Flash):</font></b></p>' +
'<p><br /></p>' +
'<p>[SPOILER="Comparison spoiler"]</p>' +
'<p>[ATTACH=full]125981[/ATTACH]</p>' +
'<p><b>Google vs DeepSeek vs Human (2024)</b> \u2014 Both Google and DeepSeek performed poorly compared to myself (a native Chinese speaker).</p>' +
'<p><br /></p>' +
'<p>[ATTACH=full]125982[/ATTACH]</p>' +
'<p><b>Google vs DeepSeek vs Human (2024)</b> \u2014 DeepSeek is significantly better than Google here, only slightly behind the human translation.</p>' +
'<p><br /></p>' +
'<p>[ATTACH=full]126005[/ATTACH]</p>' +
'<p><b>Google vs DeepSeek vs Human (2019)</b> \u2014 DeepSeek completely outperformed me. More data with historical context really makes a difference.</p>' +
'<p><br /></p>' +
'<p>[ATTACH=full]126006[/ATTACH]</p>' +
'<p><b>Google vs DeepSeek vs Human (2018)</b></p>' +
'<p><br /></p>' +
'<p>[ATTACH=full]126007[/ATTACH]</p>' +
'<p><b>Google vs DeepSeek vs Human (2018, Western context)</b> \u2014 DeepSeek is ahead here too. Human translators are going to lose their jobs to MTL.</p>' +
'<p><br /></p>' +
'<p>[ATTACH=full]126008[/ATTACH]</p>' +
'<p><b>Google vs DeepSeek vs Human (2019, Japanese)</b> \u2014 Looks like Google improved with Alpha. Back then Google translated "platinum hair" as "golden hair," and everyone who MTL\'d the chapter blamed me for it. I seem to have lost the files containing Yukime\'s dialogue chapters. <img src="styles/default/xenforo/clear.png" class="mceSmilieSprite mceSmilie31" alt=":sweating_profusely:" unselectable="on" /></p>' +
'<p><br /></p>' +
'<p>[ATTACH=full]126009[/ATTACH]</p>' +
'<p><b>Google vs DeepSeek vs Human (2018, Japanese RPG translation)</b> \u2014 AI still needs more context. May improve if it has access to a glossary or dictionary.</p>' +
'<p><br /></p>' +
'<p>[/SPOILER]</p>' +
'<p><br /></p>' +
'<p><b><font size="5">\u2753 Q&amp;A:</font></b></p>' +
'<p>(Reply below and I may add your question here!)</p>' +
'<p><br /></p>' +
'<p>[SPOILER="Q&amp;A spoiler"]</p>' +
'<p><b>How to set up in OmegaT:</b></p>' +
'<p>[ATTACH=full]125984[/ATTACH]</p>' +
'<p>1. Drag the <b>deepseek-omegat-plugin</b> JAR into the OmegaT plugin folder.<br />2. Restart OmegaT.<br />3. Go to <b>Options \u2192 Preferences \u2192 Machine Translation</b> and configure the DeepSeek engine.</p>' +
'<p><br /></p>' +
'<p><b>Can AI read my fuzzy matches?</b></p>' +
'<p>Not yet \u2014 this feature is planned for a future release.</p>' +
'<p><br /></p>' +
'<p><b>Can AI read my glossary / comments / dictionary?</b></p>' +
'<p>Not yet \u2014 this feature is also planned for a future release.</p>' +
'<p><br /></p>' +
'<p><b>Can I let AI read through my translation memory to fully utilize 1 million tokens?</b></p>' +
'<p>No \u2014 not planned in the near future. That would be extremely slow and expensive. Why not just hire another translator?</p>' +
'<p><br /></p>' +
'<p><b>Can I customize temperature / top_p / frequency_penalty?</b></p>' +
'<p>Temperature control is already implemented. Support for the other two depends on demand.</p>' +
'<p><br /></p>' +
'<p>[/SPOILER]</p>' +
'<p><br /></p>' +
'<p><b><font size="5">\uD83D\uDCDD Release Notes:</font></b></p>' +
'<p><br /></p>' +
'<p>[SPOILER="Release Notes spoiler"]</p>' +
'<p><b>v1.2.1:</b><br />\u2014 Added dynamic temperature toggle and Dynamic Temperature Scaling.</p>' +
'<p><br /></p>' +
'<p><b>v1.2.0:</b><br />\u2014 Added temperature slider in settings. Default temperature set to 0.3.</p>' +
'<p><br /></p>' +
'<p><b>v1.1.0:</b><br />\u2014 Added model dropdown selector in settings.<br />\u2014 Added <b>DeepSeek v4 Pro</b> (slower, more refined responses).<br />\u2014 Added <b>DeepSeek v4 Flash</b> (faster, cheaper responses).</p>' +
'<p><br /></p>' +
'<p><b>v1.0.0:</b><br />\u2014 Initial release.</p>' +
'<p><br /></p>' +
'<p>[/SPOILER]</p>' +
'<p><br /></p>' +
'<p>Oh... almost forgot. Please give me a \u2B50 on GitHub! <img src="styles/default/xenforo/clear.png" class="mceSmilieSprite mceSmilie34" alt=":aww:" unselectable="on" /></p>' +
'<p>[ATTACH=full]126091[/ATTACH]</p>';
ta.value = newContent;
ta.dispatchEvent(new Event('input', { bubbles: true }));
return 'Content set: ' + newContent.length + ' chars';
