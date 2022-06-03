require "json"
require "open-uri"
# require "services/category_mapper.rb"

class ProducersController < ApplicationController
  def index
    @search_url = "https://opendata.agencebio.org/api/gouv/operateurs/?lat=#{params[:lat]}&lng=#{params[:lng]}&nb=100&filtrerVenteDetail=1"
    json = URI.open(@search_url).read
    data = JSON.parse(json)['items']
    data.each do |producer|
      producer['productions'].select! do |production|
        production_category = CategoryMapper.new.call(production['code'])
        production['category'] = production_category
        production_category
      end
      producer['popup_html'] = render_to_string(partial: "popup", locals: { producer: producer })
    end
    render json: data
  end
end
