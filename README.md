# @afomera/richer-text

This is a WIP and should NOT be used in production at the moment. This is currently classified as an 'experiment'.

RicherText aims to provide a richer text editing experience than what comes out of the box with ActionText in Rails. **It is however a seperate thing from ActionText** and is **not** backwards compatible.

## Features

- Support for H1 and H2 headings
- Support for Horizontal Rules
- Code blocks and inline code snippets
- Blockquotes
- Text alignment (left, center and right justified)
- "Large" and Normal text size
- Basic text highlighting
- Basic image uploading for ActiveStorage (See below for caveats!)
- Command Menu (/ commands to insert things or change font size)
- Added a 'Callout' functionality that allows users to bring attention to some messages in their Rich Text.
- Links

## Features not yet implemented

- Image alt tag editing
- More highlighting colors / text coloring
- Support for disabling extensions / portions out of the library.

## How the JS works

RicherText is written with Lit, using the TipTap libraries and extensions with a few of our own added. It's compiled into a web component so getting a Richer Text Editor is a matter of adding `<richer-text-editor></richer-text-editor>` into your HTML after importing the JS package into your entry point.

There is a hardcoded requirement for ActionStorage to be installed and setup for Image support to work. This setup is a bit lacking and something that would be ideal to improve before a full release. It currently uploads to `/rails/active_storage/direct_uploads` and inserts an `img` tag with a hardcoded url to the `window.location.origin + /rails/active_storage/blobs/redirect/${signedId}/${fileName}` path. Not ideal if the URL the content is served on gets changed images will break, additionally at the moment with no backend integration these images will not be associated with any given object and _will likely be purged_ if you run a PurgeUnattachedBlobs task.
