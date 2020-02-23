import PropTypes from "prop-types";
import {FEATURES, OFFERTYPES} from "./consts.js";

export const OfferShape = {
  id: PropTypes.number.isRequired,
  isPremium: PropTypes.bool.isRequired,
  cost: PropTypes.number.isRequired,
  isMarked: PropTypes.bool.isRequired,
  rating: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(OFFERTYPES).isRequired,
  images: PropTypes.arrayOf(PropTypes.string.isRequired),
  roomsCount: PropTypes.number.isRequired,
  membersCount: PropTypes.number.isRequired,
  features: PropTypes.arrayOf(PropTypes.oneOf(FEATURES)).isRequired,
  owner: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    isTrust: PropTypes.bool.isRequired,
  }).isRequired,
  lonlat: PropTypes.arrayOf(PropTypes.number)
};

export const ReviewShape = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
};

export const OfferShape1 = {
  id: PropTypes.number,
  isPremium: PropTypes.bool,
  cost: PropTypes.number,
  isMarked: PropTypes.bool,
  rating: PropTypes.number,
  name: PropTypes.string,
  type: PropTypes.oneOf(OFFERTYPES),
  images: PropTypes.arrayOf(PropTypes.string),
  roomsCount: PropTypes.number,
  membersCount: PropTypes.number,
  features: PropTypes.arrayOf(PropTypes.oneOf(FEATURES)),
  owner: PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.string,
    description: PropTypes.string,
    isTrust: PropTypes.bool,
  }),
  lonlat: PropTypes.arrayOf(PropTypes.number)
};

export const ReviewShape1 = {
  id: PropTypes.number,
  name: PropTypes.string,
  avatar: PropTypes.string,
  rating: PropTypes.number,
  description: PropTypes.string,
  date: PropTypes.number
};