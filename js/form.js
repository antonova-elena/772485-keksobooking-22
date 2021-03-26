import {changeAction, toggleClassByCondition} from './utils.js';
import {DISABLED_FORM_CLASS_NAME} from './const.js'
import {sendNewOffer} from './service.js';
import {showSuccessMessage, showError} from './message.js';
import {resetPositionMainPin} from './map.js';

const SIGN_COUNT = 5;

const formElement = document.querySelector('.ad-form');
const typeHouseElement = formElement.querySelector('#type');
const priceElement = formElement.querySelector('#price');
const checkinElement = formElement.querySelector('#timein');
const checkoutElement = formElement.querySelector('#timeout');
const addressElement = formElement.querySelector('#address');
const roomNumberElement = formElement.querySelector('#room_number');
const capacityElement = formElement.querySelector('#capacity');

const houseTypePriceMap = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
}

const Room = {
  one: 1,
  two: 2,
  three: 3,
  oneHundred: 100,
}

const Guest = {
  one: 1,
  two: 2,
  three: 3,
  notForGuest: 0,
}

const AllowedRoomGuest = {
  [Room.one]: [Guest.one],
  [Room.two]: [Guest.one, Guest.two],
  [Room.three]: [Guest.one, Guest.two, Guest.three],
  [Room.oneHundred]: [Guest.notForGuest],
}

const checkGuestInTheRoom = (room, guest) => {
  return AllowedRoomGuest[room].includes(guest);
}

export const setDisabledNewOfferForm = (disabled) => {
  toggleClassByCondition(formElement, DISABLED_FORM_CLASS_NAME, disabled);
  changeAction(formElement, 'fieldset', disabled);
}

export const setAddress = ({lat, lng}) => {
  addressElement.value = `${lat.toFixed(SIGN_COUNT)}, ${lng.toFixed(SIGN_COUNT)}`;
}

export const getAddress = () => {
  return addressElement.value;
}

typeHouseElement.addEventListener('change', (evt) => {
  priceElement.placeholder = houseTypePriceMap[evt.target.value];
  priceElement.min = houseTypePriceMap[evt.target.value];
});

checkinElement.addEventListener('change', (evt) => {
  checkoutElement.value = evt.target.value;
})

checkoutElement.addEventListener('change', (evt) => {
  checkinElement.value = evt.target.value;
})

capacityElement.addEventListener('change', () => {
  capacityElement.setCustomValidity('');
});

roomNumberElement.addEventListener('change', () => {
  capacityElement.setCustomValidity('');
});

formElement.addEventListener('submit', async (evt) => {
  evt.preventDefault();

  const offerFormElement = evt.target;
  const guestCount = +capacityElement.value;
  const roomCount = roomNumberElement.value;

  if (!checkGuestInTheRoom(roomCount, guestCount)) {
    capacityElement.setCustomValidity(`${roomCount} комната(ы) рассчитана на ${AllowedRoomGuest[roomCount].join(' или ')} гостей.`);
    capacityElement.reportValidity();
    return;
  }

  try {
    await sendNewOffer(offerFormElement);
  } catch (error) {
    return showError(error.message);
  }

  formElement.reset();
  showSuccessMessage();
  init();
  setDisabledNewOfferForm(false);
});

formElement.addEventListener('reset', () => {
  setTimeout(resetPositionMainPin, 0);
});

const init = () => {
  priceElement.placeholder = houseTypePriceMap.flat;
  priceElement.min = houseTypePriceMap.flat;
  checkoutElement.value = checkinElement.value;
  setDisabledNewOfferForm(true);
}

init();

