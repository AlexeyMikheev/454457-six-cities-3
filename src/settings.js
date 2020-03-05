import PropTypes from "prop-types";
import {OFFERTYPES} from "./consts.js";

export const ReviewShape = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
};

export const LocationShape = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  zoom: PropTypes.number.isRequired,
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
  images: PropTypes.arrayOf(PropTypes.string).isRequired
};
