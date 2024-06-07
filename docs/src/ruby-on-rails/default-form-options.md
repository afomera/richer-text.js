---
layout: page
title: Default Form Options
---

When using the Ruby gem for the form helpers, you might find yourself adding the same options over and over to the form fields.

We support setting `default_form_options` on the `RicherText` module so you can avoid needing to pass those options each time.

```rb
Rails.application.config.to_prepare do
  RicherText.default_renderer = HtmlVisitor.new

  RicherText.default_form_options = {
    class: "min-h-[10rem]",
    callouts: true,
    tables: true,
    oembed: false
  }
end
```

Just remember if you're using Tailwind and set these options in an initializer to permit the config/\*_/_.rb files in the content list in the tailwind.config.js file so your classes get picked up.
