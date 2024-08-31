function initCarousel() {
  const rightButton = document.querySelector('.carousel__arrow_right');
  const leftButton = document.querySelector('.carousel__arrow_left');
  const lenta = document.querySelector('.carousel__inner');
  const lentaOffsetWidth = lenta.offsetWidth;
  const slideQuantity = document.querySelectorAll('.carousel__slide').length;

  let i = 0
  leftButton.style.display = 'none'

  rightButton.addEventListener('click', (event) => {
    leftButton.style.display = ''
    i++
    if (i == slideQuantity - 1) {
      rightButton.style.display = 'none'
    }
    if (i < slideQuantity) {

      styleTransform(i)

    }
  })

  leftButton.addEventListener('click', (event) => {
    rightButton.style.display = ''
    i--
    if (i == 0) {
      leftButton.style.display = 'none'
    }
    if (i >= 0) {
      styleTransform(i)
    }
  })

  function styleTransform(i) {
    let len = i * lentaOffsetWidth
    lenta.style.transform = `translateX(-${len}px)`
  }

}
