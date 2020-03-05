import {extendObject, getSortedOffersByProperty, getFiltredOffersByProperty} from "./utils.js";
import {SortType} from "./consts.js";
import Offer from "./model/offer.js";

const initialState = {
  offers: [],
  currentOffers: [],
  nearOffers: [],
  currentOffer: null,
  hoveredOffer: null,
  cities: [],
  reviews: [],
  currentCity: null,
  sortType: SortType.POPULAR
};

const ActionType = {
  SET_OFFERS: `SET_OFFERS`,
  SET_REVIEWS: `SET_REVIEWS`,
  SET_CITIES: `SET_CITIES`,
  SET_CURRENT_CITY: `SET_CITY`,
  SET_CURRENT_OFFER: `SET_CURRENT_OFFER`,
  SET_HOVERED_OFFER: `SET_HOVERED_OFFER`,
  SORT_OFFERS: `SORT_OFFERS`,
  LOAD_DATA: `LOAD_DATA`,
};

const ActionCreator = {

  setReviews: (reviews) => ({
    type: ActionType.SET_REVIEWS,
    payload: reviews
  }),

  setOffers: (offers) => ({
    type: ActionType.SET_OFFERS,
    payload: offers
  }),

  setCities: (cities) => ({
    type: ActionType.SET_CITIES,
    payload: cities
  }),

  setCurrentCity: (cityId) => ({
    type: ActionType.SET_CURRENT_CITY,
    payload: cityId,
  }),

  setCurrentOffer: (offerId) => ({
    type: ActionType.SET_CURRENT_OFFER,
    payload: offerId,
  }),

  setHoveredOffer: (offerId) => ({
    type: ActionType.SET_HOVERED_OFFER,
    payload: offerId,
  }),

  sortOffers: (sortType) => ({
    type: ActionType.SORT_OFFERS,
    payload: sortType,
  }),

  loadData: (offers) => {
    return {
      type: ActionType.LOAD_DATA,
      payload: offers,
    };
  },
};

const Operation = {
  loadData: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        dispatch(ActionCreator.loadData(response.data));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_OFFERS:
      return setOffers(state, action);

    case ActionType.SET_REVIEWS:
      return setReviews(state, action);

    case ActionType.SET_CURRENT_CITY:
      return setCurrentCity(state, action);

    case ActionType.SET_CURRENT_OFFER:
      return setCurrentOffer(state, action);

    case ActionType.SET_HOVERED_OFFER:
      return setHoveredOffer(state, action);

    case ActionType.SORT_OFFERS:
      return sortOffers(state, action);

    case ActionType.LOAD_DATA:
      return loadData(state, action);

    default: return state;
  }
};

const setOffers = (state, action) => {
  const offers = action.payload;

  if (offers !== null) {
    return extendObject(state, {offers});
  }
  return state;
};


const setReviews = (state, action) => {
  const reviews = action.payload;

  if (reviews !== null && reviews.length > 0) {
    return extendObject(state, {reviews});
  }
  return state;
};

const setCurrentCity = (state, action) => {
  const cityName = action.payload;

  const currentCity = state.cities.find((city) => city.name === cityName);

  if (currentCity !== null) {
    let updatedState = extendObject({}, state);

    updatedState = extendObject(updatedState, {currentCity});

    const {sortType} = updatedState;

    const currentOffers = getCurrentOffers(state.offers, sortType, currentCity.name);
    if (currentOffers !== null) {
      updatedState = extendObject(updatedState, {currentOffers});
    }

    return updatedState;
  }
  return state;
};

const setCurrentOffer = (state, action) => {
  const offerId = action.payload;

  const currentOffer = state.offers.find((offer) => offer.id === offerId);
  if (currentOffer === null) {
    return state;
  }

  let updatedState = extendObject({}, state);

  updatedState = extendObject(updatedState, {currentOffer});

  const nearOffers = updatedState.offers.filter((offer) => {
    return currentOffer.id !== offer.id;
  });

  if (nearOffers) {
    updatedState = extendObject(updatedState, {nearOffers});
  }

  return updatedState;

};

const setHoveredOffer = (state, action) => {
  const offerId = action.payload;

  const hoveredOffer = state.offers.find((offer) => offer.id === offerId);

  return extendObject(state, {hoveredOffer});
};

const sortOffers = (state, action) => {
  const sortType = action.payload;

  if (sortType === state.sortType) {
    return state;
  }

  let updatedState = extendObject({}, state);

  const {currentCity} = updatedState;
  updatedState = extendObject(updatedState, {sortType});

  const currentOffers = getCurrentOffers(updatedState.offers, sortType, currentCity.name);
  updatedState = extendObject(updatedState, {currentOffers});

  return updatedState;
};

const getCurrentOffers = (offers, sortType, value) => {
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

const loadData = (state, action) => {
  const values = action.payload;

  const offers = Offer.parseOffers(values);

  const citiesMap = new Map();
  offers.forEach((offer) => {
    if (!citiesMap.has(offer.city.name)) {
      citiesMap.set(offer.city.name, offer.city);
    }
  });

  let updatedState = extendObject({}, state);

  updatedState = extendObject(updatedState, {offers});

  const cities = Array.from(citiesMap.entries()).map((cityMap) => cityMap[1]);

  if (cities.length > 0) {
    const currentCity = cities[0];
    updatedState = extendObject(updatedState, {cities, currentCity});

    const {sortType} = updatedState;

    const currentOffers = getCurrentOffers(updatedState.offers, sortType, currentCity.name);
    if (currentOffers !== null) {
      updatedState = extendObject(updatedState, {currentOffers});
    }
  }

  return updatedState;
};

export {reducer, Operation, ActionType, ActionCreator};
