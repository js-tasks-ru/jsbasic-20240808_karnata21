import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.elem = createElement(this.template())
  }
  setTitle(text) {
    const title = this.elem.querySelector('.modal__title')
    title.textContent = text

  }
  setBody(mbody) {
    const modalBody = this.elem.querySelector('.modal__body')
    modalBody.innerHTML = ''
    modalBody.append(mbody)
  }

  template() {
    let template =
      `<div class='modal'>
    <div class="modal__overlay"></div>
     <div class="modal__inner">
       <div class="modal__header">  
         <button type="button" class="modal__close">
           <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
         </button>
         <h3 class="modal__title">
          Вот сюда нужно добавлять заголовок
         </h3>
       </div> 
       <div class="modal__body">
         A сюда нужно добавлять содержимое тела модального окна
       </div>
       </div>
     </div>`

    return template
  }
  open(){
    let body = document.body
    body.classList.add('is-modal-open')
    body.append(this.elem)

    
    const modalClose = this.elem.querySelector('.modal__close')

    const clickEsc = function (event) {
      if (event.code === 'Escape' || (modalClose && event.target.closest('.modal__close'))) {
       // body.classList.remove('is-modal-open')
       // body.querySelector('.modal').remove()
       this.Cclose()
        document.removeEventListener('keydown', clickEsc)
      }
    }
    modalClose.addEventListener('click', clickEsc)
    document.addEventListener('keydown', clickEsc)


  }
  Cclose(){    
   let body  = document.body
        body.classList.remove('is-modal-open')
        body.querySelector('.modal').remove()
    
  }
}
