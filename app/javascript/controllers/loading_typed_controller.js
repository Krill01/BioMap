import { Controller } from "@hotwired/stimulus"
// Don't forget to import the NPM package
import Typed from "typed.js"

export default class extends Controller {
  connect() {
    new Typed(this.element, {
      strings: ['<i class="fas fa-tractor"> <i class="fas fa-carrot"></i> <i class="fas fa-seedling"></i> <i class="fas fa-fish"></i> <i class="fas fa-coffee"></i> <i class="fas fa-cookie-bite"></i> <i class="fas fa-apple-alt"></i>'],
      typeSpeed: 50,
      smartBackspace: true,
      loop: true,
      showCursor: false
    });
  }
}
