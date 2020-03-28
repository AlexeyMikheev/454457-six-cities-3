import {extendObject, getCities} from "../../utils.js";
import {SortType, Url} from "../../consts.js";
import {Operation as CommentsOperation} from "../comment/comment.js";
import {adaptOffersResponse, adaptOfferResponse} from "../../adapters.js";

const initialState = {
  cities: [],
  currentCityName: null,
  offers: [],
  nearbyOffers: [],
  hoveredOfferId: null,
  currentOfferId: null,
  sortType: SortType.POPULAR,
  favoriteOffers: []
};

const ActionType = {
  SET_CURRENT_CITY: `SET_CURRENT_CITY`,
  SET_CURRENT_OFFER: `SET_CURRENT_OFFER`,
  SET_HOVERED_OFFER: `SET_HOVERED_OFFER`,
  SET_SORT_TYPE: `SET_SORT_TYPE`,
  SET_NEARBY_OFFERS: `SET_NEARBY_OFFERS`,
  SET_DATA: `SET_DATA`,
  SET_FAVORITE_OFFERS: `SET_FAVORITE_OFFERS`,
  SET_FAVORITE_STATUS: `SET_FAVORITE_STATUS`
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
  setNearbyOffers: (offers) => {
    return {
      type: ActionType.SET_NEARBY_OFFERS,
      payload: offers,
    };
  },
  setFavoritesOffers: (offers) => {
    return {
      type: ActionType.SET_FAVORITE_OFFERS,
      payload: offers,
    };
  },
  setFavoritesOfferStatus: (offer) => {
    return {
      type: ActionType.SET_FAVORITE_STATUS,
      payload: offer,
    };
  }
};

const Operation = {
  loadData: () => (dispatch, _getState, api) => {
    return api.get(`/${Url.HOTELS}`)
      .then((response) => {
        dispatch(ActionCreator.setData(adaptOffersResponse(response.data)));
      });
  },
  loadNearbyOffers: (currentOfferId) => (dispatch, _getState, api) => {
    return api.get(`/${Url.HOTELS}/${currentOfferId}/${Url.NEARBY}`)
      .then((response) => {
        dispatch(ActionCreator.setNearbyOffers(adaptOffersResponse(response.data)));
      });
  },
  loadFavorits: () => (dispatch, _getState, api) => {
    return api.get(`/${Url.FAVORITE}`)
      .then((response) => {
        dispatch(ActionCreator.setFavoritesOffers(adaptOffersResponse(response.data)));
      });
  },
  setFavorite: (offerId, state) => (dispatch, _getState, api) => {
    return api.post(`/${Url.FAVORITE}/${offerId}/${state}`)
      .then((response) => {
        dispatch(ActionCreator.setFavoritesOfferStatus(adaptOfferResponse(response.data)));
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

    case ActionType.SET_FAVORITE_OFFERS:
      return setFavoriteOffers(state, action);

    case ActionType.SET_FAVORITE_STATUS:
      return setFavoritesOfferStatus(state, action);

    default: return state;
  }
};

const setCurrentCity = (state, action) => extendObject(state, {currentCityName: action.payload});

const setCurrentOffer = (state, action) => extendObject(state, {currentOfferId: action.payload});

const setSortType = (state, action) => extendObject(state, {sortType: action.payload});

const setHoveredOffer = (state, action) => extendObject(state, {hoveredOfferId: action.payload});

const setData = (state, action) => {

  let updatedState = extendObject({}, state);
  updatedState = extendObject(updatedState, {offers: action.payload});

  const cities = getCities(action.payload);

  if (cities.length > 0) {
    const currentCity = cities[0];
    updatedState = extendObject(updatedState, {cities, currentCityName: currentCity.name});
  }

  return updatedState;
};

const setNearbyOffers = (state, action) => {
  const nearbyOffers = action.payload;

  return extendObject(state, {nearbyOffers});
};

const setFavoriteOffers = (state, action) => {
  return extendObject(state, {favoriteOffers: action.payload});
};

const setFavoritesOfferStatus = (state, action) => {
  const offer = action.payload;
  const {id: offerId, isMarked} = offer;

  let updatedState = extendObject({}, state);

  const updatedOffers = updatedState.offers.slice();
  let updatedOfferIndex = updatedOffers.findIndex((o) => o.id === offerId);

  if (updatedOfferIndex !== -1) {
    updatedOffers[updatedOfferIndex] = extendObject(updatedOffers[updatedOfferIndex], {isMarked});

    updatedState = extendObject(updatedState, {offers: updatedOffers});
  }

  const updatedNearbyOffers = updatedState.nearbyOffers.slice();
  const updatednearbyOfferIndex = updatedNearbyOffers.findIndex((o) => o.id === offerId);

  if (updatednearbyOfferIndex !== -1) {
    updatedNearbyOffers[updatednearbyOfferIndex] = extendObject(updatedNearbyOffers[updatednearbyOfferIndex], {isMarked});

    updatedState = extendObject(updatedState, {nearbyOffers: updatedNearbyOffers});
  }

  const updatedFavoriteOfferIndex = updatedState.favoriteOffers.findIndex((o) => o.id === offerId);

  if (updatedFavoriteOfferIndex !== -1 && !isMarked) {
    const updatedFavoriteOffers = updatedState.favoriteOffers.slice().filter((o) => o.id !== offerId);

    updatedState = extendObject(updatedState, {favoriteOffers: updatedFavoriteOffers});
  } else {
    const updatedFavoriteOffers = updatedState.favoriteOffers.slice();
    updatedFavoriteOffers.push(offer);

    updatedState = extendObject(updatedState, {favoriteOffers: updatedFavoriteOffers});
  }

  return updatedState;
};


export {reducer, Operation, ActionType, ActionCreator};
