class CategoryMapper
  MAPPING = YAML.load_file('data/categories.yml').sort_by { |_k, v| v['name'] }.to_h

  def call(code) # code qui vient de l'api '01.13.01' ou '20.12'
    MAPPING.each do |id, category|
      match_category = category["codes"].find do |c|
        # ap c.size
        # ap code.first(c.size)
        code.first(c.size) == c
      end
      return id if match_category
    end
    return nil
    # return string category
  end
end
