import {MAX_RATING, OfferType, SortType} from "./consts";

export const getRatingPercents = (value) => Math.floor(value) * 100 / MAX_RATING;

export const extendObject = (a, b) => Object.assign({}, a, b);

export const getFiltredOffers = (offers, propertyName, value) => {
  return offers.filter((offer) => offer[propertyName] === value);
};

export const getSortedOffers = (offers, property, asc = false) => {
  return offers.slice().sort((prev, next) => {
    const prevValue = prev[property];
    const nextValue = next[property];

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
  const offersByCity = getFiltredOffers(offers, `cityName`, value);
  switch (sortType) {
    case SortType.POPULAR:
      return getSortedOffers(offersByCity, `isPremium`);
    case SortType.PRICE_HL:
      return getSortedOffers(offersByCity, `cost`);
    case SortType.PRICE_LH:
      return getSortedOffers(offersByCity, `cost`, true);
    case SortType.TOPRATED:
      return getSortedOffers(offersByCity, `rating`);
    default: return offers;
  }
};

export const getCities = (offers) => {
  const cities = offers.reduce((result, offer) => {
    const isExist = result.some((c) => c.name === offer.city.name);
    if (!isExist) {
      result.push(offer.city);
    }
    return result;
  }, []);
  return cities;
};

export const getGroupedOffersByCities = (offers) => {
  const cities = offers.reduce((result, offer) => {
    const {name: cityName} = offer.city;
    if (!result.has(cityName)) {
      const groupedOffers = offers.filter((o) => o.city.name === cityName);
      result.set(cityName, groupedOffers);
    }
    return result;
  }, new Map());
  return Array.from(cities.entries());
};


export const updateOfferMarked = (offerId, isMarked, offers) => {
  const updatedOffers = offers.slice();
  let updatedOffer = updatedOffers.find((o) => o.id === offerId);

  if (updatedOffer) {
    updatedOffer = extendObject(updatedOffer, {isMarked});
  }
  return updatedOffers;
};
