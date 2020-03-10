import {extendObject} from "../../utils.js";
import {SortType, Url} from "../../consts.js";
import Offer from "../../model/offer.js";

const initialState = {
  cities: [],
  currentCityName: null,
  offers: [],
  hoveredOfferId: null,
  currentOfferId: null,
  reviews: [],
  sortType: SortType.POPULAR
};

const ActionType = {
  SET_CURRENT_CITY: `SET_CITY`,
  SET_CURRENT_OFFER: `SET_CURRENT_OFFER`,
  SET_HOVERED_OFFER: `SET_HOVERED_OFFER`,
  SET_SORT_TYPE: `SET_SORT_TYPE`,
  LOAD_DATA: `LOAD_DATA`
};

const ActionCreator = {

  setCurrentCity: (cityName) => ({
    type: ActionType.SET_CURRENT_CITY,
    payload: cityName,
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
  loadData: () => (dispatch, _getState, api) => {
    return api.get(`/${Url.HOTELS}`)
      .then((response) => {
        dispatch(ActionCreator.loadData(response.data));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

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

const setCurrentCity = (state, action) => extendObject(state, {currentCityName: action.payload});

const setCurrentOffer = (state, action) => extendObject(state, {currentOfferId: action.payload});

const setSortType = (state, action) => extendObject(state, {sortType: action.payload});

const setHoveredOffer = (state, action) => extendObject(state, {hoveredOfferId: action.payload});

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
    updatedState = extendObject(updatedState, {cities, currentCityName: currentCity.name});
  }

  return updatedState;
};

export {reducer, Operation, ActionType, ActionCreator};
