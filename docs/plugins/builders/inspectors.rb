class Builders::Inspectors < SiteBuilder
  def build
    inspect_html do |document|
      document.css("h2[id],h3[id],h4[id],h5[id],h6[id]").each do |heading|
        heading << %(
          <a href="##{heading[:id]}" class="anchor" aria-hidden="true">#</a>
        )
      end
    end
  end
end
