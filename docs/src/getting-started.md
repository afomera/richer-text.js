---
layout: page
title: Getting started
---

## Installation

<div class="callout" data-color="yellow">
  <p><strong>Important:</strong></p>
  <p>RicherText requires React to be installed into your project, so please make sure these are installed in your package.json.</p>

<pre>
yarn add react react-dom
</pre>

</div>

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

To use the Richer Text Editor, we need to pass the web component content to be rendered and optionally, a set of attributes we'll use to initialize it.

```html
<richer-text-editor content="Hello world" placeholder="Write something...">
</richer-text-editor>
```

However, just rendering the editor won't be enough to do much useful with the editor. We'll need to listen to events emitted from the editor so you can choose how to save the resulting JSON or HTML (you choose!).

RicherText currently emits one event: **editor:update** on any update event.

We recommend using something like [Stimulus](http://stimulus.hotwired.dev) to listen for events.

```js
import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="editor"
export default class extends Controller {
  static targets = ["input"];

  update(event) {
    // Or if storing JSON yourself, event.detail.json
    this.inputTarget.value = event.detail.html;
  }
}
```

Then you'll need HTML that looks similar to this:

```html
<div data-controller="editor" data-action="editor:update->editor#update">
  <input type="hidden" value="" data-editor-target="input" />
  <richer-text-editor content="Your initial content"></richer-text-editor>
</div>
```
