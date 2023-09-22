---
layout: page
title: Mentions
---

These days it's not to uncommon to want to provide users with the ability to @mention other users, perhaps on their team or account, or just across the app like if you had a Blog.

Richer Text makes it easier to build mentions into your applications because we handled the front-end for you.

## Requirements

- RicherText.js v0.14.1 or higher
- richer_text rubygem v0.9.0 or higher

## We provide

- The front-end portion of things:
  - Showing a list of users from your JSON endpoint
  - Sending the users query param to your JSON endpoint as they type
  - Selecting a user
  - Inserting that user into the document

## You provide

- An endpoint returning JSON in our specified formatting, passed to our `richer-text-editor` component.
- A user record that you wish to allow to be mentioned.
- Logic for handling the mentionees of a given Richer Text record.

## Getting started

- Choose which type of storage you'll be doing for your Richer Text backend. We recommend JSON as it's the most flexible and gives you ultimately the most control over rendering your content.

  If using JSON:

  ```ruby
  has_richer_text :body, store_as: :json
  ```

  If using HTML:

  ```ruby
  has_richer_text :body
  ```

- Build an endpoint that returns an array of JSON objects with the following properties: "label", "id" and "avatarUrl". ID should be a `GlobalID` representation of your user id. We'll pass this gid to the Locator class from within the Gem to return your mentionees.

  The endpoint should return JSON in the following format, and optionally use the "query" param to search / filter users on the Backend:

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
      "avatarUrl": "https://i.pravatar.cc/64?img=2"
    }
  ]
  ```

- Pass the _path_ of your endpoint to the `richer_text_area` form helper.

  <pre><code>&lt;%= form.richer_text_area :body, "mentionable-users-path": "/users.json" %&gt;</code></pre>

- Handle the mentionees however you may like, one idea is to use a callback when your record is updated to notify mentionees:

  ```ruby
  class Post < ApplicationRecord
    has_richer_text :body, store_as: :json

    has_many :mentions, class_name: "Mention", as: :mentionable, dependent: :destroy
    after_save_commit :notify_mentionees

    def notify_mentionees
      # body being the attribute you defined with has_richer_text
      body.mentionees.each do |mentionee|
        # We recommend a model to keep track of if a user has been mentioned before
        # and only sending notifications after create
        mentions.find_or_create_by(mentionee: mentionee, mentioner: author)
      end
    end
  end
  ```

  ```ruby
  class Mention < ApplicationRecord
    # ... omitted code
    after_create_commit :send_notification

    def send_notification
      # Send an email, etc, rule the world.
    end
  end
  ```

- Try it out! Try to @ mention some of your users returned in the JSON response. Once you save the record you should be able to open a Rails console and try the following:

  ```ruby
    Post.find(1).body.mentionees
  ```

That's all that there is to implementing mentions with Richer Text. We hope you enjoy using this feature.

## Customizing

You can customize the following CSS classes to style mentions however you'd like

```
.richer-text--mention
.richer-text--mention-img
.richer-text--mention-label
```
