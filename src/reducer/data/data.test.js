import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api.js";
import {reducer, Operation, ActionCreator, ActionType} from "./data.js";
import {OfferType, FEATURES, SortType} from '../../consts.js';

const api = createAPI(() => {});

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
    cityName: `Paris`,
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
    cityName: `Cologne`,
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
    description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
    owner: {
      id: 2,
      name: `Angelina 2`,
      avatar: `img/avatar-angelina.jpg`,
      isTrust: true
    },
    cityName: `Paris`,
    lonlat: [52.3909553943508, 4.929309666406198]
  }
];

const currentofferMock = offersMock[0];

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
    cities: [],
    currentCityName: null,
    offers: [],
    hoveredOfferId: null,
    currentOfferId: null,
    reviews: [],
    sortType: SortType.POPULAR
  });
});

it(`Reducer should set reviews by a given value`, () => {
  expect(reducer({
    offers: [],
    currentOfferId: null,
    hoveredOfferId: null,
    cities: [],
    reviews: [],
    currentCityName: null,
    sortType: SortType.POPULAR
  }, ActionCreator.setReviews(reviewsMock))).toEqual({
    offers: [],
    currentOfferId: null,
    hoveredOfferId: null,
    cities: [],
    reviews: reviewsMock,
    currentCityName: null,
    sortType: SortType.POPULAR
  });
});

it(`Reducer should set current city by a given value`, () => {
  expect(reducer({
    offers: null,
    currentOfferId: null,
    hoveredOfferId: null,
    cities: citiesMock,
    reviews: [],
    currentCityName: currentCityMock.name,
    sortType: SortType.POPULAR
  }, ActionCreator.setCurrentCity(newCurrentCityMock.name))).toEqual({
    offers: null,
    currentOfferId: null,
    hoveredOfferId: null,
    cities: citiesMock,
    reviews: [],
    currentCityName: newCurrentCityMock.name,
    sortType: SortType.POPULAR
  });
});

it(`Reducer should set sort type type by a given value`, () => {
  expect(reducer({
    offers: offersMock,
    currentOfferId: null,
    hoveredOfferId: null,
    cities: citiesMock,
    reviews: [],
    currentCityName: newCurrentCityMock.Name,
    sortType: SortType.POPULAR
  }, ActionCreator.setSortType(SortType.PRICE_LH))).toEqual({
    offers: offersMock,
    currentOfferId: null,
    hoveredOfferId: null,
    cities: citiesMock,
    reviews: [],
    currentCityName: newCurrentCityMock.Name,
    sortType: SortType.PRICE_LH
  });
});

it(`Reducer should set current current offer by a given value`, () => {
  expect(reducer({
    offers: offersMock,
    currentOfferId: null,
    hoveredOfferId: null,
    cities: [],
    reviews: [],
    currentCityName: null,
    sortType: SortType.POPULAR
  }, ActionCreator.setCurrentOffer(currentofferMock.id))).toEqual({
    offers: offersMock,
    currentOfferId: currentofferMock.id,
    hoveredOfferId: null,
    cities: [],
    reviews: [],
    currentCityName: null,
    sortType: SortType.POPULAR
  });
});

it(`Reducer should set current hovered offer by a given value`, () => {
  expect(reducer({
    offers: offersMock,
    currentOfferId: null,
    hoveredOfferId: null,
    cities: [],
    reviews: [],
    currentCityName: null,
    sortType: SortType.POPULAR
  }, ActionCreator.setHoveredOffer(currentofferMock.id))).toEqual({
    offers: offersMock,
    currentOfferId: null,
    hoveredOfferId: currentofferMock.id,
    cities: [],
    reviews: [],
    currentCityName: null,
    sortType: SortType.POPULAR
  });
});

describe(`Operation work correctly`, () => {
  it(`Should make a correct API call to /hotels`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const questionLoader = Operation.loadData();

    apiMock
      .onGet(`/hotels`)
      .reply(200, [{fake: true}]);

    return questionLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_DATA,
          payload: [{fake: true}],
        });
      });
  });
});
