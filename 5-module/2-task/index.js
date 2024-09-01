function toggleText() {
  const button = document.querySelector('.toggle-text-button');
  const text = document.querySelector('#text');

  button.addEventListener('click', (event) => {
    if (!!text.getAttribute('hidden')) {
      text.removeAttribute('hidden')
    } else text.setAttribute('hidden', true)

  })
}
