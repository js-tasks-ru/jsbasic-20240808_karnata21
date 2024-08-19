function sumSalary(salaries) {
  let sum = 0
  for (let key in salaries) {
    const value = salaries[key]
     if (Number(value) && (value >= 0) && (value < Infinity)) {
       sum += value
    }
  }
  return sum
}