import {changeAction, toggleClassByCondition} from './utils.js';
import {DISABLED_FORM_CLASS_NAME, MAX_OFFERS_COUNT} from './const.js';

const ANY_OFFER = 'any';
const LOW_PRICE_VALUE = 10000;
const HIGH_PRICE_VALUE = 50000;

const PriceType = {
  ANY: 'any',
  LOW: 'low',
  MIDDLE: 'middle',
  HIGH: 'high',
};

const formFilterElement = document.querySelector('.map__filters');
const houseTypeElement = formFilterElement.querySelector('#housing-type');
const housePriceElement = formFilterElement.querySelector('#housing-price');
const houseRoomsCountElement = formFilterElement.querySelector('#housing-rooms');
const houseGuestCountElement = formFilterElement.querySelector('#housing-guests');

let loadedOffers = [];

const checkOfferType = ({offer}) => {
  return houseTypeElement.value === offer.type || houseTypeElement.value === ANY_OFFER;
}

const checkOfferRooms = ({offer}) => {
  const selectedRoomCount = +houseRoomsCountElement.value;
  return selectedRoomCount === offer.rooms || houseRoomsCountElement.value === ANY_OFFER;
};

const checkOfferPrice = ({offer}) => {
  const selectedPrice = housePriceElement.value;
  switch (selectedPrice) {
    case PriceType.ANY:
      return true;
    case PriceType.LOW:
      return offer.price < LOW_PRICE_VALUE;
    case PriceType.MIDDLE:
      return offer.price >= LOW_PRICE_VALUE && offer.price < HIGH_PRICE_VALUE;
    case PriceType.HIGH:
      return offer.price >= HIGH_PRICE_VALUE;
    default:
      return false;
  }
};

const checkOfferGuests = ({offer}) => {
  const selectedGuest = +houseGuestCountElement.value;
  return selectedGuest === offer.guests || houseGuestCountElement.value === ANY_OFFER;
};

const checkOfferFeatures = ({offer}) => {
  const selectedFeatures = Array.from(formFilterElement.querySelectorAll('.map__checkbox:checked'));
  return selectedFeatures.every((feature) => offer.features.includes(feature.value));
};

const setFilters = (offer) => {
  const filtres = [
    checkOfferType,
    checkOfferPrice,
    checkOfferRooms,
    checkOfferGuests,
    checkOfferFeatures,
  ];

  return filtres.every((applyFilter) => applyFilter(offer));
};

export const setDisabledFilterForm = (disabled) => {
  toggleClassByCondition(formFilterElement, DISABLED_FORM_CLASS_NAME, disabled);
  changeAction(formFilterElement, 'select', disabled);
  changeAction(formFilterElement, 'fieldset', disabled);
};

export const getFiltredOffers = () => {
  return loadedOffers.filter(setFilters).slice(0, MAX_OFFERS_COUNT);
};

export const initFilterForm = (cb) => {
  setDisabledFilterForm(true);
  formFilterElement.addEventListener('change', () => cb(getFiltredOffers()));
};

export const setOffers = (offers) => {
  loadedOffers = offers;
}

