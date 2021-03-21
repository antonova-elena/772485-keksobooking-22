import {isEscapeKey} from './utils.js';

const mainElement = document.querySelector('main');

const errorTemplate = document.querySelector('#error')
  .content.querySelector('.error');

const successTemplate = document.querySelector('#success')
  .content.querySelector('.success');

export const showError = (text) => {
  const errorElement = errorTemplate.cloneNode(true);
  errorElement.style = 'z-index: 1000';
  errorElement.querySelector('.error__message').textContent = text;

  const buttonElement = errorElement.querySelector('button');
  buttonElement.textContent = 'Ok';

  const removeErrorElement = () => mainElement.removeChild(errorElement);
  const onEscapeKeydown = ({key}) => {
    if (!isEscapeKey(key)) {
      return;
    }

    document.removeEventListener('keydown', onEscapeKeydown);
    removeErrorElement();
  }

  buttonElement.addEventListener('click', () => removeErrorElement());
  document.addEventListener('keydown', onEscapeKeydown);

  errorElement.addEventListener('click', () => {
    removeErrorElement();
  });

  mainElement.append(errorElement);
}

export const showSuccessMessage = () => {
  const messageBoxElement = successTemplate.cloneNode(true);
  messageBoxElement.style = 'z-index: 1000';

  const removeSuccessElement = () => mainElement.removeChild(messageBoxElement);
  const onEscapeKeydown = ({key}) => {
    if (!isEscapeKey(key)) {
      return;
    }

    document.removeEventListener('keydown', onEscapeKeydown);
    removeSuccessElement();
  }

  document.addEventListener('keydown', onEscapeKeydown);
  messageBoxElement.addEventListener('click', () => {
    removeSuccessElement();
  });

  mainElement.append(messageBoxElement);
}
