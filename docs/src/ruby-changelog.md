---
layout: page
title: RicherText Ruby Gem Changelog
---

This is the changelog for our Ruby Gem package. Are you looking for the <a href="/changelog" target="_blank">JavaScript changelog</a>?

## main

---

## 0.20.0

- Add support for passing `attachments: false` to the `has_richer_text` attribute, to disable attachments.

---

## 0.18.0

- Rails 8 ready for Importmaps / SQLite out of the box. Enjoy! `rails richer_text:install` is all you need to do once you add the gem!

---

## 0.17.0

- Added `RicherText.default_text_renderer=` setter, to allow you to write a custom TextVisitor for rendering plain text.
- Added `to_plain_text` method to JsonText records for rendering plain text.

```ruby
class TextVisitor < RicherText::TextVisitor
  # ... your overridden methods here
end

# initializer somewhere
Rails.configuration.to_prepare do
  RicherText.default_renderer = HtmlVisitor.new  # if you had a HtmlVisitor also defined.
  RicherText.default_text_renderer = TextVisitor.new
end
```

---

## 0.16.0

-- Use stable channel for installing RicherText.js

---

## 0.15.0

- Use beta channel for installing RicherText.js

---

## 0.14.0

- Added `RicherText.default_form_options` as a configuration option.

You can specify in an initializer default options to avoid needing to specify them on every form, and override them on a per form basis.

```ruby
Rails.application.config.to_prepare do
  RicherText.default_form_options = {
    class: "min-h-[10rem]",
    callouts: true,
    tables: true,
    oembed: false
  }
end
```

- Added IframelyEmbed node

---

## 0.13.0

- Fixed Rails 7.2 compatability
- Updated install script to install RicherText.js v2 from the alpha channel

---

## 0.10.0

- Add support for RicherTextEmbed nodes, allowing the rendering of `richer-text-embed` html tags as a rendered partial for the Embeddable object.
- Adds support for application models including `RicherText::Embeddable`
- Adds `RicherText::Embed` class which can be used to look up a given sgid to return the embeddable object.

---

## 0.9.0

- Added support for @mention nodes on the Ruby gem side. Requires RicherText.js v0.14 or higher.
  - Mention nodes are supported for either HTML or JSON renderers. For full support, it's recommended you use JSON storage.
  - You can return the `mentionees` from any RichText record, for example: `post.body.mentionees` will return the parsed HTML/JSON mentionees. This requires you to be using Global IDs from your JSON endpoint the RicherText.js receives.

## 0.8.0

- Added basic support for [Rhino Editor](https://rhino-editor.vercel.app) to use RicherText to store JSON from the editor. Richer Text will handle attaching and saving ActiveStorage attachments so you don't need to worry about storing them yourself.
- This includes a `rhino_text_area` form helper to render the Rhino Editor using the `JSON` serializer

To use:

```ruby
  has_richer_text :body, store_as: :json
```

<pre>
  <code>
    &lt;%= form.label :body %&gt;
    &lt;%= form.rhino_text_area :body %&gt;
  </code>
</pre>

Requires users to manually install Rhino Editor's JavaScript and CSS respectively first. Valid with Rhino Editor v0.8.4 or higher.

Attachment support for rendering is still a work in progress. Pull Requests are welcome!

---

## 0.7.0

- Renamed `has_richer_text :attribute, json: true` to `has_richer_text :attribute, store_as: :json`

---
