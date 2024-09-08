import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  slides
  elem
  constructor(slides) {
    this.slides = slides;
    this.elem = document.createElement('div')
    this.createSlides()
    this.addProduct()
    this.initCarousel()
  }
  createSlides(){
    
    let template =
    `<div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>

      <div class="carousel__inner">

        ${this.slides.map(item =>
        `<div class="carousel__slide" data-id="${item.id}">
        <img src="/assets/images/carousel/${item.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${item.price.toFixed(2)}</span>
          <div class="carousel__title">${item.name}</div>

          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
        `).join('')}                
    </div>`

     this.elem.classList.add("carousel")
     this.elem.innerHTML = template
  }
  addProduct(){
    let buttonsPlus = this.elem.querySelectorAll('.carousel__button')
       buttonsPlus.forEach(buttonPlus => 
      buttonPlus.addEventListener('click', (event) =>{

      let slideId = buttonPlus.closest("[data-id]").dataset.id
      buttonPlus.dispatchEvent(new CustomEvent("product-add", {
        detail: slideId,
        bubbles: true 
      }))
    }) 
    )               
  }
  initCarousel() {
    const rightButton = this.elem.querySelector('.carousel__arrow_right');
    const leftButton = this.elem.querySelector('.carousel__arrow_left');
    const lenta = this.elem.querySelector('.carousel__inner');
    const lentaOffsetWidth = 500 // this.elem.querySelectorAll('.carousel__slide').offsetWidth;
    const slideQuantity = this.elem.querySelectorAll('.carousel__slide').length;
  
    let i = 0
    leftButton.style.display = 'none'
  
    rightButton.addEventListener('click', (event) => {
      leftButton.style.display = ''
      i++
      if (i == slideQuantity - 1) {
        rightButton.style.display = 'none'
      }
      if (i < slideQuantity) {
  
        let len = i * lentaOffsetWidth
        lenta.style.transform = `translateX(-${len}px)`
  
      }
    })
  
    leftButton.addEventListener('click', (event) => {
      rightButton.style.display = ''
      i--
      if (i == 0) {
        leftButton.style.display = 'none'
      }
      if (i >= 0) {
        let len = i * lentaOffsetWidth
        lenta.style.transform = `translateX(-${len}px)`
      }
    })

  
  }
}
