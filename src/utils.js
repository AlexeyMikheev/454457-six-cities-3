import {MAX_RATING} from "./consts.js";

export const getRatingPercents = (value) => Math.floor(value) * 100 / MAX_RATING;

export const extendObject = (a, b) => Object.assign({}, a, b);

export const getSortedOffersByProperty = (offers, propertyName, asc = false) => {
  return offers.slice().sort((prev, next) => {
    const prevValue = prev[propertyName];
    const nextValue = next[propertyName];

    if (prevValue > nextValue) {
      return asc ? 1 : -1;
    }
    if (prevValue < nextValue) {
      return asc ? -1 : 1;
    }
    return 0;
  });
};
