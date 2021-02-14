const getRandomNumber = function(min, max) {
  return Math.random() * (max - min + 1) + min;
}

export const getRandomInteger = function(min, max) {
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

export const getRandomFloat = function(min, max, signCount) {
  if (min < 0 || max < 0 || signCount < 0) {
    throw 'Функция может принимать только положительные значения';
  }

  if (max <= min) {
    throw 'Значение параметра max не может быть меньше или равно значению параметра min';
  }

  const randomNumber = getRandomNumber(min, max);

  return Number(randomNumber.toFixed(signCount));
}

export const shuffle = function (array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = getRandomInteger(0, i);
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

export const getRandomArrayElement = function (array) {
  return array[getRandomInteger(0, array.length - 1)];
}

export const getRandomArrayElements = function (array) {
  return array.slice(0, getRandomInteger(1, array.length - 1));
}

