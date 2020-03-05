import NameSpace from "../name-space.js";

export const getCities = (state) => {
  return state[NameSpace.DATA].cities;
};

export const getCurrentOffers = (state) => {
  return state[NameSpace.DATA].currentOffers;
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

export const getNearOffers = (state) => {
  return state[NameSpace.DATA].nearOffers;
};

export const getSortType = (state) => {
  return state[NameSpace.DATA].sortType;
};
