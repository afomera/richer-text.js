---
layout: page
title: Customization
---

## Options

Optionally, you can customize a few of the attributes by passing them as attributes to the `<richer-text-editor>` tag.

| Option              | &nbsp;&nbsp;&nbsp; |           Default            |              Allowed values |
| :------------------ | ------------------ | :--------------------------: | --------------------------: |
| input               |                    |              ""              |               Form field id |
| content             |                    |              ""              |                      String |
| placeholder         | &nbsp;&nbsp;&nbsp; |     "Write something..."     |                      String |
| callouts            |                    |           "false"            |             "true", "false" |
| tables              |                    |           "false"            |             "true", "false" |
| show-menu-bar       |                    |            "true"            |             "true", "false" |
| bubble-menu-options |                    | `"{ \"highlight\": false }"` | `"{ \"highlight\": true }"` |

```html
<richer-text-editor
  content="I'm an editor without a menu bar and no callouts."
  callouts="false"
  show-menu-bar="false"
></richer-text-editor>
```

<h2>Customizing the Menu Bar</h2>

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
  --editor-menu-bar-border-color: none;
  --editor-button-size: 20px;

  --editor-menu-bar-background-color: #efefef;
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
  --editor-menu-bar-border-color: none;

  --editor-menu-bar-background-color: #efefef;
  --editor-menu-bar-button-background-color: #efefef;
  --editor-menu-bar-button-text-color: var(--editor-button-text-color);
  --editor-menu-bar-button-active-text-color: var(--editor-button-active-color);
  --editor-menu-bar-button-disabled-text-color: var(
    --editor-button-disabled-color
  );
  --editor-menu-bar-button-active-background-color: #d7dae0;
}
```

<h2>All CSS Variables</h2>

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
  --editor-text-color: #374151;
  --editor-border-color: #d0d5dd;
  --editor-placeholder-text-color: #a0aec0;
  --editor-content-background-color: #ffffff;
  --editor-content-focus-color: #ec4899;
  --editor-link-color: #ec4899;

  /* Highlight colors */
  --editor-highlight-color-one: #feb7b3;
  --editor-highlight-color-two: #fef1b3;
  --editor-highlight-color-three: #b3dcfe;

  /* General buttons */
  --editor-button-text-color: #667085;
  --editor-button-active-color: #101828;
  --editor-button-disabled-color: #d0d5dd;
  --editor-button-active-background-color: #f1f3f8;
  --editor-button-size: 24px;

  /* MenuBar */
  --editor-menu-bar-background-color: #ffffff;
  --editor-menu-bar-border-color: var(--editor-border-color);
  --editor-menu-bar-seperator-background-color: #d0d5dd;
  --editor-menu-bar-button-background-color: #ffffff;
  --editor-menu-bar-button-text-color: var(--editor-button-text-color);
  --editor-menu-bar-button-active-text-color: var(--editor-button-active-color);
  --editor-menu-bar-button-disabled-text-color: var(
    --editor-button-disabled-color
  );
  --editor-menu-bar-button-active-background-color: #f1f3f8;
  --editor-menu-bar-top-radius: 0rem;

  /* BubbleMenu */
  --editor-bubble-menu-background-color: #ffffff;
  --editor-bubble-menu-border-color: var(--editor-border-color);
  --editor-bubble-menu-button-text-color: var(--editor-button-text-color);
  --editor-bubble-menu-button-active-text-color: var(
    --editor-button-active-color
  );
  --editor-bubble-menu-button-disabled-text-color: var(
    --editor-button-disabled-color
  );
  --editor-bubble-menu-button-active-background-color: var(
    --editor-button-active-background-color
  );

  /* MenuList (ie Command Menu) */
  --editor-menu-list-background-color: #ffffff;
  --editor-menu-list-border-color: var(--editor-border-color);
  --editor-menu-list-item-text-color: var(--editor-text-color);
  --editor-menu-list-button-active-text-color: var(
    --editor-button-active-color
  );
  --editor-menu-list-button-disabled-text-color: var(
    --editor-button-disabled-color
  );
  --editor-menu-list-button-active-background-color: var(
    --editor-button-active-background-color
  );
}
```
