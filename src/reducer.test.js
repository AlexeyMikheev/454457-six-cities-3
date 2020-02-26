import {reducer, ActionCreator} from "./reducer.js";
import {OfferType, FEATURES, SortType} from './consts.js';

const citiesMock = [
  {
    id: 1,
    name: `Paris`
  },
  {
    id: 2,
    name: `Cologne`
  }
];

const currentCityMock = citiesMock[0];

const newCurrentCityMock = citiesMock[1];

const offersMock = [
  {
    id: 1,
    isPremium: true,
    cost: 120,
    isMarked: false,
    rating: 2,
    name: `Beautiful & luxurious apartment at great location`,
    type: OfferType.APARTMENT,
    image: `img/apartment-01.jpg`,
    roomsCount: 3,
    membersCount: 4,
    images: [
      `img/room.jpg`,
      `img/apartment-01.jpg`,
      `img/apartment-02.jpg`,
      `img/apartment-03.jpg`,
      `img/studio-01.jpg`,
      `img/apartment-01.jpg`,
      `img/apartment-01.jpg`,
      `img/apartment-01.jpg`,
      `img/apartment-01.jpg`,
    ],
    features: FEATURES,
    owner: {
      name: `Angelina`,
      avatar: `img/avatar-angelina.jpg`,
      description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
      isTrust: true
    },
    cityId: 1,
    lonlat: [52.3909553943508, 4.85309666406198]
  },
  {
    id: 2,
    isPremium: false,
    cost: 80,
    isMarked: true,
    rating: 3,
    name: `Wood and stone place`,
    type: OfferType.ROOM,
    image: `img/room.jpg`,
    roomsCount: 2,
    membersCount: 1,
    images: [
      `img/room.jpg`,
      `img/apartment-01.jpg`,
      `img/apartment-02.jpg`,
      `img/apartment-03.jpg`,
      `img/studio-01.jpg`,
      `img/apartment-01.jpg`,
    ],
    features: FEATURES,
    owner: {
      name: `Angelina 1`,
      avatar: `img/avatar-angelina.jpg`,
      description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
      isTrust: true
    },
    cityId: 2,
    lonlat: [52.369553943508, 4.85309666406198]
  },
  {
    id: 3,
    isPremium: false,
    cost: 132,
    isMarked: false,
    rating: 4.1,
    name: `iCanal View Prinsengracht`,
    type: OfferType.HOTEL,
    image: `img/apartment-02.jpg`,
    roomsCount: 4,
    membersCount: 5,
    images: [
      `img/room.jpg`,
      `img/apartment-01.jpg`,
      `img/apartment-02.jpg`,
      `img/apartment-03.jpg`,
      `img/studio-01.jpg`,
      `img/apartment-01.jpg`,
    ],
    features: FEATURES,
    owner: {
      name: `Angelina 2`,
      avatar: `img/avatar-angelina.jpg`,
      description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
      isTrust: true
    },
    cityId: 1,
    lonlat: [52.3909553943508, 4.929309666406198]
  }
];

const currentofferMock = offersMock[0];

const nearOffersMock = offersMock.filter((offer) => {
  return currentofferMock.id !== offer.id;
});

const newOffersMocke = [
  {
    id: 2,
    isPremium: false,
    cost: 80,
    isMarked: true,
    rating: 3,
    name: `Wood and stone place`,
    type: OfferType.ROOM,
    image: `img/room.jpg`,
    roomsCount: 2,
    membersCount: 1,
    images: [
      `img/room.jpg`,
      `img/apartment-01.jpg`,
      `img/apartment-02.jpg`,
      `img/apartment-03.jpg`,
      `img/studio-01.jpg`,
      `img/apartment-01.jpg`,
    ],
    features: FEATURES,
    owner: {
      name: `Angelina 1`,
      avatar: `img/avatar-angelina.jpg`,
      description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
      isTrust: true
    },
    cityId: 2,
    lonlat: [52.369553943508, 4.85309666406198]
  }
];

const currentOffersMock = offersMock.filter((offer) => offer.cityId === currentCityMock.id);

const sortedCurrentOffersMock = offersMock.filter((offer) => offer.cityId === currentCityMock.id).sort((prev, next) => {
  if (prev.cost > next.cost) {
    return 1;
  } else if (prev.cost < next.cost) {
    return -1;
  }
  return 0;
});

const reviewsMock = [
  {
    id: 1,
    name: `Max`,
    avatar: `img/avatar-max.jpg`,
    rating: 4.5,
    description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    date: 1569006474313
  },
  {
    id: 2,
    name: `Nina`,
    avatar: `img/avatar-max.jpg`,
    rating: 0,
    description: `The building is green and from 18th century.`,
    date: 1571598485610
  }
];

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(undefined, {})).toEqual({
    offers: [],
    currentOffers: [],
    currentOffer: null,
    hoveredOffer: null,
    cities: [],
    reviews: [],
    currentCity: null,
    nearOffers: [],
    sortType: SortType.POPULAR
  });
});

it(`Reducer should set reviews by a given value`, () => {
  expect(reducer({
    offers: [],
    currentOffers: [],
    currentOffer: null,
    hoveredOffer: null,
    cities: [],
    reviews: [],
    currentCity: null,
    nearOffers: [],
    sortType: SortType.POPULAR
  }, ActionCreator.setReviews(reviewsMock))).toEqual({
    offers: [],
    currentOffers: [],
    currentOffer: null,
    hoveredOffer: null,
    cities: [],
    reviews: reviewsMock,
    currentCity: null,
    nearOffers: [],
    sortType: SortType.POPULAR
  });
});

it(`Reducer should set offers by a given value`, () => {
  expect(reducer({
    offers: [],
    currentOffers: [],
    currentOffer: null,
    hoveredOffer: null,
    cities: [],
    reviews: [],
    currentCity: null,
    nearOffers: [],
    sortType: SortType.POPULAR
  }, ActionCreator.setOffers(offersMock))).toEqual({
    offers: offersMock,
    currentOffers: [],
    currentOffer: null,
    hoveredOffer: null,
    cities: [],
    reviews: [],
    currentCity: null,
    nearOffers: [],
    sortType: SortType.POPULAR
  });
});

it(`Reducer should set cities by a given value ang select first city`, () => {
  expect(reducer({
    offers: offersMock,
    currentOffers: [],
    currentOffer: null,
    hoveredOffer: null,
    cities: [],
    reviews: reviewsMock,
    currentCity: null,
    nearOffers: [],
    sortType: SortType.POPULAR
  }, ActionCreator.setCities(citiesMock))).toEqual({
    offers: offersMock,
    currentOffers: currentOffersMock,
    currentOffer: null,
    hoveredOffer: null,
    cities: citiesMock,
    reviews: reviewsMock,
    currentCity: currentCityMock,
    nearOffers: [],
    sortType: SortType.POPULAR
  });
});


it(`Reducer should set current city and current offers by a given value`, () => {
  expect(reducer({
    offers: offersMock,
    currentOffers: currentOffersMock,
    currentOffer: null,
    hoveredOffer: null,
    cities: citiesMock,
    reviews: [],
    currentCity: currentCityMock,
    nearOffers: [],
    sortType: SortType.POPULAR
  }, ActionCreator.setCurrentCity(newCurrentCityMock.id))).toEqual({
    offers: offersMock,
    currentOffers: newOffersMocke,
    currentOffer: null,
    hoveredOffer: null,
    cities: citiesMock,
    reviews: [],
    currentCity: newCurrentCityMock,
    nearOffers: [],
    sortType: SortType.POPULAR
  });
});

it(`Reducer should set offers sort type by a given value`, () => {
  expect(reducer({
    offers: offersMock,
    currentOffers: currentOffersMock,
    currentOffer: null,
    hoveredOffer: null,
    cities: citiesMock,
    reviews: [],
    currentCity: currentCityMock,
    nearOffers: [],
    sortType: SortType.POPULAR
  }, ActionCreator.sortOffers(SortType.PRICE_LH))).toEqual({
    offers: offersMock,
    currentOffers: sortedCurrentOffersMock,
    currentOffer: null,
    hoveredOffer: null,
    cities: citiesMock,
    reviews: [],
    currentCity: currentCityMock,
    nearOffers: [],
    sortType: SortType.PRICE_LH
  });
});

it(`Reducer should set current current offer by a given value`, () => {
  expect(reducer({
    offers: offersMock,
    currentOffers: [],
    currentOffer: null,
    hoveredOffer: null,
    cities: [],
    reviews: [],
    currentCity: null,
    nearOffers: [],
    sortType: SortType.POPULAR
  }, ActionCreator.setCurrentOffer(currentofferMock.id))).toEqual({
    offers: offersMock,
    currentOffers: [],
    currentOffer: currentofferMock,
    hoveredOffer: null,
    cities: [],
    reviews: [],
    currentCity: null,
    nearOffers: nearOffersMock,
    sortType: SortType.POPULAR
  });
});

it(`Reducer should set current current offer by a given value`, () => {
  expect(reducer({
    offers: offersMock,
    currentOffers: [],
    currentOffer: null,
    hoveredOffer: null,
    cities: [],
    reviews: [],
    currentCity: null,
    nearOffers: [],
    sortType: SortType.POPULAR
  }, ActionCreator.setHoveredOffer(currentofferMock.id))).toEqual({
    offers: offersMock,
    currentOffers: [],
    currentOffer: null,
    hoveredOffer: currentofferMock,
    cities: [],
    reviews: [],
    currentCity: null,
    nearOffers: [],
    sortType: SortType.POPULAR
  });
});
