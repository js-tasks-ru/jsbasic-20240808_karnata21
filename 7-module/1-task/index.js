import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories
    this.elem = this.render()
    this.initMenu()
    this.getCategory()
  }
  template(){
    let template =
  `<div class="ribbon">
   <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>

    <nav class="ribbon__inner">
      <a href="#" class="ribbon__item ribbon__item_active" data-id="">All</a>
      ${this.categories.slice(1).map(item =>
      `<a href="#" class="ribbon__item" data-id="${item.id}">${item.name}</a>`).join('')}
    </nav>

    <button class="ribbon__arrow ribbon__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
    </div>`
    return template   
  }
  render(){
    this.elem = createElement(this.template());

    return this.elem
  }
  initMenu(){
    const ribbonRight = this.elem.querySelector('.ribbon__arrow_right');
    const ribbonLeft = this.elem.querySelector('.ribbon__arrow_left');
    const ribbonInner = this.elem.querySelector('.ribbon__inner');
  
    
    ribbonRight.classList.add("ribbon__arrow_visible")
    ribbonLeft.classList.remove("ribbon__arrow_visible")
  
    ribbonRight.addEventListener('click', (event) => {
   
      let scrollRight = this.getScrollLenght(ribbonInner)
  
    ribbonInner.scrollBy(350, 0)

    if (scrollRight < 1){
      ribbonRight.classList.remove("ribbon__arrow_visible")
     }else {
      ribbonRight.classList.add("ribbon__arrow_visible")
      ribbonLeft.classList.add("ribbon__arrow_visible")
     }     
    })

    ribbonLeft.addEventListener('click', (event) => {
   
      let scrollLeft = ribbonInner.scrollLeft
  
     ribbonInner.scrollBy(-350, 0)

    if (scrollLeft < 1){
      ribbonLeft.classList.remove("ribbon__arrow_visible")
     }else {
      ribbonRight.classList.add("ribbon__arrow_visible")
      ribbonLeft.classList.add("ribbon__arrow_visible")
     }    
    })
  }
  
  getScrollLenght(ribbonInner){
      let scrollLeft = ribbonInner.scrollLeft
      let scrollWidth = ribbonInner.scrollWidth
      let clientWidth = ribbonInner.clientWidth
      let scrollRight = scrollWidth - scrollLeft - clientWidth

      return scrollRight
  }

  getCategory(){
    let addCategories = this.elem.querySelectorAll('.ribbon__item')
    addCategories.forEach(categ => 
      categ.addEventListener('click', (event) =>{
        event.preventDefault()

        categ.classList.add('ribbon__item_active')

        let categId = categ.closest("[data-id]").dataset.id
        categ.dispatchEvent(new CustomEvent("ribbon-select", {
            detail: categId,
            bubbles: true 
   }))
   
 }) 
 ) 
  }
  
}
