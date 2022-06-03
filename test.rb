require 'open-uri'

@search_url = "https://opendata.agencebio.org/api/gouv/operateurs/?lng=6.8249729&lat=45.8985612&nb=100&filtrerVenteDetail=1"
    json = open("data.txt").read

    codes = JSON.parse(json)['items'].map {|pro| pro['productions'].map{|prod| prod['code']}}.flatten.uniq
    res = codes.map {|x| [x, CategoryMapper.new.call(x)]}.to_h
    res = codes.reject {|x| CategoryMapper.new.call(x) }.sort
    ap res
# res = CategoryMapper.new.call('20.21')

# ap "res: #{res}"

# res = CategoryMapper.new.call('20.21')

# ap "res: #{res}"

# res = CategoryMapper.new.call('20.21')

# ap "res: #{res}"

# res = CategoryMapper.new.call('20.21')

# ap "res: #{res}"

# res = CategoryMapper.new.call('20.21')

# ap "res: #{res}"
