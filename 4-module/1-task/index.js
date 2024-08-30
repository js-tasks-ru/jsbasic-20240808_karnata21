function makeFriendsList(friends) {
  const ul = document.createElement('ul')
  let  template= ''

  friends.forEach(friend => template +=(`
  <li> ${friend.firstName} ${friend.lastName } </li>`) )
     
  ul.innerHTML = template
  document.body.insertAdjacentHTML("afterbegin",ul.innerHTML)
  
return ul
}
