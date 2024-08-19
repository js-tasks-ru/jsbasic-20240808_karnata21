function isEmpty(obj) {
  let result = true
  for (let key in obj) {
    result = !(key in obj)
  }
  return result
}
