import {extendObject, getSortedOffersByProperty} from "./utils.js";
import {SortType} from "./consts.js";

const initialState = {
  offers: [],
  currentOffers: [],
  nearOffers: [],
  currentOffer: null,
  cities: [],
  reviews: [],
  currentCity: null,
  sortType: null
};

const ActionType = {
  SET_OFFERS: `SET_OFFERS`,
  SET_REVIEWS: `SET_REVIEWS`,
  SET_CITIES: `SET_CITIES`,
  SET_CURRENT_CITY: `SET_CITY`,
  SET_CURRENT_OFFER: `SET_CURRENT_OFFER`,
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

  sortOffers: (sortType) => ({
    type: ActionType.SORT_OFFERS,
    payload: sortType,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_OFFERS:
      const offers = action.payload;

      if (offers !== null) {
        state = extendObject(state, {offers});
      }

      return state;

    case ActionType.SET_REVIEWS:
      const reviews = action.payload;

      if (reviews !== null && reviews.length > 0) {
        state = extendObject(state, {reviews});
      }
      return state;

    case ActionType.SET_CITIES:
      const cities = action.payload;
      if (cities !== null) {
        state = extendObject(state, {cities});

        if (cities.length > 0) {

          const currentCity = cities[0];
          state = extendObject(state, {cities, currentCity});

          const currentOffers = state.offers.filter((offer) => offer.cityId === currentCity.id);
          if (currentOffers !== null) {
            state = extendObject(state, {currentOffers});
          }
        }
      }

      return state;

    case ActionType.SET_CURRENT_CITY:
      const cityId = action.payload;

      const currentCity = state.cities.find((city) => city.id === cityId);

      if (currentCity !== null) {
        state = extendObject(state, {currentCity});

        const currentOffers = state.offers.filter((offer) => offer.cityId === currentCity.id);
        if (currentOffers !== null) {
          state = extendObject(state, {currentOffers});
        }
      }

      return state;

    case ActionType.SET_CURRENT_OFFER:
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

    case ActionType.SORT_OFFERS:
      const sortType = action.payload;

      if (sortType === state.sortType) {
        return state;
      }

      state = extendObject(state, {sortType});

      switch (sortType) {
        case SortType.POPULAR:
          const currentOffersPopular = getSortedOffersByProperty(state.currentOffers, `isPremium`);
          state = extendObject(state, {currentOffers: currentOffersPopular});
          return state;
        case SortType.PRICE_HL:
          const currentOffersHL = getSortedOffersByProperty(state.currentOffers, `cost`);
          state = extendObject(state, {currentOffers: currentOffersHL});
          return state;
        case SortType.PRICE_LH:
          const currentOffersLH = getSortedOffersByProperty(state.currentOffers, `cost`, true);
          state = extendObject(state, {currentOffers: currentOffersLH});
          return state;
        case SortType.TOPRATED:
          const currentOffersTopRated = getSortedOffersByProperty(state.currentOffers, `rating`);
          state = extendObject(state, {currentOffers: currentOffersTopRated});
          return state;
      }

      return state;

    default: return state;
  }
};

export {reducer, ActionType, ActionCreator};
