---
layout: page
title: About
---

Richer Text is a project by [Andrea Fomera](https://afomera.dev). It's based on [TipTap](https://tiptap.dev), which itself is based on ProseMirror.

_**Richer Text is not looking to maintain backwards compatibility with ActionText**. For a compatible editor, take a look at [Rhino Editor](http://rhino-editor.vercel.app)._

The editor itself is written in React, and converted into a Web Component for ease of including in any project.

## Why another editor?

Great question, my motives for starting Richer Text were spurred by the desire to have a flexible
editor that I could easily extend and fully customize the way I always wanted to with Trix.

Trix served me well for many years, but in 2023, nearly 2024 it's time to make way for new editors.

Enter, [Tiptap](https://tiptap.dev) which is built on ProseMirror and handles much of the heavy lifting for us with wrangling ProseMirror into sensible code, but it comes headless. The perfect fit for someone looking to provide their own UI for an editor, thus Richer Text was born.

## Why Richer Text over ActionText?

ActionText is a great first step for many applications, but eventually you'll find yourself bumping up against friction when you want to extend Trix and add things like user mentions, colors, or tables. If you've ever had the pain of trying to extend Trix and ActionText you'll know.

Richer Text provides another option that allows you to fork the front-end, to extend with your own extensions (User mentions? Non-image uploads?), change the user interface and plug into our backend for storing.

The backend integration with Ruby on Rails will feel familiar for those who've used ActionText, and if you're completely new, it'll be quick to pick up and you'll be adding Richer Text fields to models in no time. The major difference being we provide you with the choice at the start to store HTML from the editor, or Tiptap's JSON schema is fully supported for storing and rendering.

## Why should I not use Richer Text?

Here's some reasons you may **not** want to use Richer Text.

- You want to maintain backwards compatibility with ActionText as an escape hatch if you need it one day. (For backwards compatibility, but still getting the perks of Tiptap for your text editor, checkout [Rhino Editor](http://rhino-editor.vercel.app). Konnor is doing great work on it to maintain backwards compatibility).
- You don't want React/React DOM installed in your project. (For the record, you don't need to **use** React outside of the Text Editor, it just needs to be included in your package.json)
- You want to use ActionText's attachable system for attachments, rather than Richer Text's <a href="/ruby-on-rails/embeds">embed system</a>.

## You keep mentioning Rhino Editor, why? How do the two editors compare?

[Rhino Editor](http://rhino-editor.vercel.app) is built by [Konnor Rogers](https://twitter.com/RogersKonnor) and uses Tiptap with Lit to build the text editor. It still uses Tiptap and Prosemirror under the hood, and you get nice documentation on extending it with your own extensions without needing to fork the editor to add your own extensions. A huge plus to it, is the ActionText backwards compatibility out of the box.

Richer Text is different because we provide a few more plugins out of the box by default (like tables, callouts, or text alignment options). **To be fair and transparent:** It's 100% possible to add these things to Rhino Editor yourself.

We provide a different UI/UX where you'll find a Bubble Menu when you select text and a / command (Slash commands) menu. Try typing /heading to see heading related options. Additionally we provide our own Ruby on Rails plugin that allows you to store the HTML or JSON and render it out into your applications. Rhino Editor uses ActionText's integration which is fully maintained by the Rails core team.

On a personal note, I'm a big fan of what Konnor is doing with Rhino Editor, you won't find any love lost if you choose to use Rhino Editor over Richer Text, gone is the day of just one WYSIWYG editor for Rails. Now you have three to choose from 🎉.
