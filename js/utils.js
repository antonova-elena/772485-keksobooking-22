import {Key} from './const.js';

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

export const changeAction = (element,  selector, disabled) => {
  Array
    .from(element.querySelectorAll(selector))
    .forEach((item) => {
      item.disabled = disabled
    });
}

export const toggleClassByCondition = (element, cssClass, condition) => {
  if (condition) {
    element.classList.add(cssClass);
  } else {
    element.classList.remove(cssClass);
  }
}

export const isEscapeKey = (key) => {
  return key === Key.ESC || Key.ESCAPE;
}

export const debounce = (cb, time) => {
  let interval;
  return (...args) => {
    clearTimeout(interval);
    interval = setTimeout(() => {
      interval = null;
      cb(...args);
    }, time);
  }
}
