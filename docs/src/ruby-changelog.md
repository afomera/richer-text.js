---
layout: page
title: RicherText Ruby Gem Changelog
---

This is the changelog for our Ruby Gem package. Are you looking for the <a href="/changelog" target="_blank">JavaScript changelog</a>?

## main

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
