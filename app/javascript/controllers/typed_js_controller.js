import { Controller } from "@hotwired/stimulus"
// Don't forget to import the NPM package
import Typed from "typed.js"

export default class extends Controller {
  connect() {
    new Typed(this.element, {
      strings: ['<strong>bio.</strong>', '<strong>locaux.</strong>', '<strong>près de chez toi.</strong>', "<strong>ou a l'autre bout de la France.</strong>"],
      typeSpeed: 100,
      loop: true
    });
  }
}
