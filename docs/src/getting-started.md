---
layout: page
title: Getting started
---

<div class="callout" data-color="green">
  <p><strong>Important:</strong> RicherText has a hard dependency on React/react-dom and you must install or have React >= 17 in your project. If you follow the Rails installation the packages will be added if they're not already. You <strong>do not</strong> have to use React outside of the RicherText editor if you do not want to.</p>
</div>

## Installation (Ruby on Rails)

Getting started with Ruby on Rails is a matter of following the following instructions:

First up is to add the `richer_text` gem to your Gemfile.

```shell
  bundle add richer_text
```

Next you'll need to run the generator task to add the yarn packages, copy over the migrations and assets.

```shell
  rails richer_text:install
```

Then run your migrations to create the tables in the database.

```shell
  rails db:migrate
```

### Implementing RicherText into your forms

First up in your model add the `has_richer_text :attribute_name` to your models.

```ruby
class Post < ApplicationRecord
  has_richer_text :body
end
```

Next permit the `body` param in your controller

```ruby
  params.require(:post).permit(:title, :body)
```

Then add the RicherText editor into your forms.

<pre>
  &lt;%= form.label :body %&gt;
  &lt;%= form.richer_text_area :body %&gt;
</pre>

The installation process installs a StimulusJS controller that is responsible for updating a hidden input the form helper generates upon the `editor:update` event from the RicherText editor. 🎉

That's all! Enjoy using RicherText 🥳

## Manual Installation

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
  <richer-text-editor
    content="Your initial content"
    placeholder="Write something..."
  ></richer-text-editor>
</div>
```
