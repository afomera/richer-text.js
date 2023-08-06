---
layout: page
title: Events
---

RicherText has a few events that the editor will emit when certain actions happen.

## Create

The editor will emit a `richer-text-editor:create` event when the editor is ready.

## Update

The editor will emit a `richer-text-editor:update` event when the editor content changes.

Included in the `event.detail` you can find a `html`, `json` and `isEmpty` keys with the respective data.

## Focus

Called when the editor is focused. Emits a `richer-text-editor:focus` event.

## Blur

Called when the editor loses focus. Emits a `richer-text-editor:blur` event.

Inside of `event.detail` you can find an `isEmpty`
