import './form.js';
import './filter-form.js';
import {initMap, addMainPin, renderOfferPoints} from './map.js';
import {getOffers} from './service.js';
import {showError} from './message.js';

const init = async () => {
  const map = initMap();
  addMainPin(map);

  let offers = [];

  try {
    offers = await getOffers();
  } catch ({message}) {
    showError(message);
  }

  renderOfferPoints(map, offers);
}

init();
