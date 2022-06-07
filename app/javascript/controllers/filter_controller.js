import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["category"]

  update(){
    const categories = this.categoryTargets.filter(x => x.checked).map(x => x.value)
    const event = new CustomEvent('filter', {
      detail: categories
    });
    this.element.dispatchEvent(event);
  }
}
