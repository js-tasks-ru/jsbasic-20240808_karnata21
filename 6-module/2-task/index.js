export default class ProductCard {
  product
  elem

  constructor(product) {
    this.product = product
    this.elem = document.createElement('div')
    this.createCard()
    this.addProduct()

  }
  createCard(){
    let template =
    `<div class="card__top">
      <img src="/assets/images/products/${this.product.image}" class="card__image" alt="product">
      <span class="card__price">€${this.product.price.toFixed(2)}</span>
      </div>   
    <div class="card__body">
    <div class="card__title">${this.product.name}</div>
    
    <button type="button" class="card__button">
        <img src="/assets/images/icons/plus-icon.svg" alt="icon">
    </button>
    </div> `
    this.elem.innerHTML = template
  }

  addProduct(){
    let productAdd = new CustomEvent("product-add", {
      detail: this.product.id,
      bubbles: true 
    })
    let button = this.elem.querySelector('.card__button')
      button.addEventListener('click', (event) =>
      button.dispatchEvent(productAdd))                
}
}