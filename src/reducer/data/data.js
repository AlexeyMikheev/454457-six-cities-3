import {extendObject} from "../../utils.js";
import {SortType} from "../../consts.js";
import Offer from "../../model/offer.js";

const initialState = {
  cities: [],
  currentCity: null,
  offers: [],
  currentOffers: [],
  hoveredOffer: null,
  nearOffers: [],
  currentOffer: null,
  reviews: [],
  sortType: SortType.POPULAR
};

const ActionType = {
  SET_REVIEWS: `SET_REVIEWS`,
  SET_CURRENT_CITY: `SET_CITY`,
  SET_CURRENT_OFFER: `SET_CURRENT_OFFER`,
  SET_HOVERED_OFFER: `SET_HOVERED_OFFER`,
  SET_SORT_TYPE: `SET_SORT_TYPE`,
  LOAD_DATA: `LOAD_DATA`
};

const ActionCreator = {

  setReviews: (reviews) => ({
    type: ActionType.SET_REVIEWS,
    payload: reviews
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

  setSortType: (sortType) => ({
    type: ActionType.SET_SORT_TYPE,
    payload: sortType,
  }),

  loadData: (offers) => {
    return {
      type: ActionType.LOAD_DATA,
      payload: offers,
    };
  }
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

    case ActionType.SET_REVIEWS:
      return setReviews(state, action);

    case ActionType.SET_CURRENT_CITY:
      return setCurrentCity(state, action);

    case ActionType.SET_CURRENT_OFFER:
      return setCurrentOffer(state, action);

    case ActionType.SET_SORT_TYPE:
      return setSortType(state, action);

    case ActionType.SET_HOVERED_OFFER:
      return setHoveredOffer(state, action);

    case ActionType.LOAD_DATA:
      return loadData(state, action);

    default: return state;
  }
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
    return extendObject(state, {currentCity});
  }
  return state;
};

const setCurrentOffer = (state, action) => {
  const offerId = action.payload;

  const currentOffer = state.offers.find((offer) => offer.id === offerId);
  if (currentOffer !== null) {
    return extendObject(state, {currentOffer});
  }

  return state;
};

const setSortType = (state, action) => {
  const sortType = action.payload;

  if (sortType === state.sortType) {
    return state;
  }

  return extendObject(state, {sortType});
};


const setHoveredOffer = (state, action) => {
  const offerId = action.payload;

  const hoveredOffer = state.offers.find((offer) => offer.id === offerId);

  return extendObject(state, {hoveredOffer});
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
  }

  return updatedState;
};


export {reducer, Operation, ActionType, ActionCreator};
