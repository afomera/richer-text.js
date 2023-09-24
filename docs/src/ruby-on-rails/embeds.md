---
layout: page
title: Embeds
---

<div class="callout" data-color="yellow">
  <strong>Custom Embeds is a JSON only feature</strong>
  <p>Richer Text requires JSON storage to be used to support Custom Embeds</p>

  <pre><code>has_richer_text :body, store_as: :json</code></pre>
</div>

Custom Embeds are almost a requirement these days in modern apps. If you've used ActionText this will feel familiar but also a bit different at the same time.

Due to Tiptap using a strict schema, we can't embed just any HTML into the document or parts Tiptap doesn't understand will be stripped out. To get around this, inside the text editor, we use an iframe that loads a embeds endpoint to render the content inside. This keeps everyone happy at the same time.

## Requirements

- RicherText.js v0.16.1 or higher
- RicherText rubygem v0.10.0 or higher

## Setting up a model

```ruby
class Post < ApplicationRecord
  include RicherText::Embeddable

  has_richer_text :body, store_as: :json

  # Optionally you can override this method per model
  # Defaults to `to_partial_path` if not defined.
  def to_embeddable_partial_path
    "posts/embeddable_post"
  end
end
```

In this example, we've included our concern which defines two methods, `to_embeddable_partial_path` which will be used when we render inside the iframe, and outside the iframe when we render the JSON... and `embeddable_sgid` which returns a signed global id with our purpose so we can look up the object later at render time.

For this example, Richer Text would now look for a partial at `app/views/posts/_embeddable_post.html.erb`.

## The backend setup

Richer Text is different because we require you to setup a route, view and controller for controlling the code that renders in the iframe inside of the Richer Text editor.

By default the editor looks for a path of "/embeds/:sgid". If you wish to change this, pass `"embeds-path": "/your-new-path-here"` to the `<richer-text-editor>` tag/form helper.

_config/routes.rb_

```ruby
  resources :embeds, only: [:show]
```

_app/controllers/embeds_controller.rb_

```ruby
class EmbedsController < ApplicationController
  layout "application"

  def show
    @embed = RicherText::Embed.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render html: "Embed not found", status: :not_found
  end
end
```

Feel free to customize which layout file renders around your Embeds controller view. You could choose to make a dedicated Embeds layout if you so choose to.

_app/views/embeds/show.html.erb_

<pre><code>&lt;%= @embed.html %&gt;</code></pre>

Lastly you'll need an endpoint for your model that returns JSON for the front-end to load.

Your endpoint should return two keys: "label" and "content". Label should be anything you want the user to search and filter by, and content should be the erm well content you wish to have inserted into the text editor.

In our case we want to embed a custom `<richer-text-embed>` html tag we use for identifying custom embeds.

Take for example this Jbuilder template

```
json.label post.title
json.content "<richer-text-embed sgid=\"#{post.embeddable_sgid}\"></richer-text-embed>"
```

All you need to do is ensure the content piece renders a `richer-text-embed` tag with an attribute of `sgid`, all other attributes will be ignored.

## Front-end setup

Paired with <a href="/ruby-on-rails/custom-suggestions">Custom Suggestions</a> and Embeds, Richer Text packs a powerful punch.

Once you've got your backend endpoints up, and know where you need to point the Custom Suggestion script to return your records... you need to plug it in to the editor.

<pre><code>&lt;%= form.richer_text_area :body, "custom-suggestions": [
    { "name": "posts", "trigger": "!", "path": "/posts.json" }
  ].to_json %&gt;
</code></pre>

In this example, we're using ! as the character to trigger the searching and filtering, it will return a list of posts to filter by then the user can select one.

Upon selection, the JSON's content attribute will be injected into the Text Editor and your iframe should load properly in the Text Editor. Try saving the Post and seeing your `to_embeddable_partial_path` content should be rendered in place of the `richer-text-embed` tag.

That's all, really. With Richer Text you get full control of the HTML that renders inside and outside of the editor.

## Need some inspriation?

- Try creating a Newsletter form model that will embed an email signup form into a Post.
