import './form.js';
import {setOffers, initFilterForm} from './filter-form.js';
import {initMap, renderOfferPoints} from './map.js';
import {getOffers} from './service.js';
import {showError} from './message.js';
import {MAX_OFFERS_COUNT} from './const.js';

const init = async () => {
  initFilterForm((filtredOffers) => renderOfferPoints(map, filtredOffers));

  const map = initMap();

  let offers = [];

  try {
    offers = await getOffers();
  } catch ({message}) {
    showError(message);
  }

  setOffers(offers);
  renderOfferPoints(map, offers.slice(0, MAX_OFFERS_COUNT));
}

init();
