import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['navlink', 'navlist']

  connect(){
    this.producers = []
    this.coordinates = []
  }

  coordinatesChanged(e) {
    this.coordinates[0] = `${e.detail.lat},${e.detail.lng}`
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
    this.navlinkTarget.className = "btn-nav"
    const href = `https://www.google.com/maps/dir/?api=1&waypoints=${producersCoordinates.join("|")}&destination=${this.coordinates}&travelmode=driving`
    this.navlinkTarget.href = href
    console.log(href)
  }

}
