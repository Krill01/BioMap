import { Controller } from "@hotwired/stimulus"
import mapboxgl from "mapbox-gl"

export default class extends Controller {
  static values = {
    apiKey: String,
    location: Object,
    apiUrl: String,
  }

  connect() {
    mapboxgl.accessToken = this.apiKeyValue

    this.map = new mapboxgl.Map({
      container: this.element,
      zoom: 10,
      center: this.locationValue,
      style: "mapbox://styles/mapbox/streets-v10"
    })
    this.addLocationToMap()
    this.searchProducer()
  }

  searchProducer() {
    const url = this.apiUrlValue
    fetch(url)
    .then(response => response.json())
    .then(data => {
      this.addMarkersToMap(data)
      // this.fitMapToMarkers(data)
    })
  }

  addMarkersToMap(data) {
    data["items"].forEach((productor) => {
      const popup = new mapboxgl.Popup()
                        .setHTML(`<div><h1>${productor['denominationcourante']}</h1> <button>ici</button> </div>`)
      // Create a HTML element for your custom marker
      new mapboxgl.Marker()
        .setLngLat([productor["adressesOperateurs"][0]["long"], productor["adressesOperateurs"][0]["lat"]])
        .setPopup(popup)
        .addTo(this.map)

      const favorite = () => {
        console.log('je veux mettre e favoris ce truc', productor)
      }

      popup.on('open', () => {
        const buttonFavorite = popup.getElement().querySelector('button')
        buttonFavorite.addEventListener('click', favorite)
      });
    });
  }

  addLocationToMap() {
    new mapboxgl.Marker({ "color": "#FD1015" })
      .setLngLat([this.locationValue.lng, this.locationValue.lat])
      .addTo(this.map)
  }
}
