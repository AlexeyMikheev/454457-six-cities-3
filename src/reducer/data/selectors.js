import {createSelector} from "reselect";
import NameSpace from "../name-space.js";
import {getPreparedOffers, getGroupedOffersByCities} from "../../utils.js";

const NAME_SPACE = NameSpace.DATA;

export const getCities = (state) => state[NAME_SPACE].cities;

export const getOffers = (state) => state[NAME_SPACE].offers;

export const getSortType = (state) => state[NAME_SPACE].sortType;

export const getCurrentOfferId = (state) => state[NAME_SPACE].currentOfferId;

export const getReviews = (state) => state[NAME_SPACE].reviews;

export const getNearOffers = (state) => state[NAME_SPACE].nearbyOffers;

export const getFavoriteOffers = (state) => state[NAME_SPACE].favoriteOffers;

export const getGroupedFavoriteOffers = createSelector(
    getFavoriteOffers,
    (offers) => {
      debugger;
      return getGroupedOffersByCities(offers);
    }
);

export const getCurrentOffer = createSelector(
    getOffers,
    getCurrentOfferId,
    (offers, currentOfferId) => {
      return currentOfferId ? offers.find((offer) => offer.id === currentOfferId) : null;
    }
);

export const getHasSelectedOffer = createSelector(
    getCurrentOffer,
    (offer) => {
      return offer !== null;
    }
);

export const getCurrentCityName = (state) => {
  return state[NAME_SPACE].currentCityName;
};

export const getCurrentCity = createSelector(
    getCities,
    getCurrentCityName,
    (cities, currentCityName) => {
      return currentCityName ? cities.find((city) => city.name === currentCityName) : null;
    }
);

export const getHoveredOfferId = (state) => {
  return state[NAME_SPACE].hoveredOfferId;
};

export const getHoveredOffer = createSelector(
    getOffers,
    getHoveredOfferId,
    (offers, hoveredOfferId) => {
      return hoveredOfferId ? offers.find((offer) => offer.id === hoveredOfferId) : null;
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

export const getMainPageTitle = createSelector(
    getCurrentOffers,
    getCurrentCityName,
    (offers, cityName) => {
      return offers.length > 0 ? `${offers.length} ${offers.length > 1 ? `places` : `place`} to stay in ${cityName ? cityName : ``}` : `No places to stay available`;
    }
);
