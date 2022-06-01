require "json"
require "open-uri"

class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home ]

  def home
  end

  def index
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
  end
end
