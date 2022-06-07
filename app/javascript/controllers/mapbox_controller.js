import { Controller } from "@hotwired/stimulus"
import mapboxgl from "mapbox-gl"
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder"

export default class extends Controller {
  static targets = ['mapElement']

  static values = {
    apiKey: String,
    location: Object,
    categoriesId: Array,
    // mettre categories ici
  }

  sendCoordinates() {
    const event = new CustomEvent('coordinatesChanged', {
      detail: this.center
    })
    this.element.dispatchEvent(event);
  }

  filter(e) {
    const filterCategories = e.detail
    this.dataMarkers.forEach (dataMarker => {

      if (filterCategories.length == 0) {
        dataMarker.marker.getElement().hidden = false
        return
      }

      const producerCat = dataMarker.producer.productions.map(production => production.category)
      // if at least one category matches in filter items, display
      const dataMarkerContainsOneFilterCategory = producerCat.some( category => filterCategories.includes(category))
      dataMarker.marker.getElement().hidden = !dataMarkerContainsOneFilterCategory

    })
  }
// ===================================================================================================
  connect() {
    window.bbb = this
    this.markers = []
    mapboxgl.accessToken = this.apiKeyValue
    this.center = this.locationValue
    this.sendCoordinates()
    this.marker = null
    this.dataMarkers = []
    this.map = new mapboxgl.Map({
      container: this.mapElementTarget,
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

    this.updateMapOnGeocoder()
  }
// ===================================================================================================
  addLocationToMap() {
    this.location = new mapboxgl.Marker({ "color": "#73DC8C" })
      .setLngLat([this.center.lng, this.center.lat])
      .addTo(this.map)
  }
// ===================================================================================================
  searchProducer() {
    const url = `/producers?lng=${this.center.lng}&lat=${this.center.lat}`
    fetch(url)
    .then(response => response.json())
    .then(data => {
      this.addProducersToMap(data)
    })
  }
// ===================================================================================================
  hidePopups() {
    this.markers.forEach((m) => {
      const isOpen = m.getPopup().isOpen()
      if (isOpen) { m.togglePopup() }
    })
  }
// ===================================================================================================
  addEventMouseEnter(marker) {
    marker.getElement().addEventListener("mouseenter", (e) => {
      this.hidePopups()
      marker.togglePopup()
    })
  }
// ===================================================================================================
  addProducerToMap(producer) {
    const popup = new mapboxgl.Popup()
      .setHTML(producer.popup_html)

    const marker = new mapboxgl.Marker({ "color": "#4b78e6" })
      .setLngLat([producer["adressesOperateurs"][0]["long"], producer["adressesOperateurs"][0]["lat"]])
      .setPopup(popup)
      .addTo(this.map)

    this.addEventMouseEnter(marker)
    this.markers.push(marker)
    const dataMarker = { producer: producer, marker: marker }
    this.dataMarkers.push(dataMarker)
  }
// ===================================================================================================
  addProducersToMap(data) {
    data.forEach(this.addProducerToMap.bind(this));
  }
// ===================================================================================================
  updateLocationMarker() {
    // remove previous marker if exists
    if (this.location) { this.location.remove() }
    // add new marker to map
    this.addLocationToMap()
  }
// ===================================================================================================
  removeAllMarkers() {
    this.markers.forEach((marker) => { marker.remove() })
  }
// ===================================================================================================
  updateCenter(lat, lng) {
    this.center = {
      lat: lat,
      lng: lng
    }
    this.map.setCenter([this.center.lng, this.center.lat])
    this.map.setZoom(11)
    this.sendCoordinates()
    this.updateLocationMarker()
    this.removeAllMarkers()
    this.searchProducer()
  }
// ===================================================================================================
  updateMapOnGeocoder(){
    this.geocoder.on('result', (e) => {
      this.updateCenter(e.result.geometry["coordinates"][1], e.result.geometry["coordinates"][0])
    })
  }
// ===================================================================================================
  localizeMe() {
    navigator.geolocation.getCurrentPosition((pos) => {
      this.updateCenter(pos.coords.latitude, pos.coords.longitude)
    })
  }
}
