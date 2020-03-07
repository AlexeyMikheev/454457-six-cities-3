import {createSelector} from "reselect";
import NameSpace from "../name-space.js";
import {getPreparedOffers} from "../../utils.js";

const NAME_SPACE = NameSpace.DATA;

export const getCities = (state) => {
  return state[NAME_SPACE].cities;
};

export const getOffers = (state) => {
  return state[NAME_SPACE].offers;
};

export const getSortType = (state) => {
  return state[NAME_SPACE].sortType;
};

export const getCurrentOfferId = (state) => {
  return state[NAME_SPACE].currentOfferId;
};

export const getCurrentOffer = createSelector(
    getOffers,
    getCurrentOfferId,
    (offers, currentOfferId) => {
      return offers && currentOfferId ? offers.find((offer) => offer.id === currentOfferId) : null;
    }
);

export const getCurrentCityName = (state) => {
  return state[NAME_SPACE].currentCityName;
};

export const getCurrentCity = createSelector(
    getCities,
    getCurrentCityName,
    (cities, currentCityName) => {
      return cities && currentCityName ? cities.find((city) => city.name === currentCityName) : null;
    }
);

export const getHoveredOfferId = (state) => {
  return state[NAME_SPACE].hoveredOfferId;
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
