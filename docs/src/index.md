---
# Feel free to add content and custom Front Matter to this file.
title: Welcome to RicherText.js
layout: default
---

<div class='callout' data-color='yellow'>
  <p><strong>RicherText is considered a Work In Progress</strong></p>
  <p>Use of RicherText in production is not recommended until we hit a v2.0 release candidate.</p>
</div>

# Try it out

<textarea id="foobar"></textarea>

<!--  toolbar="heading-1, heading-2, divider, bold, italic, strike"  -->

<richer-text-editor toolbar-preset="default" toolbar-placement="top" serializer="html" embeds-path="/richer-text-embeds" custom-suggestions='[{ "name": "snippets", "trigger": "!", "path": "snippets.json" },{ "name": "snippets2", "trigger": "{{", "path": "snippets2.json" }]' mentionable-users-path="/users.json" tables="true" input="foobar" callouts="true" bubble-menu-options='{ "highlight": true, "textColor": true }' content="<div class='callout' data-color='gray'>

<p style='text-align: center'><strong><span style='font-size: 20px'>Welcome to RicherText</span></strong></p>
<p>RicherText aims to provide an alternative solution to using ActionText and Trix in Ruby on Rails. It uses a rich text editor based on TipTap (which itself is based on ProseMirror).</p>
</div>
<richer-text-embed sgid='1234'></richer-text-embed>

<h1>We have H1 headings</h1>
<p>We also have @mentions see an example here: <span data-type='mention' class='richer-text--mention' data-id='gid://app/User/2' data-label='Jane Doe' data-avatar-url='https://i.pravatar.cc/64?img=5' contenteditable='false'><img class='richer-text--mention-img' src='https://i.pravatar.cc/64?img=5' alt='Jane Doe'><span class='richer-text--mention-label'>Jane Doe</span></span>, coming at you live from a Richer Text Editor near you.</p>
<p>Not only do we have headings, and regular paragraphs, you can find an example ✨ <strong>Table</strong> ✨ below. Mind blowing stuff, isn't it? You can use the / insert menu to insert a Table</p>
<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th colspan='3'>Description</th>
    </tr>
    <tr>
      <td>Cyndi Lauper</td>
      <td>singer</td>
      <td>songwriter</td>
      <td>actress</td>
    </tr>
  </tbody>
</table>

<p>Tables are an opt-in feature, so you'll need to pass <code>tables: true</code> to enable them where you want them.</p>
<h2>We have H2 headings</h2>
<p>Some text here</p>
<p>Code blocks? <em>We've got those!</em> It'll even <strong>syntax highlight</strong> as you type, try it! (Shift+Enter to exit a codeblock) Try hitting tab while you're in a codeblock too 😀.</p>
<pre>class Playground < ApplicationRecord
  has_richer_text :body
  
  validates :title, presence: true
end</pre>

<p>Need to support images in your text body? We can do that with three sizing options, small, medium and large.</p>
<img src='https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=5340&q=80'>
<p>Photo by <a href='https://unsplash.com/@jrkorpa?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'>Jr Korpa</a> on <a href='https://unsplash.com/photos/9XngoIpxcEo?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'>Unsplash</a></p>

<richer-text-embed sgid='1235'></richer-text-embed>

" placeholder="Write something..."></richer-text-editor>

<script>
  document.querySelector("richer-text-editor").addEventListener("change", (event) => {
    console.log("event", event)
  });
</script>

```html
<richer-text-editor content="Hello world" placeholder="Write something...">
</richer-text-editor>
```
