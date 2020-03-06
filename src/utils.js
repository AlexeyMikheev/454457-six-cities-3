import {MAX_RATING, OfferType, SortType} from "./consts.js";

export const getRatingPercents = (value) => Math.floor(value) * 100 / MAX_RATING;

export const extendObject = (a, b) => Object.assign({}, a, b);

export const getFiltredOffersByProperty = (offers, propertyName, value) => {
  return offers.filter((offer) => offer[propertyName] === value);
};

export const getSortedOffersByProperty = (offers, propertyName, asc = false) => {
  return offers.slice().sort((prev, next) => {
    const prevValue = prev[propertyName];
    const nextValue = next[propertyName];

    if (prevValue > nextValue) {
      return asc ? 1 : -1;
    } else if (prevValue < nextValue) {
      return asc ? -1 : 1;
    }
    return 0;
  });
};

export const paserDate = (data) => {
  return new Date(data).valueOf();
};

export const getOfferType = (type) => {
  switch (type.toLowerCase()) {
    case OfferType.APARTMENT.toLowerCase():
      return OfferType.APARTMENT;
    case OfferType.ROOM.toLowerCase():
      return OfferType.ROOM;
    case OfferType.HOUSE.toLowerCase():
      return OfferType.HOUSE;
    case OfferType.HOTEL.toLowerCase():
      return OfferType.HOTEL;
    default: return null;
  }
};

export const getPreparedOffers = (offers, sortType, value) => {
  switch (sortType) {
    case SortType.POPULAR:
      const popularOffersByCity = getFiltredOffersByProperty(offers, `cityName`, value);
      return getSortedOffersByProperty(popularOffersByCity, `isPremium`);
    case SortType.PRICE_HL:
      const HLOffersByCity = getFiltredOffersByProperty(offers, `cityName`, value);
      return getSortedOffersByProperty(HLOffersByCity, `cost`);
    case SortType.PRICE_LH:
      const LHOffersByCity = getFiltredOffersByProperty(offers, `cityName`, value);
      return getSortedOffersByProperty(LHOffersByCity, `cost`, true);
    case SortType.TOPRATED:
      const topRatedOffersByCity = getFiltredOffersByProperty(offers, `cityName`, value);
      return getSortedOffersByProperty(topRatedOffersByCity, `rating`);
    default: return offers;
  }
};
