const formElement = document.querySelector('.ad-form');
const typeHouseElement = formElement.querySelector('#type');
const priceElement = formElement.querySelector('#price');
const checkinElement = formElement.querySelector('#timein');
const checkoutElement = formElement.querySelector('#timeout');

const houseTypePriceMap = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
}

const init = () => {
  priceElement.placeholder = houseTypePriceMap.flat;
  checkoutElement.value = checkinElement.value;
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

