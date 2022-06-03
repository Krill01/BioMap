require "json"
require "open-uri"

class ProducersController < ApplicationController
  def index
    @search_url = "https://opendata.agencebio.org/api/gouv/operateurs/?lat=#{params[:lat]}&lng=#{params[:lng]}&nb=100&filtrerVenteDetail=1"
    json = URI.open(@search_url).read
    data = JSON.parse(json)['items']
    data.each do |producer|
      producer['popup_html'] = render_to_string(partial: "popup", locals: { producer: producer })
    end
    render json: data
  end
end
