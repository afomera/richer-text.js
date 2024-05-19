---
layout: page
title: Customization
---

## Options

Optionally, you can customize a few of the attributes by passing them as attributes to the `<richer-text-editor>` tag.

| Option                 | &nbsp;&nbsp;&nbsp; |      Default      |                  Allowed values | Notes                                      |
| :--------------------- | ------------------ | :---------------: | ------------------------------: | ------------------------------------------ |
| serializer             |                    |      "html"       |                  "html", "json" |                                            |
| input                  |                    |        ""         |                   Form field id |                                            |
| content                |                    |        ""         |                          String |                                            |
| placeholder            | &nbsp;&nbsp;&nbsp; | "Start typing..." |                          String |                                            |
| callouts               |                    |      "false"      |                 "true", "false" |                                            |
| tables                 |                    |      "false"      |                 "true", "false" |                                            |
| emoji                  |                    |      "true"       |                 "true", "false" |                                            |
| mentionable-users-path |                    |        ""         |      URL path to .json endpoint |                                            |
| embeds-path            |                    |     "/embeds"     | URL path to controller endpoint |                                            |
| oembed                 |                    |      "false"      |                 "true", "false" | When present, embeds-path must be provided |

<h2 id="json-serializer">JSON Serializer</h2>

Richer Text allows you to take full control of storing, and rendering content by using JSON to serialize the content instead of the default (HTML) serializer.

<richer-text-editor
input="json_serializer"
serializer="json"
callouts="true"
tables="true"
content='{"type":"doc","content":[{"type":"paragraph","attrs":{"textAlign":"left"},"content":[{"type":"text","text":"Hello from the "},{"type":"text","marks":[{"type":"bold"}],"text":"JSON"},{"type":"text","text":" serializer."}]}]}'> </richer-text-editor>

JSON output:
<textarea style="width: 100%" rows="6" type="text" id="json_serializer">{"type":"doc","content":[{"type":"paragraph","attrs":{"textAlign":"left"},"content":[{"type":"text","text":"Hello from the "},{"type":"text","marks":[{"type":"bold"}],"text":"JSON"},{"type":"text","text":" serializer."}]}]}</textarea>

```html
<richer-text-editor
  serializer="json"
  content='{"type":"doc","content":[{"type":"paragraph","attrs":{"textAlign":"left"},"content":[{"type":"text","text":"Hello from the "},{"type":"text","marks":[{"type":"bold"}],"text":"JSON"},{"type":"text","text":" serializer."}]}]}'
>
</richer-text-editor>
```
