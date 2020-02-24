import {reducer, ActionCreator} from "./reducer.js";
import {OfferType, FEATURES} from './consts.js';

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

const offersMocke = [
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
    city: {
      id: 1,
      name: `Paris`
    },
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
    city: {
      id: 2,
      name: `Cologne`
    },
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
    city: {
      id: 1,
      name: `Paris`
    },
    lonlat: [52.3909553943508, 4.929309666406198]
  }
];

const currentofferMock = offersMocke[0];

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
    city: {
      id: 2,
      name: `Cologne`
    },
    lonlat: [52.369553943508, 4.85309666406198]
  }
];

const currentOffersMock = offersMocke.filter((offer) => offer.city.id === currentCityMock.id);

const reviewsMoke = [
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
    cities: [],
    reviews: [],
    currentCity: null
  });
});

it(`Reducer should set reviews by a given value`, () => {
  expect(reducer({
    offers: [],
    currentOffers: [],
    currentOffer: null,
    cities: [],
    reviews: [],
    currentCity: null
  }, ActionCreator.setReviews(reviewsMoke))).toEqual({
    offers: [],
    currentOffers: [],
    currentOffer: null,
    cities: [],
    reviews: reviewsMoke,
    currentCity: null
  });
});

it(`Reducer should set offers and cities by a given value`, () => {
  expect(reducer({
    offers: [],
    currentOffers: [],
    currentOffer: null,
    cities: [],
    reviews: [],
    currentCity: null
  }, ActionCreator.setOffers(offersMocke))).toEqual({
    offers: offersMocke,
    currentOffers: currentOffersMock,
    currentOffer: null,
    cities: citiesMock,
    reviews: [],
    currentCity: currentCityMock
  });
});


it(`Reducer should set current city and current offers by a given value`, () => {
  expect(reducer({
    offers: offersMocke,
    currentOffers: currentOffersMock,
    currentOffer: null,
    cities: citiesMock,
    reviews: [],
    currentCity: currentCityMock
  }, ActionCreator.setCurrentCity(newCurrentCityMock.id))).toEqual({
    offers: offersMocke,
    currentOffers: newOffersMocke,
    currentOffer: null,
    cities: citiesMock,
    reviews: [],
    currentCity: newCurrentCityMock
  });
});

it(`Reducer should set current city and current offers by a given value`, () => {
  expect(reducer({
    offers: offersMocke,
    currentOffers: [],
    currentOffer: null,
    cities: [],
    reviews: [],
    currentCity: null
  }, ActionCreator.setCurrentOffer(currentofferMock.id))).toEqual({
    offers: offersMocke,
    currentOffers: [],
    currentOffer: currentofferMock,
    cities: [],
    reviews: [],
    currentCity: null
  });
});
