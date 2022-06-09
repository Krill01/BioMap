import { Controller } from "@hotwired/stimulus"
// Don't forget to import the NPM package
import Typed from "typed.js"

export default class extends Controller {
  connect() {
    new Typed(this.element, {
      strings: ['chargement...'],
      typeSpeed: 100,
      smartBackspace: true,
      loop: true,
      showCursor: false
    });
  }
}
