import PropTypes from "prop-types";
import {OFFERTYPES, FEATURES} from "./consts.js";

export const LocationShape = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  zoom: PropTypes.number.isRequired,
  center: PropTypes.arrayOf(PropTypes.number),
};

export const CityShape = {
  name: PropTypes.string.isRequired,
  location: PropTypes.shape(LocationShape)
};

export const OwnerShape = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  isTrust: PropTypes.bool.isRequired
};

export const OfferShape = {
  owner: PropTypes.shape(OwnerShape),
  location: PropTypes.shape(LocationShape),
  city: PropTypes.shape(CityShape),
  id: PropTypes.number.isRequired,
  isPremium: PropTypes.bool.isRequired,
  isMarked: PropTypes.bool.isRequired,
  cost: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  roomsCount: PropTypes.number.isRequired,
  membersCount: PropTypes.number.isRequired,
  type: PropTypes.oneOf(OFFERTYPES),
  image: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  features: PropTypes.arrayOf(PropTypes.string),
  cityName: PropTypes.string.isRequired,
  center: PropTypes.arrayOf(PropTypes.number),
  zoom: PropTypes.number
};

export const AuthInfo = {
  [`avatar_url`]: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  [`is_pro`]: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
};

export const ReviewShape = {
  id: PropTypes.number.isRequired,
  comment: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  date: PropTypes.number.isRequired,
  user: PropTypes.shape(OwnerShape).isRequired,
};
