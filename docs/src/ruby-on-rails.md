---
layout: page
title: Ruby on Rails
---

This page will serve as the documentation page for using Richer Text with Ruby on Rails.

## Installation

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

## Usage

First up in your model add the `has_richer_text :attribute_name` to your models.

```ruby
class Post < ApplicationRecord
  has_richer_text :body
end
```

<div class="callout" data-color="blue">
  <strong>Optionally:</strong> You can choose to store your content as JSON by passing `store_as: :json` to the has_richer_text attribute.

<pre><code>has_richer_text :body, store_as: :json</code></pre>

<strong>Note:</strong> By using JSON seralization you get access to Custom Suggestions, Built in OEmbed support, and Richer Embeds. For more information on these check the documentation.

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

## JSON Serialization / Rendering

When you setup a Richer Text attribute on a model using `has_richer_text :attribute_name` you also have a choice of passing `store_as: :json` to use our JSON serializer and storage mechanism.

While JSON storage is a bit of an advanced feature you might prefer this route over storing the HTML as it can be frustrating to try and modify HTML that's stored, however by using JSON you get access to define your own HTML visitor to define the rendering logic. This makes it a breeze to plug in View Components, Phlex or other libraries for rendering your rich content.

```ruby
  has_richer_text :body, store_as: :json
```

This will create a `RicherText::JsonText` record associated to your model, and automatically passes `serializer="json"` to the `form.richer_text_area` form helper for you.

### Overriding the default HTML visitor

As mentioned above, you can override the default renderer for Richer Text when using the JSON schema.

We use a visitor pattern to iterate over the JSON from our text editor.

To use it, first setup an initializer like so:

```ruby
Rails.configuration.to_prepare do
  RicherText.default_renderer = HtmlVisitor.new
end
```

Create a file called `html_visitor.rb` and then inherit from the `RicherText::HTMLVisitor`. From there you're free to redefine methods found in our RicherText::HTMLVisitor to your hearts content.

For example for overriding the default Callout behavior

```ruby
class HtmlVisitor < RicherText::HTMLVisitor
  def visit_callout(node)
    "CALLOUT HERE: <div class='callout' data-color='#{node.color}'>#{visit_children(node).join}</div>"
  end
end
```
