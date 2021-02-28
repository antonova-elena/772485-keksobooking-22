import {createOffers} from './data.js';
import {createCardElement} from './popup.js';
import {OFFER_COUNT} from './const.js';
import './form.js';

const mapElement = document.querySelector('.map__canvas');

const offers = createOffers(OFFER_COUNT);
const [firstCard] = offers;
mapElement.appendChild(createCardElement(firstCard));
