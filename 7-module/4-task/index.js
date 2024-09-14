export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.elem = document.createElement('div')
    this.steps = steps
    this.value = value
    this.createElem()
    this.initEvent()
    //this.initClick()
  }
  createElem() {

    let template =
      `<div class="slider__thumb">
      <span class="slider__value">${this.value}</span>
    </div>
    <div class="slider__progress"></div>
    <div class="slider__steps">
        ${this.createSpan()}
    </div>`
    this.elem.classList.add("slider")
    this.elem.innerHTML = template
    this.setDefaultValue()
  }
  createSpan() {
    let span = [`<span class="slider__step-active"></span>`]
    for (let i = 1; i <= this.steps - 1; i++) {
      span.push(`<span></span>`)
    }
    return span.join('')
  }

  setDefaultValue() {
    let thumb = this.elem.querySelector('.slider__thumb')
    let progress = this.elem.querySelector('.slider__progress')
    let segments = this.steps - 1;
    let defaultPersent = this.value / segments * 100;

    thumb.style.left = `${defaultPersent}%`;
    progress.style.width = `${defaultPersent}%`;
  }

  initEvent() {
    let slider = this.elem
    let thumb = this.elem.querySelector('.slider__thumb')
    let progress = this.elem.querySelector('.slider__progress')
    let sliderValue = slider.querySelector('.slider__value')

    let segments = this.steps - 1;
    let leftPercents = 1;
    
    slider.addEventListener('click', (event) => {
      event.preventDefault();
      thumb.style.left = `${this.getPersent(event)}%`;
      progress.style.width = `${this.getPersent(event)}%`;
      sliderValue.textContent = this.value

      slider.dispatchEvent(new CustomEvent("slider-change", {
        detail: this.value,
        bubbles: true
      }))

    })

    thumb.ondragstart = () => false;

    thumb.onmousedown = (event) =>{
      event.preventDefault();
      slider.classList.add('slider_dragging');

     document.addEventListener('pointermove', onPointerMove)
     document.addEventListener('pointerup', onPointerUP);

   
      function onPointerMove (event) {
        event.preventDefault();
      
        let left = event.clientX - slider.getBoundingClientRect().left;
        let leftRelative = left / slider.offsetWidth;
       console.log( leftRelative)

        if (leftRelative < 0) {
          leftRelative = 0;
        }
        if (leftRelative > 1) {
          leftRelative = 1;
        }
         leftPercents = leftRelative * 100;
        let approximateValue = leftRelative * segments;
        this.value = Math.round(approximateValue);

        sliderValue.textContent = this.value
        thumb.style.left = `${leftPercents}%`;
        progress.style.width = `${leftPercents}%`;

      }
     function onPointerUP() {
     // const onPointerUP = ()=>{  
        document.removeEventListener('pointerup', onPointerUP);
        document.removeEventListener('pointermove', onPointerMove);
        slider.classList.remove('slider_dragging')
        let valuePercents = this.value / segments * 100;

        thumb.style.left =`${valuePercents}%`;
        progress.style.width = `${valuePercents}%`;

        slider.dispatchEvent(new CustomEvent("slider-change", {
          detail: this.value,
          bubbles: true
        }))
      }
    };
  }

  setDefaultPersent() {
    let segments = this.steps - 1;
    let defaultPersent = this.value / segments * 100;
    return defaultPersent
  }
  getPersent(event) {
    let left = event.clientX - this.elem.getBoundingClientRect().left
    let leftRelative = left / this.elem.offsetWidth
    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;
    this.value = Math.round(approximateValue);
    let valuePercents = this.value / segments * 100;
    return valuePercents
  }
}
