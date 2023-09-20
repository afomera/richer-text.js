---
layout: page
title: Ruby on Rails
---

This page will serve as the documentation page for using Richer Text with Ruby on Rails.

Once you've <a href="/getting-started#installation-ruby-on-rails">followed our installation steps</a> you're all set to find additional information here.

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
