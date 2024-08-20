function getMinMax(str) {
  let result = {};

  const sortStr = str
    .split(' ')
    .filter(item => Number(item))
    .sort((a, b) => { return a - b });

  result.min = Number(sortStr.shift())
  result.max = Number(sortStr.pop())

  return result;
}
