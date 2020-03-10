import {extendObject, getCities} from "../../utils.js";
import {SortType, Url} from "../../consts.js";
import {Operation as CommentsOperation} from "../comment/comment.js";
import {adaptHotelsResponse} from "../../adapters.js";

const initialState = {
  cities: [],
  currentCityName: null,
  offers: [],
  nearbyOffers: [],
  hoveredOfferId: null,
  currentOfferId: null,
  sortType: SortType.POPULAR
};

const ActionType = {
  SET_CURRENT_CITY: `SET_CITY`,
  SET_CURRENT_OFFER: `SET_CURRENT_OFFER`,
  SET_HOVERED_OFFER: `SET_HOVERED_OFFER`,
  SET_SORT_TYPE: `SET_SORT_TYPE`,
  SET_DATA: `SET_DATA`,
  SET_NEARBY_OFFERS: `SET_NEARBY_OFFERS`,
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

  setData: (data) => {
    return {
      type: ActionType.SET_DATA,
      payload: data,
    };
  },
  setNearbyOffers: (nearbyOffers) => {
    return {
      type: ActionType.SET_NEARBY_OFFERS,
      payload: nearbyOffers,
    };
  }
};

const Operation = {
  loadData: () => (dispatch, _getState, api) => {
    return api.get(`/${Url.HOTELS}`)
      .then((response) => {
        dispatch(ActionCreator.setData(response.data));
      });
  },
  loadNearbyOffers: (currentOfferId) => (dispatch, _getState, api) => {
    return api.get(`/${Url.HOTELS}/${currentOfferId}/${Url.NEARBY}`)
      .then((response) => {
        dispatch(ActionCreator.setNearbyOffers(response.data));
      });
  },
  setCurrentOffer: (currentOfferId) => (dispatch, _getState, _api) => {
    dispatch(ActionCreator.setCurrentOffer(currentOfferId));

    if (currentOfferId !== null) {
      dispatch(CommentsOperation.getComments(currentOfferId));

      dispatch(Operation.loadNearbyOffers(currentOfferId));
    } else {
      dispatch(ActionCreator.setNearbyOffers([]));
    }
  }
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

    case ActionType.SET_DATA:
      return setData(state, action);

    case ActionType.SET_NEARBY_OFFERS:
      return setNearbyOffers(state, action);

    default: return state;
  }
};

const setCurrentCity = (state, action) => extendObject(state, {currentCityName: action.payload});

const setCurrentOffer = (state, action) => extendObject(state, {currentOfferId: action.payload});

const setSortType = (state, action) => extendObject(state, {sortType: action.payload});

const setHoveredOffer = (state, action) => extendObject(state, {hoveredOfferId: action.payload});

const setData = (state, action) => {
  const offers = adaptHotelsResponse(action.payload);

  let updatedState = extendObject({}, state);
  updatedState = extendObject(updatedState, {offers});

  const cities = getCities(offers);

  if (cities.length > 0) {
    const currentCity = cities[0];
    updatedState = extendObject(updatedState, {cities, currentCityName: currentCity.name});
  }

  return updatedState;
};

const setNearbyOffers = (state, action) => {
  const nearbyOffers = adaptHotelsResponse(action.payload);

  return extendObject(state, {nearbyOffers});
};

export {reducer, Operation, ActionType, ActionCreator};
