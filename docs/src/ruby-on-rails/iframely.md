---
layout: page
title: iFramely
---

iFramely is an embed service that supports 1900+ sites, things like Spotify/Apple Music, Typeform and many many more. Richer Text integrates with it, with all you needing to provide to the form field, or default form options is an `iframely-key` attribute with your MD5 Hashed API Key from the dashboard and a paid plan (you can get started for free though!).

## Requirements

- RicherText.js v2.0.0-beta.1 or higher
- An iframely.com account & hashed API Key (can retrieve this from the [API Keys](https://iframely.com/keys) section in the dashboard).

## Usage

Provide the hashed Iframely API key to the editor;

If using our Ruby on Rails integration:

```ruby
Rails.application.config.to_prepare do
  RicherText.default_renderer = HtmlVisitor.new

  RicherText.default_form_options = {
    class: "min-h-[10rem]",
    callouts: true,
    tables: true,
    "iframely-key": "HASHED_API_KEY_HERE",
    oembed: false
  }
end
```

It's recommended to turn off the `oembed` functionality built into the Richer Text library as that provides a limited number of providers out of the box and Iframely will support those providers and so so many more.

### Permit your site's URL in the Iframely dashboard

It's important to allow-list your domains for the Iframely API to prevent unauthorized usage. You can do this from the API Keys page and clicking Edit on each API Key.

See the [Iframely Docs](https://iframely.com/docs/allow-origins) for more info
