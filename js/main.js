const getRandomNumber = function(min, max) {
  return Math.random() * (max - min + 1) + min;
}

const getRandomInteger = function(min, max) {
  if (min < 0 || max < 0) {
    throw 'Функция может принимать только положительные значения';
  }

  if (max <= min) {
    throw 'Значение параметра max не может быть меньше или равно значению параметра min';
  }

  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(getRandomNumber(min, max));
}

const getRandomFloat = function(min, max, signCount) {
  if (min < 0 || max < 0 || signCount < 0) {
    throw 'Функция может принимать только положительные значения';
  }

  if (max <= min) {
    throw 'Значение параметра max не может быть меньше или равно значению параметра min';
  }

  const randomNumber = getRandomNumber(min, max);

  return Number(randomNumber.toFixed(signCount));
}

getRandomInteger(5, 10);
getRandomFloat(1.3, 5.5, 2);
