export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.elem = document.createElement('div')
    this.steps = steps
    this.value = value
    this.createElem()
    this.initClick()
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
  initClick() {
    let clickSlider = this.elem
    let thumb = this.elem.querySelector('.slider__thumb')
    let progress = this.elem.querySelector('.slider__progress')
    let sliderValue = this.elem.querySelector('.slider__value')


    clickSlider.addEventListener('click', (event) => {
      thumb.style.left = `${this.getPersent(event)}%`;
      progress.style.width = `${this.getPersent(event)}%`;
      sliderValue.textContent = this.value

      clickSlider.querySelector('.slider__step-active')
        .classList.remove('slider__step-active')
      clickSlider.querySelector('.slider__steps').children[this.value]
        .classList.add('slider__step-active')

      clickSlider.dispatchEvent(new CustomEvent("slider-change", {
        detail: this.value,
        bubbles: true
      }))

    })

  }
  setDefaultValue() {
    let thumb = this.elem.querySelector('.slider__thumb')
    let progress = this.elem.querySelector('.slider__progress')
    let segments = this.steps - 1;
    let defaultPersent = this.value / segments * 100;

    thumb.style.left = `${defaultPersent}%`;
    progress.style.width = `${defaultPersent}%`;
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
