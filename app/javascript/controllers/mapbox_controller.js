import { Controller } from "@hotwired/stimulus"
import mapboxgl from "mapbox-gl"
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder"

export default class extends Controller {
  static values = {
    apiKey: String,
    location: Object,
  }

  connect() {
    this.markers = []
    mapboxgl.accessToken = this.apiKeyValue
    this.center = this.locationValue
    this.marker = null
    this.map = new mapboxgl.Map({
      container: this.element,
      zoom: 11,
      center: this.center,
      style: "mapbox://styles/mapbox/streets-v10"
    })

    this.geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      placeholder: 'Nouvelle adresse de recherche :',
      mapboxgl: mapboxgl,
      marker: false
    })

    this.map.addControl(this.geocoder)

    this.addLocationToMap()
    this.searchProducer()

    this.geocoder.on('result', (e) => {
      this.center = {
        lat: e.result.geometry["coordinates"][1],
        lng: e.result.geometry["coordinates"][0]
        }
      this.map.setCenter([this.center.lng, this.center.lat])
      this.map.setZoom(11)

      this.location.remove()
      this.markers.forEach((marker) => {marker.remove()})

      this.addLocationToMap()
      this.searchProducer()
    })
  }

  addLocationToMap() {
    this.location = new mapboxgl.Marker({ "color": "#73DC8C" })
      .setLngLat([this.center.lng, this.center.lat])
      .addTo(this.map)
  }

  searchProducer() {
    const url = `/producers?lng=${this.center.lng}&lat=${this.center.lat}`
    fetch(url)
    .then(response => response.json())
    .then(data => {
      this.addProducersToMap(data)
    })
  }

  addProducersToMap(data) {
    data.forEach((producer) => {
      const popup = new mapboxgl.Popup()
      // need to put filter targets in html in order to filter the markers
                        .setHTML(producer.popup_html)
      // Create a HTML element for your custom marker
      this.marker = new mapboxgl.Marker({ "color": "#4b78e6" })
        .setLngLat([producer["adressesOperateurs"][0]["long"], producer["adressesOperateurs"][0]["lat"]])
        .setPopup(popup)
        .addTo(this.map)
      this.markers.push(this.marker)
    });
  }
}
// const favorite = () => {
//   console.log('je veux mettre e favoris ce truc', productor)
// }

// popup.on('open', () => {
//   const buttonFavorite = popup.getElement().querySelector('button')
//   buttonFavorite.addEventListener('click', favorite)
// });
