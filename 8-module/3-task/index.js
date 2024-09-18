export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

