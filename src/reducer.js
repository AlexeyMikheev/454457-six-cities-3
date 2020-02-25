import {extendObject, getSortedOffersByProperty, getFiltredOffersByProperty} from "./utils.js";
import {SortType} from "./consts.js";

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
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_OFFERS:
      return setOffers(state, action);

    case ActionType.SET_REVIEWS:
      return setReviews(state, action);

    case ActionType.SET_CITIES:
      return setCities(state, action);

    case ActionType.SET_CURRENT_CITY:
      return setCurrentCity(state, action);

    case ActionType.SET_CURRENT_OFFER:
      return setCurrentOffer(state, action);

    case ActionType.SET_HOVERED_OFFER:
      return setHoveredOffer(state, action);

    case ActionType.SORT_OFFERS:
      return sortOffers(state, action);

    default: return state;
  }
};

const setOffers = (state, action) => {
  const offers = action.payload;

  if (offers !== null) {
    state = extendObject(state, {offers});
  }
  return state;
};


const setReviews = (state, action) => {
  const reviews = action.payload;

  if (reviews !== null && reviews.length > 0) {
    state = extendObject(state, {reviews});
  }
  return state;
};

const setCities = (state, action) => {
  const cities = action.payload;
  if (cities !== null) {
    state = extendObject(state, {cities});

    if (cities.length > 0) {

      const currentCity = cities[0];
      state = extendObject(state, {cities, currentCity});

      const {sortType} = state;

      const currentOffers = getCurrentOffers(state.offers, sortType, currentCity.id);
      if (currentOffers !== null) {
        state = extendObject(state, {currentOffers});
      }
    }
  }
  return state;
};

const setCurrentCity = (state, action) => {
  const cityId = action.payload;

  const currentCity = state.cities.find((city) => city.id === cityId);

  if (currentCity !== null) {
    state = extendObject(state, {currentCity});

    const {sortType} = state;

    const currentOffers = getCurrentOffers(state.offers, sortType, currentCity.id);
    if (currentOffers !== null) {
      state = extendObject(state, {currentOffers});
    }
  }
  return state;
};

const setCurrentOffer = (state, action) => {
  const offerId = action.payload;

  const currentOffer = state.offers.find((offer) => offer.id === offerId);
  if (currentOffer !== null) {
    state = extendObject(state, {currentOffer});
    const nearOffers = state.offers.filter((offer) => {
      return currentOffer.id !== offer.id;
    });
    if (nearOffers) {
      state = extendObject(state, {nearOffers});
    }
  }
  return state;
};

const setHoveredOffer = (state, action) => {
  const offerId = action.payload;

  const hoveredOffer = state.offers.find((offer) => offer.id === offerId);
  state = extendObject(state, {hoveredOffer});

  return state;
};

const sortOffers = (state, action) => {
  const sortType = action.payload;

  if (sortType === state.sortType) {
    return state;
  }

  const {currentCity} = state;
  state = extendObject(state, {sortType});

  const currentOffers = getCurrentOffers(state.offers, sortType, currentCity.id);
  state = extendObject(state, {currentOffers});

  return state;
};

const getCurrentOffers = (offers, sortType, cityId) => {
  switch (sortType) {
    case SortType.POPULAR:
      const popularOffersByCity = getFiltredOffersByProperty(offers, `cityId`, cityId);
      return getSortedOffersByProperty(popularOffersByCity, `isPremium`);
    case SortType.PRICE_HL:
      const HLOffersByCity = getFiltredOffersByProperty(offers, `cityId`, cityId);
      return getSortedOffersByProperty(HLOffersByCity, `cost`);
    case SortType.PRICE_LH:
      const LHOffersByCity = getFiltredOffersByProperty(offers, `cityId`, cityId);
      return getSortedOffersByProperty(LHOffersByCity, `cost`, true);
    case SortType.TOPRATED:
      const topRatedOffersByCity = getFiltredOffersByProperty(offers, `cityId`, cityId);
      return getSortedOffersByProperty(topRatedOffersByCity, `rating`);
    default: return offers;
  }
};

export {reducer, ActionType, ActionCreator};
