require "json"
require "open-uri"

class PagesController < ApplicationController
  def home
  end

  def index
    address = params[:search][:address]
    Geocoder.configure(:timeout => 5)
    address_to_geo = Geocoder.search(address)
    coordinates = address_to_geo.first.coordinates #ARRAY
    @coordinates_hash = {
      lat: coordinates[0],
      lng: coordinates[1]
    }
  end
end
