import {changeAction, toggleClassByCondition} from './utils.js';
import {DISABLED_FORM_CLASS_NAME} from './const.js';

const formFilterElement = document.querySelector('.map__filters');

export const setDisabledFilterForm = (disabled) => {
  toggleClassByCondition(formFilterElement, DISABLED_FORM_CLASS_NAME, disabled);
  changeAction(formFilterElement, 'select', disabled);
  changeAction(formFilterElement, 'fieldset', disabled);
}

const init = () => {
  setDisabledFilterForm(true);
}

init();
