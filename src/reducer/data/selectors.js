import {createSelector} from "reselect";
import NameSpace from "../name-space.js";
import {getPreparedOffers} from "../../utils.js";

export const getCities = (state) => {
  return state[NameSpace.DATA].cities;
};

export const getOffers = (state) => {
  return state[NameSpace.DATA].offers;
};

export const getSortType = (state) => {
  return state[NameSpace.DATA].sortType;
};

export const getCurrentOffer = (state) => {
  return state[NameSpace.DATA].currentOffer;
};

export const getCurrentCity = (state) => {
  return state[NameSpace.DATA].currentCity;
};

export const getReviews = (state) => {
  return state[NameSpace.DATA].reviews;
};

export const getHoveredOffer = (state) => {
  return state[NameSpace.DATA].hoveredOffer;
};


export const getCurrentOffers = createSelector(
    getOffers,
    getSortType,
    getCurrentCity,
    (offers, sortType, currentCity) => {
      return currentCity !== null ? getPreparedOffers(offers, sortType, currentCity.name) : [];
    }
);

export const getNearOffers = createSelector(
    getOffers,
    getCurrentOffer,
    (offers, currentOffer) => {
      return offers.filter((offer) => {
        return currentOffer !== null ? currentOffer.id !== offer.id : [];
      });
    }
);
