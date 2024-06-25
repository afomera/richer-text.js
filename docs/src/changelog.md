---
layout: page
title: RicherText.js Changelog
---

This is the changelog for our JavaScript package. Are you looking for the <a href="/ruby-changelog" target="_blank">Ruby Gem changelog</a>?

## main

---

## 2.0.0-beta.2

- Updated the `clear()` function to re-focus the editor instance after clearing content.
- Lookup if the dom has a text-editor-wrapper class name before creating a new element when initializing or rebuilding the editor to prevent multiple editor instances for the same Richer Text editor.
- Swap to use role-toolbar for the toolbar for better accessibility and keyboard navigation.

---

## 2.0.0-beta.1

- No changes from alpha.10, just a new version and tagged with a beta release.

---

## 2.0.0-alpha.10

- Removed cdn/dist folder, use `/dist` instead.

---

## 2.0.0-alpha.9

- Added `iframely-key` as an attribute to the Richer Text Editor html tag. When present (as the hashed API Key), a new Embed Media option will appear and allow embedding media via iframely.com. You'll need a paid iframely account to use this functionality, though it's free to get started to try it out.
- Added iframelyEmbed node.
- Fixed some issues where passing `oembed: false` wouldn't actually disable the built-in Embed functionality.

---

## 2.0.0-alpha.8

- Update `@tiptap` packages to 2.4.0
- Added `TipTapEditorBase` component, to be used as a Base Element to build a customized editor where needed. Updated RicherTextEditor component to use the new base editor component and validated the approach works by using the addExtensions functionality.

---

## 2.0.0-alpha.7

- Rewrite package bundler for package to use esbuild instead of Babel, which should provide better compatiability for other bundler types.
- Get manual importmaps flows working with new bundling system.

---

## 2.0.0-alpha.6

- Revert change back to alpha.3 code for package.json

---

## 2.0.0-alpha.5

- Remove specifying of `module` in package.json

---

## 2.0.0-alpha.4

- Specify the main file to `dist/index.js` for the main and `moudle` in package.json

---

## 2.0.0-alpha.3

- Added `tabindex="-1"` to buttons for toolbar except Bold.
- Improve focus state when changing a callout color
- Update callouts and tables option when passed to `richer-text-editor` element, to work properly.

---

## 2.0.0-alpha.2

- Add in oEmbed support for the Link Menu, if `oembed` is passed to the `richer-text-editor` component and `embeds-path` is also provided it will be enabled in the Link menu.
- Update @tiptap packages to 2.3.1
- Add back in [Editor Events](/events).
- Add `autofocus` attribute, valid values are true or false.

---

## 2.0.0-alpha.1

- Completely rewrite the editor to drop the React / React DOM dependency. Now dependent on Lit to generate our custom elements, but for an application using Richer Text, this won't matter.
- New functionality to allow developers implementing Richer Text into their project to define the Toolbar buttons.

### Known Issues

- `bubble-menu-options` when passed to the `richer-text-editor` component will do nothing because it's not been reimplemented
- The editor currently only emits a `change` event where `event.detail` contains an html and json key. Other editor events are not implemented yet.
- There's no hooks to customize extensions if you wanted to extend Richer Text's Editor.
- Full CSS Customization options are not yet implemented.
- OEmbed support is missing, there's no way to embed into v2 yet from the Link menu.
- Text color and highlight colors have not been implemented yet.

---

## 1.0.0-beta.1

- Same as 0.19.0 but now with 100% more 1.0 beta goodness.

---

## 0.19.0

- Updated all tiptap related extensions to v2.1.13.

---

## 0.18.0

- Improved highlighting support by offering a number of colors off the bat.
- Added support for setting text colors.
  - Added @tiptap/extension-color to dependencies

---

## 0.17.0

- Added support for oEmbed embeds by adding an `oembed` attribute to the editor, when passing it as true, the editor will look at `embedsPath/patterns` to load the oembed patterns in, and POST to the `embedsPath` endpoint when the users chooses to Embed instead. For more details checkout our oEmbed documentation.

---

## 0.16.1

- Fought a battle with CORS and lost, but it's fixed now, needed to set `sandbox="allow-same-origin"` on the Embeds iframe.

---

## 0.16.0

- Introduce Custom Embeds extension. For more information check the documentation <a href="/ruby-on-rails/embeds">here</a>.

---

## 0.15.0

- Introduce Custom Suggestion extension, this can be used to add functionality like saved/canned replies, liquid variable completion and more. The editor will fetch a provided JSON endpoint for each configuration of the custom suggestions extension, and allow filtering through the list. Then when the user selects one, it will insert the "content" attribute returned for that item from the JSON endpoint.

  Configuring your editor instance is a matter of adding a `custom-suggestions` attribute and passing it a JSON array of objects configured in the following format:

  ```json
  [
    { "name": "savedReplies", "trigger": "!", "path": "/saved_replies.json" },
    {
      "name": "liquidCompletions",
      "trigger": "{{",
      "path": "/liquid_completions.json"
    }
  ]
  ```

  Name should be a unique name across Richer Texts extensions and other types of custom suggestions. Trigger is the character(s) that the user types before the popup will start searching. Path is a relative URL path to the endpoint returning JSON in the following format

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

---

## 0.14.2

- Improved Image extension by providing a placeholder spin animation to show an image is uploading.

---

## 0.14.1

- Added @tiptap/extension-code-block package to dependencies
- Added @tiptap/extension-horizontial-rule package to dependencies

---

## 0.14.0

- Introduce a new Mention extension for @mentions support. To use read below:

  - Create an endpoint that returns json in the following format:

  ```json
  [
    {
      "label": "John Doe",
      "id": "gid://app/User/1",
      "avatarUrl": "https://i.pravatar.cc/64?img=1"
    },
    {
      "label": "Jane Doe",
      "id": "gid://app/User/2",
      "avatarUrl": "https://i.pravatar.cc/64?img=5"
    }
  ]
  ```

  - Pass the relative path to the `richer-text-editor` tag by passing `mentionable-users-path` with the URL path of the json endpoint. For example if the users.json endpoint lived at your app root you should pass "/users.json".
  - The endpoint can receive a "query" param with the search term from the user as they type after the @. So typing @John would send a query param of "John".
  - If you're using our `richer_text` Rails gem, you'll need to return Global IDs like so `user.to_global_id.to_s` so we can properly identify the user on the backend.

---

## 0.13.0

- Introduce Emoji extension 🥳. For now, unless we get feedback to make it opt-in, everyone will be opted in to the emojis. You can pass `emoji: false` if you're looking to opt-out of Emojis.

---

## 0.12.0

- Updated Image extension with controls for making images, small, medium and large at 25%, 50%, and 100% widths repsectively
- Added delete button the Edit Image Controls

---

## 0.11.0

- Added ability to pass `serializer="json"` to the Richer Text component for JSON serialization. Additionally updated the content argument to JSON.parse the content when the serializer is JSON.

- Supported serializer values is "html" (default) or "json"

---

## 0.10.0

- Renamed css variables from --editor- to --rte- namespace.
- Renamed `editor-` css class prefix with `richer-text-editor-` prefix.

---
