require "json"
require "open-uri"
# require "services/category_mapper.rb"

class ProducersController < ApplicationController
  def index
    latitude = params[:lat]
    longitude = params[:lng]

    @search_url = "https://opendata.agencebio.org/api/gouv/operateurs/?lat=#{latitude}&lng=#{longitude}&nb=100&filtrerVenteDetail=1"
    producers_json = URI(@search_url).read
    producers_data = JSON.parse(producers_json)['items']

    producers_data.each do |producer|
      producer['productions'].select! do |production|
        production_category = CategoryMapper.new.call(production['code'])
        production['category'] = production_category
        production_category
      end
      producer['popup_html'] = render_to_string(partial: "popup", locals: { producer: producer })
    end
    render json: producers_data
  end
end
