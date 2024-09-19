import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (!product) {
      return
    }
    let item = this.cartItems.find(elem => elem.product.id === product.id)
    if (item) {
      item.count++
    } else {
      item = {
        product: product,
        count: 1
      }

      this.cartItems.push(item)
    }
    this.onProductUpdate(item)
  }

  updateProductCount(productId, amount) {
    let item = this.cartItems.find(elem => elem.product.id == productId)
    if (item) {
      item.count += amount
      if (item.count == 0) {
        this.cartItems.splice(this.cartItems.indexOf(item), 1)
      }
    }
    this.onProductUpdate(item)
  }

  isEmpty() {
    let result = this.cartItems.length
    return result == 0
  }

  getTotalCount() {
    let result = this.cartItems.reduce((accElem, currElem) => accElem + currElem.count, 0)
    return result
  }

  getTotalPrice() {
    let result = this.cartItems.reduce((accElem, currElem) => accElem + currElem.product.price * currElem.count, 0)
    return result
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id
      }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
      2
    )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal()
    this.modal.setTitle("Your order")
    this.cart = document.createElement("div")

    for (let item of this.cartItems) {
      this.cart.append(this.renderProduct(item.product, item.count))
    }
    this.cart.append(this.renderOrderForm())


    const onClickPlusMinus = (event) => {
      if (event.target.closest(".cart-counter__button")) {
        let id = event.target.closest("[data-product-id]").dataset.productId;

        if (event.target.closest(".cart-counter__button_plus")) {
          this.updateProductCount(id, 1)

        } else this.updateProductCount(id, -1)
      }
    }
    this.cart.addEventListener("click", onClickPlusMinus)

    this.cart.querySelector('.cart-form').addEventListener('submit', (event) => {
      this.onSubmit(event);
    });

    this.modal.setBody(this.cart)

    this.modal.open()

  }
  onProductUpdate(cartItem) {
    if (this.modal) {
      if (this.cartItems.length != 0) {
        if (cartItem.count == 0) {
          this.cart.querySelector(`[data-product-id="${cartItem.product.id}"]`).remove()
        } else {
          this.cart.querySelector(`[data-product-id="${cartItem.product.id}"] .cart-counter__count`).innerHTML = cartItem.count
          this.cart.querySelector(`[data-product-id="${cartItem.product.id}"] .cart-product__price`).innerHTML = "€" + (cartItem.count * cartItem.product.price).toFixed(2)
          this.cart.querySelector(".cart-buttons__info-price").innerHTML = "€" + this.getTotalPrice().toFixed(2)
        }
      } else this.modal.close()

    }
    this.cartIcon.update(this);
  }
  onSubmit(event) {
    event.preventDefault();

    const submitButton = event.target.querySelector('button[type="submit"]');
    submitButton.classList.add('is-loading');

    const formData = new FormData(event.target);

    const response = fetch('https://httpbin.org/post', {
      method: 'POST',
      body: formData
    });
    response
      .then((resp) => {

        this.cartItems = [];
        this.cartIcon.update(this)
        const modal = event.target.closest('.modal');
        modal.querySelector('.modal__title').textContent = 'Success!';
        modal.querySelector('.modal__body').innerHTML = `
            <div class="modal__body-inner">
              <p>
                Order successful! Your order is being cooked :) <br>
                We’ll notify you about delivery time shortly.<br>
                <img src="/assets/images/delivery.gif">
              </p>
            </div>
          `;
        submitButton.classList.remove('is-loading')
      })

  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

