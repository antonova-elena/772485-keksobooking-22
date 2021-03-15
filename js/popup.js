import {AppartmentType} from './const.js';

const popupTemplateElement = document.querySelector('#card')
  .content
  .querySelector('.popup');

export const createCardElement = (offer) => {
  const {
    author: {avatar},
    offer: {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos},
  } = offer;

  const newPopupElement = popupTemplateElement.cloneNode(true);
  newPopupElement.querySelector('.popup__avatar').src = avatar;
  newPopupElement.querySelector('.popup__title').textContent = title;
  newPopupElement.querySelector('.popup__text--address').textContent = address;

  const priceElement = newPopupElement.querySelector('.popup__text--price');
  priceElement.textContent = `${price}`;
  priceElement.insertAdjacentHTML('beforeEnd', '&nbsp;<span>₽/ночь</span>');

  newPopupElement.querySelector('.popup__type').textContent = AppartmentType[type.toUpperCase()];
  newPopupElement.querySelector('.popup__text--capacity').textContent = `${rooms} комнаты для ${guests} гостей`;
  newPopupElement.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;

  const featuresList = features.map((feature) => `<li class="popup__feature popup__feature--${feature}"></li>`);
  newPopupElement.querySelector('.popup__features').innerHTML = featuresList.join('');
  newPopupElement.querySelector('.popup__description').textContent = description;

  const photosList = photos.map((photoLink) => `<img src="${photoLink}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`);
  newPopupElement.querySelector('.popup__photos').innerHTML = photosList.join('');

  return newPopupElement;
}

export const createCardsFragemnt = (offers) => {
  const fragment = document.createDocumentFragment();
  offers.forEach((offer) => {
    const newCardElement = createCardElement(offer);
    fragment.append(newCardElement);
  });

  return fragment;
}
