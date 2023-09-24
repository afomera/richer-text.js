---
layout: page
title: Custom Suggestions
---

Custom suggestions can be used for just about any use-case you have that requires searching an endpoint for a record, then inserting content into Richer Text.

For example, you can build out a saved replies / canned responses feature, or liquid variable completions by using the following approach.

## Requirements

- RicherText.js v0.15 or higher

## Getting started

You must configure the `richer-text-editor` tag with an attribute of `custom-suggestions` which returns a JSON array of objects configured in the following structure.
Here's an example of an editor built using the Rubygem form helpers, with support for @mentions, snippets finding with $, liquid completion with {{ and lastly searching posts to embed them with !.

<pre><code>&lt;%= form.richer_text_area :body, "mentionable-users-path": "/users.json", "custom-suggestions": [
    { "name": "snippets", "trigger": "$", "path": "/snippets.json" },
    { "name": "liquidCompletion", "trigger": "{{", "path": "/liquid_completions.json" },
    { "name": "posts", "trigger": "!", "path": "/posts.json" }
  ].to_json %&gt;
</code></pre>

- `name` should be a unique name across all Richer Text extensions / ProseMirror plugins
- `trigger` is a unique character that will trigger the search list / filtering to take place.
- `path` is a relative endpoint returning JSON in the following structure:

```json
[
  {
    "label": "Hello world",
    "content": "<a href='https://i.pravatar.cc/64?img=1'>Link</a>"
  },
  {
    "label": "Something else",
    "content": "<p>Hello world from Snippets.json</p>"
  }
]
```

The path endpoint will receieve a query param of "query" which contains the search characters typed after the trigger characters.

Label will be displayed in the dropdown list that appears when the user types the trigger.

Content will be inserted in place of your trigger characters when the user selects an item from the list.
