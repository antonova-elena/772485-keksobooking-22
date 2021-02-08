/* eslint-disable no-unused-vars */
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

const OFFER_COUNT = 10;

const FLAT_TYPES = ['palace', 'flat', 'house', 'bungalow'];

const CHECKIN_TIME = ['12:00', '13:00', '14:00'];

const CHECKOUT_TIME = ['12:00', '13:00', '14:00'];

const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const TITLES = [
  'Сдаётся уютное место',
  'Сдам срочно',
  'Сдам без посредников',
  'Сдам для семейной пары',
];

const DESCRIPTIONS = [
  'Райский уголок для влюблённых',
  'Семейное гнездо',
  'Место для счастья',
  'Уютное местечко',
];

const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const priceRange = {
  min: 100,
  max: 10000,
};

const avatarPicturePath = {
  min: 1,
  max: 8,
};

const roomQuantityRange = {
  min: 1,
  max: 5,
};

const guestQuantityRange = {
  min: 1,
  max: 6,
}

const locationRangeX = {
  min: 35.65000,
  max: 35.70000,
};

const locationRangeY = {
  min: 139.70000,
  max: 139.80000,
};

const getRandomAvatar = function () {
  const pictureIndex = getRandomInteger(avatarPicturePath.min, avatarPicturePath.max);
  return `img/avatars/user0${pictureIndex}.png`;
}

const getRandomArrayElement = function (array) {
  return array[getRandomInteger(0, array.length - 1)];
}

const getRandomArrayElements = function (array) {
  return array.slice(0, getRandomInteger(1, array.length - 1));
}

const shuffle = function (array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = getRandomInteger(0, i);
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

const createOffers = function(count) {
  const offers = [];

  for (let i = 0; i < count; i++) {
    const locationX = getRandomFloat(locationRangeX.min, locationRangeX.max, 5);
    const locationY = getRandomFloat(locationRangeY.min, locationRangeY.max, 5);

    const newOffer = {
      author: {
        avatar: getRandomAvatar(),
      },
      offer: {
        address: `${locationX}, ${locationY}`,
        title: getRandomArrayElement(TITLES),
        price: getRandomInteger(priceRange.min, priceRange.max),
        type: getRandomArrayElement(FLAT_TYPES),
        rooms: getRandomInteger(roomQuantityRange.min, roomQuantityRange.max),
        guests: getRandomInteger(guestQuantityRange.min, guestQuantityRange.max),
        checkin: getRandomArrayElement(CHECKIN_TIME),
        checkout: getRandomArrayElement(CHECKOUT_TIME),
        features: getRandomArrayElements(shuffle(FEATURES)),
        description: getRandomArrayElement(DESCRIPTIONS),
        photos: getRandomArrayElements(shuffle(PHOTOS)),
      },
      location: {
        x: locationX,
        y: locationY,
      },
    };

    offers.push(newOffer);
  }

  return offers;
}

const offers = createOffers(OFFER_COUNT);
