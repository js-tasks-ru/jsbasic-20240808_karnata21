/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  elem
  rows

  constructor(rows) {

    this.rows = rows 
    this.elem = document.createElement('table')
    this.createTable()
    this.deletedRow()

  }

  createTable() {
    const template =
  ` <thead>
        <tr>
            <th>Имя</th>
            <th>Возраст</th>
            <th>Зарплата</th>
            <th>Город</th>
            <th></th>
        </tr>
    </thead>
    <tbody>     
        ${this.rows.map(value =>
        `<tr>
      ${tdConstructor(value)}
        <td><button>X</button></td>
        </tr>
        `).join('')}                     
    </tbody>
   `
    this.elem.innerHTML = template
    
  }

  deletedRow() {
    for (let button of this.elem.querySelectorAll('button')) 
      button.addEventListener('click', (event) =>
        event.target.closest('tr').remove())                
  }
}
 
function tdConstructor(value) {
  let td = []
  for (let key in value) {
    td.push(`<td>${value[key]}</td>`)
  }
  return td.join('')
}