import { Controller } from "@hotwired/stimulus"
import mapboxgl from "mapbox-gl"

export default class extends Controller {
  static values = {
    apiKey: String,
    location: Object,
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

  addLocationToMap() {
    new mapboxgl.Marker({ "color": "#FD1015" })
      .setLngLat([this.locationValue.lng, this.locationValue.lat])
      .addTo(this.map)
  }

  searchProducer() {
    const url = `/producers?lng=${this.locationValue.lng}&lat=${this.locationValue.lat}`
    fetch(url)
    .then(response => response.json())
    .then(data => {
      this.addProducersToMap(data)
    })
  }

  addProducersToMap(data) {
    data.forEach((producer) => {
      const popup = new mapboxgl.Popup()
                        .setHTML(producer.popup_html)
      // Create a HTML element for your custom marker
      new mapboxgl.Marker()
        .setLngLat([producer["adressesOperateurs"][0]["long"], producer["adressesOperateurs"][0]["lat"]])
        .setPopup(popup)
        .addTo(this.map)

      // const favorite = () => {
      //   console.log('je veux mettre e favoris ce truc', productor)
      // }

      // popup.on('open', () => {
      //   const buttonFavorite = popup.getElement().querySelector('button')
      //   buttonFavorite.addEventListener('click', favorite)
      // });
    });
  }

}
