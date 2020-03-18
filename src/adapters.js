import {paserDate, getOfferType} from "./utils.js";

export const adaptHotelsResponse = (response) => {
  return response.map(getOffer);
};

export const adaptHotelResponse = (response) => {
  return getOffer(response);
};

export const adaptCommentsResponse = (response) => {
  return response.map(getComment);
};

const getLocation = (data) => {
  return {
    latitude: parseFloat(data[`latitude`], 10) || 0,
    longitude: parseFloat(data[`longitude`], 10) || 0,
    zoom: parseFloat(data[`zoom`], 10) || 0,
    get center() {
      return [this.latitude, this.longitude];
    }
  };
};

const getcity = (data) => {
  return {
    id: undefined,
    name: data[`name`],
    location: getLocation(data[`location`]),
    get center() {
      return this.location.center;
    },
    get zoom() {
      return this.location.zoom;
    }
  };
};

const getOwner = (data) => {
  return {
    id: data[`id`],
    name: data[`name`],
    avatar: data[`avatar_url`],
    isTrust: data[`is_pro`]
  };
};

const getComment = (data) => {
  return {
    id: data[`id`],
    comment: data[`comment`],
    rating: parseInt(data[`rating`], 10),
    date: paserDate(data[`date`]),
    user: getOwner(data[`user`])
  };
};

const getOffer = (data) => {
  return {
    owner: getOwner(data[`host`]),
    location: getLocation(data[`location`]),
    city: getcity(data[`city`]),
    id: data[`id`],
    isPremium: data[`is_premium`],
    isMarked: data[`is_favorite`],
    cost: data[`price`],
    rating: data[`rating`],
    name: data[`title`],
    description: data[`description`],
    roomsCount: data[`bedrooms`],
    membersCount: data[`max_adults`],
    type: getOfferType(data[`type`]),
    image: data[`preview_image`],
    images: data[`images`],
    features: data[`goods`],
    get cityName() {
      return this.city.name;
    },
    get center() {
      return this.location.center;
    },
    get zoom() {
      return this.location.zoom;
    }
  };
};
