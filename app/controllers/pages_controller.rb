class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home ]

  def home
  end

  def index
    produit = "produit=#{params[:query]}&"
    latitude = params[:lattitude]
    longititude = params[:longitude]
    # vente_direct = "&filtrerVenteDetail=1"
    # restaurant = "&filtrerRestaurants=1"

    api_url = "https://opendata.agencebio.org/api/gouv/operateurs/?#{produit}lat=#{latitude}&lng=#{longitude}&nb=50&trierPar=%2F%2Fcoords&ordreTri=%2F%2Fdesc&filtrerVenteDetail=1"
  end
end
