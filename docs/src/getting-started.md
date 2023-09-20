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

<div class="callout" data-color="blue">
  <strong>Optionally:</strong> You can choose to store your content as JSON by passing `store_as: :json` to the has_richer_text attribute.

<pre><code>has_richer_text :body, store_as: :json</code></pre>

</div>

Next permit the `body` param in your controller

```ruby
  params.require(:post).permit(:title, :body)
```

Then add the RicherText editor into your forms.

<pre>
  &lt;%= form.label :body %&gt;
  &lt;%= form.richer_text_area :body %&gt;
</pre>

Then you can render the content out with:

<pre>
  &lt;%= @post.body %&gt;
</pre>

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
