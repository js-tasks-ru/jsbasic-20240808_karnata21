function checkSpam(str) {
 let strUpperCase = str.toUpperCase()
 let result = false

  if ( strUpperCase.includes('1XBET') || strUpperCase.includes('XXX')) {
    result = true
  }

  return result
}
