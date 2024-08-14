function ucFirst(str) {
  let result = str;

  if (str) {
    result = str[0].toUpperCase() + str.slice(1);
  }

  return result
  
}
