import { Controller } from "@hotwired/stimulus"
import mapboxgl from "mapbox-gl"
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder"

export default class extends Controller {
  static values = {
    apiKey: String,
    location: Object,
  }

  connect() {
    mapboxgl.accessToken = this.apiKeyValue
    this.markers = []
    this.map = new mapboxgl.Map({
      container: this.element,
      zoom: 10,
      center: this.locationValue,
      style: "mapbox://styles/mapbox/streets-v10"
    })

    this.map.addControl(this.geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl
    }))

    this.addLocationToMap(this.locationValue)
    this.searchProducer(this.locationValue)

    // this.geocoder.on('click', (e) => { this.map.setCenter{ this.center = e.features[0].geometry.coordinates } })
    // console.log(this.center)
    // this.markers.remove()
    // this.addLocationToMap(this.center)
    // this.searchProducer(this.center)
  }

  addLocationToMap(data) {
    new mapboxgl.Marker({ "color": "#FD1015" })
      .setLngLat([data.lng, data.lat])
      .addTo(this.map)
  }

  searchProducer(data) {
    const url = `/producers?lng=${data.lng}&lat=${data.lat}`
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
      markers.push(new mapboxgl.Marker()
        .setLngLat([producer["adressesOperateurs"][0]["long"], producer["adressesOperateurs"][0]["lat"]])
        .setPopup(popup)
        .addTo(this.map)
      )

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
