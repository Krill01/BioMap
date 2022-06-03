class CategoryMapper
  MAPPING = YAML.load_file('data/categories.yml')

  def call(code) # code qui vient de l'api '01.13.01' ou '20.12'
    MAPPING.each do |category|
      match_category = category["codes"].find do |codes|
        codes.include?(code.first(7)) || codes.include?(code.first(5))
      end
      return category["name"] if match_category
    end
    return nil
    # return string category
  end
end