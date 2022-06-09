import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["category", "selectButton"]

  connect() {
    this.allSelected = false
  }

  updateAllSelected() {
    this.allSelected = this.categoryTargets.every(x => x.checked)
  }

  update(){
    this.updateAllSelected()
    this.selectButtonTarget.innerHTML = this.allSelected ? 'Tout déselectionner' : 'Tout sélectionner'
    const categories = this.categoryTargets.filter(x => x.checked).map(x => x.value)
    const event = new CustomEvent('filter', {
      detail: categories
    });
    this.element.dispatchEvent(event);
  }

  selectAllCategories() {
    this.allSelected = !this.allSelected
    this.categoryTargets.forEach(category => { category.checked = this.allSelected })
    this.update()
  }
}
