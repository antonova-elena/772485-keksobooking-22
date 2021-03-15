import {changeAction, toggleClassByCondition} from './utils.js';
import {DISABLED_FORM_CLASS_NAME} from './const.js'

const SIGN_COUNT = 5;

const formElement = document.querySelector('.ad-form');
const typeHouseElement = formElement.querySelector('#type');
const priceElement = formElement.querySelector('#price');
const checkinElement = formElement.querySelector('#timein');
const checkoutElement = formElement.querySelector('#timeout');
const addressElement = formElement.querySelector('#address');

const houseTypePriceMap = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
}

export const setDisabledNewOfferForm = (disabled) => {
  toggleClassByCondition(formElement, DISABLED_FORM_CLASS_NAME, disabled);
  changeAction(formElement, 'fieldset', disabled);
}

const init = () => {
  priceElement.placeholder = houseTypePriceMap.flat;
  checkoutElement.value = checkinElement.value;
  setDisabledNewOfferForm(true);
}

export const setAddress = ({lat, lng}) => {
  addressElement.value = `${lat.toFixed(SIGN_COUNT)}, ${lng.toFixed(SIGN_COUNT)}`;
}

typeHouseElement.addEventListener('change', (evt) => {
  priceElement.placeholder = houseTypePriceMap[evt.target.value];
});

checkinElement.addEventListener('change', (evt) => {
  checkoutElement.value = evt.target.value;
})

checkoutElement.addEventListener('change', (evt) => {
  checkinElement.value = evt.target.value;
})

init();

