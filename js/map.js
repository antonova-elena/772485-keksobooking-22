/* global L:readonly */
import {setAddress, setDisabledNewOfferForm} from './form.js';
import {setDisabledFilterForm} from './filter-form.js';
import {DEFAULT_COORDINATE} from './const.js';
import {createCardElement} from './popup.js';

const DEFAULT_ZOOM = 9;
const MAP_CONTAINER_ID = 'map-canvas';
const MAIN_PIN_ICON_PATH = '/img/main-pin.svg';
const PIN_ICON_PATH = '/img/pin.svg';

export const initMap = () => {
  const map = L.map(MAP_CONTAINER_ID)
    .on('load', () => {
      setDisabledNewOfferForm(false);
      setDisabledFilterForm(false);
      setAddress(DEFAULT_COORDINATE);
    })
    .setView(DEFAULT_COORDINATE, DEFAULT_ZOOM);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
    },
  )
    .addTo(map);

  return map;
}

export const addMainPin = (map) => {
  const mainPinIcon = L.icon({
    iconUrl: MAIN_PIN_ICON_PATH,
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  const mainPinMarker = L.marker(
    DEFAULT_COORDINATE, {
      draggable: true,
      icon: mainPinIcon,
    },
  );

  mainPinMarker.addTo(map);

  mainPinMarker.on('moveend', ({target}) => {
    setAddress(target.getLatLng());
  });

  return mainPinMarker;
}

export const renderOfferPoints = (map, points) => {
  points.forEach((point) => {
    const pinIcon = L.icon({
      iconUrl: PIN_ICON_PATH,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    L.marker({
      lat: point.location.lat,
      lng: point.location.lng,
    },
    {
      pinIcon,
    })
      .addTo(map)
      .bindPopup(
        createCardElement(point),
        {
          keepInView: true,
        },
      );
  });
}
