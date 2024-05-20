---
layout: page
title: Richer Text vs Trix
---

If you're coming from Ruby on Rails you may be familar with Trix, the default editor that comes with ActionText. For many this will be enough, and you won't need to extend Trix, but if you're part of the group that needs to go further than Trix... keep reading!

You'll find it embedded below for you to try out and play around with. You'll find it's capable out of the box for basic rich text editing, but if you want to do anything more with it you'll have to [extend it yourself](https://github.com/basecamp/trix?tab=readme-ov-file#inserting-a-content-attachment). This can be time consuming and an exercise in fustration. Not a fun time.

Some examples of things you might want Trix to do someday: different heading sizes, text alignment, @mentions, table editing. With RicherText.js many of these things come built for you where all you need to do is plugin a few backend pieces and away you go, saving you valuable time, and where there's not an existing extension you can extend it yourself.

## Try out Trix

<input id="trix" type="hidden" value='<div>Hello world, from Trix!</div><pre>console.log("Hello world");</pre>'>
<trix-editor input="trix">
</trix-editor>

Best viewed in light mode.

<!---
| Feature    | Trix | Richer Text       |
| :--------- | ---- | ----------------- |
| Headings   | H1   | H1, H2, H3        |
| Text sizes | ❌   | Large, and normal |
--->

## Try out Richer Text

Below you'll find the full kitchen sink example with all the bells and whistles included for Richer Text. In most situations you can turn off things you don't want.

<input type="hidden" id="foobar" />
<richer-text-editor embeds-path="/richer-text-embeds" custom-suggestions='[{ "name": "snippets", "trigger": "!", "path": "snippets.json" },{ "name": "snippets2", "trigger": "{{", "path": "snippets2.json" }]' mentionable-users-path="/users.json" tables="true" input="foobar" callouts="true" bubble-menu-options='{ "highlight": false }' content="<div class='callout' data-color='gray'>

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
