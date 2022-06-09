import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['navlink', 'navlist']

  connect(){
    this.producers = []
    this.coordinates = []
  }

  coordinatesChanged(e) {
    this.coordinates[0] = `${e.detail.lat},${e.detail.lng}`
    this.refreshHtml()
  }

  add(e){
    const producer = JSON.parse(e.currentTarget.dataset.producer)
    this.producers.push(producer)
    this.refreshHtml()
  }

  refreshHtml() {
    this.navlistTarget.innerHTML = ""
    const producersCoordinates = []
    this.producers.forEach(producer => {
      producersCoordinates.push(`${producer.adressesOperateurs[0].lat},${producer.adressesOperateurs[0].long}`)
      // console.log(`${producer.adressesOperateurs[0].lat},${producer.adressesOperateurs[0].long}`)
      // add adjacent HTML
      this.navlistTarget.insertAdjacentHTML("beforeend",
      `<li>${producer.denominationcourante}</li>`
      )
    })
      if (producersCoordinates.length == 0) {
        return
      }
    this.addHref(producersCoordinates)
  }
  addHref(producersCoordinates) {
    if (producersCoordinates.length == 1){
      const href = `https://www.google.com/maps/dir/?api=1&destination=${producersCoordinates[0]}&travelmode=driving`
      this.navlinkTarget.href = href
    } else {
      const waypoints = producersCoordinates.slice(0, -1)
      const href = `https://www.google.com/maps/dir/?api=1&waypoints=${waypoints.join('|')}&destination=${producersCoordinates[producersCoordinates.length - 1]}&travelmode=driving`
      this.navlinkTarget.href = href
    }
  }
}
