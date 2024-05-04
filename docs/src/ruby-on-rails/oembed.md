---
layout: page
title: oEmbeds
---

<div class="callout" data-color="red">
  <strong>oEmbeds requires Postgres</strong>
</div>

<div class="callout" data-color="yellow">
  <strong>oEmbeds is a JSON only feature</strong>
  <p>Richer Text requires JSON storage to be used to support Custom Embeds</p>

  <pre><code>has_richer_text :body, store_as: :json</code></pre>
</div>

---

Full documentation for this feature is coming soon. 🚧

```ruby
  # In Routes
  resources :embeds, only: [:show, :create], constraints: {id: /[^\/]+/}  do
    collection do
      get :patterns
    end
  end

  skip_before_action :verify_authenticity_token, only: [:create]

  def create
    @embed = RicherText::OEmbed.from_url(params[:id])

    if @embed
      render json: {
        sgid: @embed.embeddable_sgid,
        content: "<richer-text-embed sgid=\"#{@embed.embeddable_sgid}\"></richer-text-embed>"
      }
    else
      head :not_found
    end
  end

  def show
    @embed = RicherText::Embed.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render html: "Embed not found", status: :not_found
  end

  def patterns
    render json: RicherText::OEmbed::PATTERNS
  end
```

---
