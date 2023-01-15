---
# Feel free to add content and custom Front Matter to this file.
title: Welcome to RicherText.js
layout: default
---

<div class='callout' data-color='yellow'>
  <p><strong>RicherText is considered a Work In Progress and is currently experimental</strong></p>
  <p>Use of RicherText in production is not recommended until we hit a 1.0 release. We may need to introduce breaking changes until we finalize the approach and much of the editor's core functionality.</p>
</div>

# Try it out

<richer-text-editor content="<div class='callout' data-color='gray'>

<p style='text-align: center'><strong><span style='font-size: 20px'>Welcome to RicherText</span></strong></p>
<p>RicherText aims to provide an alternative solution to using ActionText and Trix in Ruby on Rails. It uses a rich text editor based on TipTap (which itself is based on ProseMirror).</p>
</div>
<h1>We have H1 headings</h1>
<p>Some text here</p>
<h2>We have H2 headings</h2>
<p>Some text here</p>
<p>Code blocks? <em>We've got those!</em> It'll even <strong>syntax highlight</strong> as you type, try it! (Shift+Enter to exit a codeblock) Try hitting tab while you're in a codeblock too 😀.</p>
<pre>class Playground < ApplicationRecord
  has_richer_text :body
  
  validates :title, presence: true
end</pre>

<p>Another paragraph here, maybe showing off the small text.</p>
" placeholder="Write something..."></richer-text-editor>

```html
<richer-text-editor content="Hello world" placeholder="Write something...">
</richer-text-editor>
```

---
