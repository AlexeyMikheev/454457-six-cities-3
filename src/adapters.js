import {paserDate, getOfferType} from "./utils.js";

export const adaptOffersResponse = (response) => {
  return response.map(getOffer);
};

export const adaptOfferResponse = (response) => {
  return getOffer(response);
};

export const adaptCommentsResponse = (response) => {
  return response.map(getComment);
};

const getLocation = (data) => {
  const latitude = parseFloat(data[`latitude`], 10) || 0;
  const longitude = parseFloat(data[`longitude`], 10) || 0;

  return {
    latitude,
    longitude,
    zoom: parseFloat(data[`zoom`], 10) || 0,
    center: [latitude, longitude]
  };
};

const getcity = (data) => {
  const location = getLocation(data[`location`]);
  return {
    name: data[`name`],
    location,
    center: location.center,
    zoom: location.zoom
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
  const owner = getOwner(data[`host`]);
  const location = getLocation(data[`location`]);
  const city = getcity(data[`city`]);

  return {
    owner,
    location,
    city,
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
    cityName: city.name,
    center: location.center,
    zoom: location.zoom
  };
};
