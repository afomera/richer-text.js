---
layout: page
title: Customization
---

## Options

Optionally, you can customize a few of the attributes by passing them as attributes to the `<richer-text-editor>` tag.

| Option                 | &nbsp;&nbsp;&nbsp; |      Default      |                  Allowed values | Notes                                                           |
| :--------------------- | ------------------ | :---------------: | ------------------------------: | --------------------------------------------------------------- |
| serializer             |                    |      "html"       |                  "html", "json" |                                                                 |
| input                  |                    |        ""         |                   Form field id |                                                                 |
| content                |                    |        ""         |                          String |                                                                 |
| placeholder            | &nbsp;&nbsp;&nbsp; | "Start typing..." |                          String |                                                                 |
| callouts               |                    |      "false"      |                 "true", "false" |                                                                 |
| tables                 |                    |      "false"      |                 "true", "false" |                                                                 |
| emoji                  |                    |      "true"       |                 "true", "false" |                                                                 |
| mentionable-users-path |                    |        ""         |      URL path to .json endpoint |                                                                 |
| embeds-path            |                    |     "/embeds"     | URL path to controller endpoint |                                                                 |
| oembed                 |                    |      "false"      |                 "true", "false" | When present, embeds-path must be provided                      |
| attachments            |                    |      "true"       |                 "true", "false" | Disables attachment button, and drag and drop/pasting of images |

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

<h2 id="configuring-the-toolbar">Configuring the Toolbar</h2>

Richer Text supports customizing the toolbar as well

For example:

```html
<richer-text-editor
  toolbar-preset="default"
  toolbar-placement="top"
></richer-text-editor>
```

<richer-text-editor toolbar-preset="default" toolbar-placement="top"></richer-text-editor>

```html
<richer-text-editor
  toolbar-preset="minimal"
  toolbar-placement="bottom"
></richer-text-editor>
```

<richer-text-editor toolbar-preset="minimal" toolbar-placement="bottom"></richer-text-editor>

### Customizing options completely

Optionally you can specify the toolbar using the `toolbar` attribute:

```html
<richer-text-editor
  toolbar="heading-1, heading-2, divider, bold, italic, strike"
  toolbar-placement="top"
></richer-text-editor>
```

<richer-text-editor
toolbar="heading-1, heading-2, divider, bold, italic, strike"
toolbar-placement="top"

> </richer-text-editor>

The supported options are:

```js
"bold",
  "italic",
  "strike",
  "code",
  "divider",
  "heading-1",
  "heading-2",
  "heading-3",
  "bulletlist",
  "orderedlist",
  "blockquote",
  "code-block",
  "horizontal-rule",
  "divider",
  "attachment",
  "spacer",
  "undo",
  "redo",
  "embed";
```
