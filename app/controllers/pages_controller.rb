require "json"
require "open-uri"

class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home ]

  def home
  end

  def index
    address = params[:search][:address]
    address_to_geo = Geocoder.search(address)
    coordinates = address_to_geo.first.coordinates #ARRAY
    @coordinates_hash = {
      lat: coordinates[0],
      lng: coordinates[1]
    }
  end
end
