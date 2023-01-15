
class Builders::Helpers < SiteBuilder
  def build
    helper "version_number", :version_number
  end

  def version_number
    package_json_file = File.join(File.expand_path("../../../", __dir__), "package.json")

    return unless File.exist?(package_json_file)
    package_json = File.read(package_json_file)
    JSON.parse(package_json)["version"].to_s
  end
end
