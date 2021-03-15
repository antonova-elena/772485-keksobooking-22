import './form.js';
import './filter-form.js';
import {createOffers} from './data.js';
import {OFFER_COUNT} from './const.js';
import {initMap, addMainPin, renderOfferPoints} from './map.js';

const offers = createOffers(OFFER_COUNT);

const map = initMap();
addMainPin(map);
renderOfferPoints(map, offers);
