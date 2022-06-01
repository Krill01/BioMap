import { Controller } from "@hotwired/stimulus"
import mapboxgl from "mapbox-gl"
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder"

export default class extends Controller {
  static values = {
    apiKey: String,
    location: Array,
    apiUrl: String,
  }

  connect() {
    mapboxgl.accessToken = this.apiKeyValue

    this.map = new mapboxgl.Map({
      container: this.element,
      style: "mapbox://styles/mapbox/streets-v10"
    })
    this.#addLocationToMap()
    this.#fitMapToLocation()
    this.map.addControl(new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl
    }))
    this.searchProducer()
  }

  searchProducer() {
    const url = this.apiUrlValue
    fetch(url)
    .then(response => response.json())
    .then(data => {
      this.addMarkersToMap(data);
      this.fitMapToMarkers(data);
    })
  }

  addMarkersToMap(data) {
    data["items"].forEach((marker) => {
      console.log(marker["adressesOperateurs"][0]["long"])
      console.log(marker["adressesOperateurs"][0]["lat"])
      // const popup = new mapboxgl.Popup().setHTML(marker.info_window)
      // Create a HTML element for your custom marker
      // const customMarker = document.createElement("div")
      // customMarker.className = "marker"
      // customMarker.style.backgroundImage = `url('${marker.image_url}')`
      // customMarker.style.backgroundSize = "contain"
      // customMarker.style.width = "25px"
      // customMarker.style.height = "25px"
      new mapboxgl.Marker()
        .setLngLat([marker["adressesOperateurs"][0]["long"], marker["adressesOperateurs"][0]["lat"]])
        // .setPopup(popup)
        .addTo(this.map)
    });
  }

  fitMapToMarkers(data) {
    const bounds = new mapboxgl.LngLatBounds()
    data["items"].forEach(marker => bounds.extend([marker["adressesOperateurs"][0]["long"], marker["adressesOperateurs"][0]["lat"]]))
    this.map.fitBounds(bounds, { padding: 70, maxZoom: 15, duration: 100 })
  }


  #addLocationToMap() {
    this.locationValue.forEach((location) => {
      // const customLocation = document.createElement("div")
      // customLocation.className = "location"
      // customLocation.style.backgroundSize = "contain"
      // customLocation.style.width = "25px"
      // customLocation.style.height = "25px"
      new mapboxgl.Marker()
        .setLngLat([location.lng, location.lat])
        .addTo(this.map)
    });
  }

  #fitMapToLocation() {
    const bounds = new mapboxgl.LngLatBounds()
    this.locationValue.forEach(location => bounds.extend([location.lng, location.lat]))
    this.map.fitBounds(bounds, { padding: 70, maxZoom: 15, duration: 0 })
  }

}
