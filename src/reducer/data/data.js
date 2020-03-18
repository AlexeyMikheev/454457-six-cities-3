import {extendObject, getCities} from "../../utils.js";
import {SortType, Url} from "../../consts.js";
import {Operation as CommentsOperation} from "../comment/comment.js";
import {adaptHotelsResponse, adaptHotelResponse} from "../../adapters.js";

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
  SET_CURRENT_CITY: `SET_CITY`,
  SET_CURRENT_OFFER: `SET_CURRENT_OFFER`,
  SET_HOVERED_OFFER: `SET_HOVERED_OFFER`,
  SET_SORT_TYPE: `SET_SORT_TYPE`,
  SET_DATA: `SET_DATA`,
  SET_NEARBY_OFFERS: `SET_NEARBY_OFFERS`,
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
  setFavoritesOfferStatus: (offerId, isMarked) => {
    return {
      type: ActionType.SET_FAVORITE_STATUS,
      payload: {offerId, isMarked},
    };
  }
};

const Operation = {
  loadData: () => (dispatch, _getState, api) => {
    return api.get(`/${Url.HOTELS}`)
      .then((response) => {
        dispatch(ActionCreator.setData(adaptHotelsResponse(response.data)));
      });
  },
  loadNearbyOffers: (currentOfferId) => (dispatch, _getState, api) => {
    return api.get(`/${Url.HOTELS}/${currentOfferId}/${Url.NEARBY}`)
      .then((response) => {
        dispatch(ActionCreator.setNearbyOffers(response.data));
      });
  },
  loadFavorits: () => (dispatch, _getState, api) => {
    return api.get(`/${Url.FAVORITE}`)
      .then((response) => {
        dispatch(ActionCreator.setFavoritesOffers(response.data));
      });
  },
  setFavorite: (offerId, state) => (dispatch, _getState, api) => {
    return api.post(`/${Url.FAVORITE}/${offerId}/${state}`)
      .then((response) => {
        const offer = adaptHotelResponse(response.data);
        dispatch(ActionCreator.setFavoritesOfferStatus(offer.id, offer.isMarked));
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
  const nearbyOffers = adaptHotelsResponse(action.payload);

  return extendObject(state, {nearbyOffers});
};

const setFavoriteOffers = (state, action) => {
  const favoriteOffers = adaptHotelsResponse(action.payload);

  return extendObject(state, {favoriteOffers});
};

const setFavoritesOfferStatus = (state, action) => {
  const {offerId, isMarked} = action.payload;

  let updatedState = extendObject({}, state);

  const updatedOffers = updatedState.offers.slice();
  const updatedOffer = updatedOffers.find((o) => o.id === offerId);

  if (updatedOffer) {
    updatedOffer.isMarked = isMarked;

    updatedState = extendObject(updatedState, {offers: updatedOffers});
  }

  const updatedNearbyOffers = updatedState.nearbyOffers.slice();
  const updatednearbyOffer = updatedNearbyOffers.find((o) => o.id === offerId);

  if (updatednearbyOffer) {
    updatednearbyOffer.isMarked = isMarked;

    updatedState = extendObject(updatedState, {offers: updatedNearbyOffers});
  }

  const updatedFavoriteOffers = updatedState.favoriteOffers.slice();
  const updatedFavoriteOffer = updatedFavoriteOffers.find((o) => o.id === offerId);

  if (updatedFavoriteOffer) {
    updatedFavoriteOffer.isMarked = isMarked;

    updatedState = extendObject(updatedState, {updatedFavoriteOffers});
  }

  return updatedState;
};


export {reducer, Operation, ActionType, ActionCreator};
