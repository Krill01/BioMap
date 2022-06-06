require 'open-uri'

res = CategoryMapper.new.call('20.21')

ap "res: #{res}"

res = CategoryMapper.new.call('01.49.3')

ap "res: #{res}"

res = CategoryMapper.new.call('01.25.3')

ap "res: #{res}"
