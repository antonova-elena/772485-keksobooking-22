import {AppartmentType} from './const.js';

const popupTemplateElement = document.querySelector('#card')
  .content
  .querySelector('.popup');

export const createCardElement = (offer) => {
  const newPopupElement = popupTemplateElement.cloneNode(true);
  newPopupElement.querySelector('.popup__avatar').src = offer.author.avatar;
  newPopupElement.querySelector('.popup__title').textContent = offer.offer.title;
  newPopupElement.querySelector('.popup__text--address').textContent = offer.offer.address;
  newPopupElement.querySelector('.popup__text--price').textContent = offer.offer.price;
  newPopupElement.querySelector('.popup__type').textContent = AppartmentType[offer.offer.type.toUpperCase()];
  newPopupElement.querySelector('.popup__text--capacity').textContent = `${offer.offer.rooms} комнаты для ${offer.offer.guests} гостей`;
  newPopupElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.offer.checkin}, выезд до ${offer.offer.checkout}`;

  const featuresList = offer.offer.features.map((feature) => `<li class="popup__feature popup__feature--${feature}"></li>`);
  newPopupElement.querySelector('.popup__features').innerHTML = featuresList.join('');
  newPopupElement.querySelector('.popup__description').textContent = offer.offer.description;

  const photosList = offer.offer.photos.map((photoLink) => `<img src="${photoLink}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`);
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
