---
layout: page
title: Getting started
---

<div class="callout" data-color="green">
  <p><strong>Important:</strong> As of RicherText.js v2, we no longer require a dependency on React/react-dom. Now's the perfect time to try it.</p>
</div>

## Installation (Ruby on Rails)

<a href="/ruby-on-rails#installation">View the Ruby on Rails installation page.</a>

## Manual Installation

Use yarn, npm, pnpm or whatever package manager works for your project:

```shell
yarn add @afomera/richer-text
```

Import RicherText into your JavaScript entrypoint. This will ensure the RichTextEditor initializes and the web component is available to you.

```js
import "@afomera/richer-text";
```

Next import the css from the node module. Depending on your setup this may have to change for your project.

```css
@import "@afomera/richer-text/dist/css/richer-text.css";
```

**Optional:**
If you'd like to use the syntax highlighting, import a theme to customize the styling. Any highlight.js supported theme will work.

We like the github-dark theme from Highlight.js:

```css
@import "highlight.js/styles/github-dark.css";
```

## Usage

To use the Richer Text Editor, we need to pass the web component content to be rendered and optionally, a set of attributes we'll use to initialize it. Passing an HTML element id as input will allow RicherText to automatically update the value of a hidden field for you.

Your full HTML will need to look similar to this:

```html
<input type="hidden" value="" id="post_body" />
<richer-text-editor
  input="post_body"
  content="Your initial content"
  placeholder="Write something..."
></richer-text-editor>
```
