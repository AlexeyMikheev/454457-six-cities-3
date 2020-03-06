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

export const getCurrentOfferId = (state) => {
  return state[NameSpace.DATA].currentOfferId;
};

export const getCurrentOffer = createSelector(
    getOffers,
    getCurrentOfferId,
    (offers, currentOfferId) => {
      return offers && currentOfferId ? offers.find((offer) => offer.id === currentOfferId) : null;
    }
);

export const getCurrentCityName = (state) => {
  return state[NameSpace.DATA].currentCityName;
};

export const getCurrentCity = createSelector(
    getCities,
    getCurrentCityName,
    (cities, currentCityName) => {
      return cities && currentCityName ? cities.find((city) => city.name === currentCityName) : null;
    }
);

export const getReviews = (state) => {
  return state[NameSpace.DATA].reviews;
};

export const getHoveredOfferId = (state) => {
  return state[NameSpace.DATA].hoveredOfferId;
};

export const getHoveredOffer = createSelector(
    getOffers,
    getHoveredOfferId,
    (offers, hoveredOfferId) => {
      return offers && hoveredOfferId ? offers.find((offer) => offer.id === hoveredOfferId) : null;
    }
);

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
