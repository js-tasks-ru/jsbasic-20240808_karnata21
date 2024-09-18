import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.elem = createElement(this.template)
    this.createCards()

  }
  template() {
    let template =
      `<div class="products-grid">
    <div class="products-grid__inner">
    </div>
  </div>`
    return template
  }
  createCards() {
    let gritInner = this.elem.querySelector('.products-grid__inner')
    gritInner.innerHTML = ''
    for (let prod of this.products) {

      if (this.filters.noNuts && prod.nuts)
        continue
      if (this.filters.vegeterianOnly && !prod.vegeterian)
        continue
      if ( !!this.filters.maxSpiciness && prod.spiciness > this.filters.maxSpiciness)
        continue
      if (this.filters.category && prod.category != this.filters.category)
        continue

      let card = new ProductCard(prod)
      gritInner.append(card.elem)

    } 
  }
  updateFilter(filter) {
    Object.assign(this.filters,filter)
    this.createCards()
  }


}
