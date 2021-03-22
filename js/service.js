const GET_OFFERS_URL = 'https://22.javascript.pages.academy/keksobooking/data';
const POST_OFFER_URL = 'https://22.javascript.pages.academy/keksobooking';

export const getOffers = async () => {
  const response = await fetch(GET_OFFERS_URL);

  if (! response.ok) {
    throw new Error(response.statusText);
  }

  const offers = response.json();
  return offers;
}

export const sendNewOffer = async (formElement) => {
  const body = new FormData(formElement);
  const response = await fetch(POST_OFFER_URL, {
    method: 'POST',
    body,
  });

  if (! response.ok) {
    throw new Error(response.statusText);
  }
}
