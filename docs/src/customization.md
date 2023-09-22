---
layout: page
title: Customization
---

## Options

Optionally, you can customize a few of the attributes by passing them as attributes to the `<richer-text-editor>` tag.

| Option                 | &nbsp;&nbsp;&nbsp; |           Default            |              Allowed values |
| :--------------------- | ------------------ | :--------------------------: | --------------------------: |
| serializer             |                    |            "html"            |              "html", "json" |
| input                  |                    |              ""              |               Form field id |
| content                |                    |              ""              |                      String |
| placeholder            | &nbsp;&nbsp;&nbsp; |     "Write something..."     |                      String |
| callouts               |                    |           "false"            |             "true", "false" |
| tables                 |                    |           "false"            |             "true", "false" |
| show-menu-bar          |                    |            "true"            |             "true", "false" |
| emoji                  |                    |            "true"            |             "true", "false" |
| bubble-menu-options    |                    | `"{ \"highlight\": false }"` | `"{ \"highlight\": true }"` |
| mentionable-users-path |                    |              ""              |  URL path to .json endpoint |

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

<h2 id="customizing-menu-bar">Customizing the Menu Bar</h2>

Want a smaller menu bar, or perhaps you don't want a border? Using CSS Variables you can tweak the border color, icon size, and any other colors.

If you'd like, you can also apply these variables at the ==`:root`== level, just ensure your variables are defined after the Richer Text css is imported into your project.

<div class="richer-text-editor--without-border">
  <richer-text-editor></richer-text-editor>
</div>

```html
<div class="richer-text-editor--without-border">
  <richer-text-editor></richer-text-editor>
</div>
```

```css
.richer-text-editor--without-border {
  --rte-menu-bar-border-color: none;
  --rte-button-size: 20px;

  --rte-menu-bar-background-color: #efefef;
}
```

---

<div class="richer-text-editor--with-menu-bar-background">
  <richer-text-editor></richer-text-editor>
</div>

```html
<div class="richer-text-editor--with-menu-bar-background">
  <richer-text-editor></richer-text-editor>
</div>
```

```css
.richer-text-editor--with-menu-bar-background {
  --rte-menu-bar-border-color: none;

  --rte-menu-bar-background-color: #efefef;
  --rte-menu-bar-button-background-color: #efefef;
  --rte-menu-bar-button-text-color: var(--rte-button-text-color);
  --rte-menu-bar-button-active-text-color: var(--rte-button-active-color);
  --rte-menu-bar-button-disabled-text-color: var(--rte-button-disabled-color);
  --rte-menu-bar-button-active-background-color: #d7dae0;
}
```

<h2 id="all-css-vars">All CSS Variables</h2>

We support customizing the looks of the Richer Text Editor by using CSS variables to control coloring.

**Default Variables**:

```css
:root {
  /* Callouts */
  --callout-gray-background-color: #f2f3f7;
  --callout-gray-border-color: #d0d5dd;
  --callout-gray-text-color: #344054;

  --callout-blue-background-color: #d1e9ff;
  --callout-blue-border-color: #84caff;
  --callout-blue-text-color: #2b6fe6;

  --callout-green-background-color: #d1f2d7;
  --callout-green-border-color: #84e1a9;
  --callout-green-text-color: #0f8b3d;

  --callout-yellow-background-color: #fff9d1;
  --callout-yellow-border-color: #ffe084;
  --callout-yellow-text-color: #a38310;

  --callout-red-background-color: #fedada;
  --callout-red-border-color: #ff8484;
  --callout-red-text-color: #b30000;

  /* General colors */
  --rte-text-color: #374151;
  --rte-border-color: #d0d5dd;
  --rte-placeholder-text-color: #a0aec0;
  --rte-content-background-color: #ffffff;
  --rte-content-focus-color: #ec4899;
  --rte-link-color: #ec4899;

  /* Highlight colors */
  --rte-highlight-color-one: #feb7b3;
  --rte-highlight-color-two: #fef1b3;
  --rte-highlight-color-three: #b3dcfe;

  /* General buttons */
  --rte-button-text-color: #667085;
  --rte-button-active-color: #101828;
  --rte-button-disabled-color: #d0d5dd;
  --rte-button-active-background-color: #f1f3f8;
  --rte-button-size: 24px;

  /* MenuBar */
  --rte-menu-bar-background-color: #ffffff;
  --rte-menu-bar-border-color: var(--rte-border-color);
  --rte-menu-bar-seperator-background-color: #d0d5dd;
  --rte-menu-bar-button-background-color: #ffffff;
  --rte-menu-bar-button-text-color: var(--rte-button-text-color);
  --rte-menu-bar-button-active-text-color: var(--rte-button-active-color);
  --rte-menu-bar-button-disabled-text-color: var(--rte-button-disabled-color);
  --rte-menu-bar-button-active-background-color: #f1f3f8;
  --rte-menu-bar-top-radius: 0rem;

  /* BubbleMenu */
  --rte-bubble-menu-background-color: #ffffff;
  --rte-bubble-menu-border-color: var(--rte-border-color);
  --rte-bubble-menu-button-text-color: var(--rte-button-text-color);
  --rte-bubble-menu-button-active-text-color: var(--rte-button-active-color);
  --rte-bubble-menu-button-disabled-text-color: var(
    --rte-button-disabled-color
  );
  --rte-bubble-menu-button-active-background-color: var(
    --rte-button-active-background-color
  );

  /* MenuList (ie Command Menu) */
  --rte-menu-list-background-color: #ffffff;
  --rte-menu-list-border-color: var(--rte-border-color);
  --rte-menu-list-item-text-color: var(--rte-text-color);
  --rte-menu-list-button-active-text-color: var(--rte-button-active-color);
  --rte-menu-list-button-disabled-text-color: var(--rte-button-disabled-color);
  --rte-menu-list-button-active-background-color: var(
    --rte-button-active-background-color
  );
}
```
