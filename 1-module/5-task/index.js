function truncate(str, maxlength) {
  let result = str

  if (str.length > maxlength) {

     result = str.substring( 0, maxlength - 1) + "…"
  }
  
return result 
  
}
