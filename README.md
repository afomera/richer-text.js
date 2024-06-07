# @afomera/richer-text

An open-source text editor based on TipTap and ProseMirror for the modern age.

Drop-in ready for Ruby on Rails 7+ applications, using a bundler.

## Documentation / Try it out

Documentation can be found on our [website](https://richer-text.com).

## Requirements

We have one hard dependency, and that currently is to ensure ActiveStorage is setup in your applications.

Future versions will work to remove this hard dependency so it's usable for every project.

- ActiveStorage (@rails/activestorage npm package to power the image uploads) at the default routes

## Features

- Support for H1, H2 and H3 headings
- Support for Horizontal Rules (Lines)
- Code blocks and inline code snippets
- Blockquotes
- Text alignment (left, center and right justified)
- "Large" and Normal text size
- Built in support for Tables
- Command Menu (/ commands to insert things or change font size)
- Basic image uploading with ActiveStorage
- Added a 'Callout' functionality that allows users to bring attention to some messages in their Rich Text.
- Bold, Italics, Strikethrough, and Link marks
- Built in support for Richer Embeds (see docs for more info)
- Built in support for oEmbed from Twitter/Instagram/etc (see docs for more info)
- Built in support for Custom Suggestions, which are great to use for things like snippets or saved responses.
- Easily build out Mentions (see docs for more info)
- Support for 1900+ embeds via optional iFramely.com integration

## How the JS works

RicherText is written with Lit, using the TipTap libraries and extensions with a few of our own added. It's compiled into a web component so getting a Richer Text Editor is a matter of adding `<richer-text-editor></richer-text-editor>` into your HTML after importing the JS package into your entry point.
