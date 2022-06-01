require "json"
require "open-uri"

class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home ]

  def home
  end

  def index
<<<<<<< HEAD
    @produit = params[:search][:produit]
    if @produit == ""
      produit_search = ""
    else
      produit_search = "produit=#{@produit}&"
    end
    # # use geocoder to get address
    address = params[:search][:address]
    address_to_geo = Geocoder.search(address)
    coordinates = address_to_geo.first.coordinates #ARRAY
    @coordinates_hash = {
      lat: coordinates[0],
      lng: coordinates[1]
    }


    # Renaud GEOCODED/MAPBOX
    # @Producers = Producer.all
    # # the `geocoded` scope filters only producers with coordinates (latitude & longitude)
    # @markers = @producers.geocoded.map do |producer|
    #   {
    #     lat: producer.latitude,
    #     lng: producer.longitude,
    #     info_window: render_to_string(partial: "info_window", locals: { producer: producer })
    #     image_url: helpers.asset_url("REPLACE_THIS_WITH_YOUR_IMAGE_IN_ASSETS")
    #   }

    # Renaud GEOCODED/MAPBOX
    # the `geocoded` scope filters only producers with coordinates (latitude & longitude)
    # @location = @producers.geocoded.map do |producer|
    #   {
    #     lat: producer.latitude,
    #     lng: producer.longitude,
    #     # image_url: helpers.asset_url("REPLACE_THIS_WITH_YOUR_IMAGE_IN_ASSETS")
    #   }
    # end
=======
    # if params[:search][:produit] == ""
    #   produit = ""
    # else
    #   produit = "produit=#{params[:search][:produit]}&"
    # end
    # # # use geocoder to get address
    # address = Geocoder.search(params[:search][:address])
    # @coordinates = address.first.coordinates
    # @produit =
    # search_url = "https://opendata.agencebio.org/api/gouv/operateurs/?#{produit}lat=#{coordinates[0]}&lng=#{coordinates[1]}&nb=50&trierPar=%2F%2Fcoords&ordreTri=%2F%2Fdesc&filtrerVenteDetail=1"

    # url_serialized = URI(search_url).read
    # search_parsed = JSON.parse(url_serialized, symbolize_names: true)
    # @results = seach.items


    # latitude = params[:lattitude]
    # longititude = params[:longitude]
    # vente_direct = "&filtrerVenteDetail=1"
    # restaurant = "&filtrerRestaurants=1"
  end

  def producteurs
    map_data
    render json: @data
  end

  def map_data
    sleep(2)
    @data = [
      {
        name:
      }
    ]
>>>>>>> master
  end
end

  # def producteurs
  #   map_data
  #   render json: @data
  # end

  # def map_data
  #   sleep(2)
  #   @data = [
  #     {
  #       name:
  #     }
  #   ]
  # end
