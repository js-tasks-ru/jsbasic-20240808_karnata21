function highlight(table) {
  
  const allTr = Array.from(table.querySelectorAll('tr'));
  const statusTd = []
  const genderTd = []
  const ageTd = []

  allTr.forEach(tr => statusTd.push(tr.lastElementChild))
  allTr.forEach(tr => genderTd.push(tr.children[2]))
  allTr.forEach(tr => ageTd.push(tr.children[1]))

  statusTd.forEach((td) => {
    if (td.hasAttribute('data-available')) {
      if (td.getAttribute('data-available') == 'true') {
        td.parentElement.classList.add('available')
      } else {
        td.parentElement.classList.add('unavailable')
      }
    } else td.parentElement.setAttribute('hidden', true)
  })

  genderTd.forEach((td) => {
    if (td.textContent == 'm') {
      td.parentElement.classList.add('male')
    } else if (td.textContent == 'f') {
      td.parentElement.classList.add('female')
    }
  })

  ageTd.forEach((td) => {
    if (Number(td.textContent) < 18) {
      td.parentElement.style = "text-decoration: line-through"
    }
  })
  
}
