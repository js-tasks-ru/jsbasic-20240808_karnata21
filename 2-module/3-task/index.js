let calculator = {
  read,
  sum(){
    return this.read.a + this.read.b 
  },
  mul,
};

function read(a, b) {
  this.read.a = a
  this.read.b = b  
}

function mul(){
  return this.read.a * this.read.b  
}

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
