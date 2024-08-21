function camelize(str) {
  const firstElem = str.split('-').shift(0);

  return firstElem + str
    .split('-')
    .slice(1)
    .map(item => item.toString()[0].toUpperCase() + item.slice(1))
    .join('');
}
