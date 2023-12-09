---
layout: post
title: Announcing Richer Text v1.0! 🎉
author:
  name: Andrea Fomera
  link: https://afomera.dev
image:
  url: https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=4091&q=80
  creator_url: https://unsplash.com/@rayhennessy?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
  creator_name: Ray Hennessy
  unsplash_credit: https://unsplash.com/photos/gdTxVSAE5sk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
---

Richer Text is now v1.0 and ready for production use.

When I started this project at the end of last year (2022), my goal was to use it to learn React so I could better help on things at work. My goals have since shifted for Richer Text and it's become so much bigger and better than I could have ever imagined. It became my goal to make the text editor I've always wanted for my Ruby on Rails applications, but without giving up the niceities that ActionText provides.

## What is Richer Text?

Richer Text is a modern text editor built on top of Tiptap, and ProseMirror. It includes a mechanism for storing either HTML or JSON that is returned from Tiptap and rendering the content, inspired by ActionText's functionality of storing content seperately from the model.

Richer Text features a roboust text editor complete with everything from the basics to rich custom embeds. For a full list of features check below:

- Headings (H1 and H2)
- Blockquotes
- Code blocks that live-highlight as you type.
- Lists
- Formatting, including Bold, Italic and Strikethrough.
- Inline code support.
- Added Lines (horizontial rules)
- Emoji picker, in a slack-like style (type : to begin searching for the perfect emoji)
- Built in optional support for Tables
- Support for "Callouts" which are fancy alert looking boxes to call attention to your content.
- Slash commands (type / in the editor)
- Familar markdown-like commands in the editor. (Try typing # followed by content you wish to become an H1)
- Image uploads via ActiveStorage
- User @Mentions readily available
- Custom Suggestions
- Richer Embeds
- Built in support for oEmbeds

## Why another editor?

Great question, my motives for starting Richer Text were spurred by the desire to have a flexible
editor that I could easily extend and fully customize the way I always wanted to with Trix.

Trix served me well for many years, but in 2023, nearly 2024 it's time to make way for new editors.

Enter, [Tiptap](https://tiptap.dev) which is built on ProseMirror and handles much of the heavy lifting for us with wrangling ProseMirror into sensible code, but it comes headless. The perfect fit for someone looking to provide their own UI for an editor, thus Richer Text was born.

## Is Richer Text's name a jab/poke at anyone/thing?

Nope, it's really not. I loved using ActionText in my projects, until I ran into issues customizing Trix for my needs (ever try adding tables to trix? 😅). I think it's a great library and loved the simplicity of storing Rich Text in it's own table. I only picked the name Richer Text because i'm boring and could get the domain + rubygem name combo I liked.

## JSON vs HTML storage

Which is better? 🤪 Just kidding, it's really up to you. Though I recommend choosing JSON storage for your content, since you'll have full control over the rendering of HTML, and your content will always render the most up-to-date HTML if you change how an Image should render.

By choosing JSON storage, you also get the ability to use <a href="/ruby-on-rails/embeds" target="_blank">Richer Text's custom embeds, built in oEmbed support and more</a>.

## Future vision

I know it's an uphill climb to reach adoption with Richer Text, but I hope you'll give it a good try. I want to make the best storage solution for Rich content out there, that allows extensibility and choosing your own front-end text editor.

That's why I built support in for <a href="https://rhino-editor.vercel.app" target="_blank">Rhino Editor</a> to store it's content as JSON on the backend. While I hope people want to use my editor, I also just want to provide an ActionText like solution for other text editors.

Perhaps one day in the future, we'll have a Markdown text editor, and you'll probably find me extending Richer Text to store and render Markdown content.

## How does it work?

While you can use RicherText.js outside of Ruby on Rails and still benefit from a great text editor, where it really shines is when you use it with the `richer_text` rubygem.

Getting started is a matter of a few commands:

```
bundle add richer_text

rails richer_text:install

rails db:migrate
```

Once you've done that you can setup your Model with the Richer Text attribute:

```ruby
class Post < ApplicationRecord
  # One example is storing the JSON from the text editor:
  has_richer_text :body, store_as: :json
  # Or to store HTML...
  # has_richer_text :body
end
```

Permit the `body` attribute in your controller params

```ruby
  params.require(:post).permit(:title, :body)
```

In your \_form.html.erb partial:

<pre>
  &lt;%= form.label :body %&gt;
  &lt;%= form.richer_text_area :body %&gt;
</pre>

Then you can render the content out with:

<pre>
  &lt;%= @post.body %&gt;
</pre>

That's all! Enjoy using RicherText 🥳

## Try it out

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
