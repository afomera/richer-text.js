---
layout: page
title: RicherText.js Changelog
---

This is the changelog for our JavaScript package. Are you looking for the <a href="/ruby-changelog" target="_blank">Ruby Gem changelog</a>?

## main

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
