import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api.js";
import {reducer, Operation, ActionCreator, ActionType} from "./data.js";
import {SortType, Url} from "../../consts.js";
import {adaptHotelsResponse} from "../../adapters.js";

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

const responseOffersMock = [
  {
    bedrooms: 3,
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10
      },
      name: `Amsterdam`
    },
    description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    goods: [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
    host: {
      [`avatar_url`]: `img/1.png`,
      id: 3,
      [`is_pro`]: true,
      name: `Angelina`
    },
    id: 1,
    images: [`img/1.png`, `img/2.png`],
    [`is_favorite`]: false,
    [`is_premium`]: false,
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8
    },
    [`max_adults`]: 4,
    [`preview_image`]: `img/1.png`,
    price: 120,
    rating: 4.8,
    title: `Beautiful & luxurious studio at great location`,
    type: `apartment`
  },
  {
    bedrooms: 3,
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10
      },
      name: `Paris`
    },
    description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    goods: [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
    host: {
      [`avatar_url`]: `img/1.png`,
      id: 3,
      [`is_pro`]: true,
      name: `Angelina`
    },
    id: 2,
    images: [`img/1.png`, `img/2.png`],
    [`is_favorite`]: false,
    [`is_premium`]: false,
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8
    },
    [`max_adults`]: 4,
    [`preview_image`]: `img/1.png`,
    price: 120,
    rating: 4.8,
    title: `Beautiful & luxurious studio at great location`,
    type: `apartment`
  }
];

const offersMock = adaptHotelsResponse(responseOffersMock);

const currentofferMock = offersMock[0];

it(`Reducer data initial state`, () => {
  expect(reducer(undefined, {})).toEqual({
    cities: [],
    currentCityName: null,
    offers: [],
    nearbyOffers: [],
    hoveredOfferId: null,
    currentOfferId: null,
    sortType: SortType.POPULAR
  });
});

it(`Reducer data setCurrentCity`, () => {
  expect(reducer({
    cities: citiesMock,
    currentCityName: currentCityMock.name,
    offers: [],
    nearbyOffers: [],
    hoveredOfferId: null,
    currentOfferId: null,
    sortType: SortType.POPULAR
  }, ActionCreator.setCurrentCity(newCurrentCityMock.name))).toEqual({
    cities: citiesMock,
    currentCityName: newCurrentCityMock.name,
    offers: [],
    nearbyOffers: [],
    hoveredOfferId: null,
    currentOfferId: null,
    sortType: SortType.POPULAR
  });
});

it(`Reducer data setSortType`, () => {
  expect(reducer({
    cities: citiesMock,
    currentCityName: currentCityMock.name,
    offers: [],
    nearbyOffers: [],
    hoveredOfferId: null,
    currentOfferId: null,
    sortType: SortType.POPULAR
  }, ActionCreator.setSortType(SortType.PRICE_LH))).toEqual({
    cities: citiesMock,
    currentCityName: currentCityMock.name,
    offers: [],
    nearbyOffers: [],
    hoveredOfferId: null,
    currentOfferId: null,
    sortType: SortType.PRICE_LH
  });
});

it(`Reducer data setCurrentOffer`, () => {
  expect(reducer({
    cities: citiesMock,
    currentCityName: currentCityMock.name,
    offers: [],
    nearbyOffers: [],
    hoveredOfferId: null,
    currentOfferId: null,
    sortType: SortType.POPULAR
  }, ActionCreator.setCurrentOffer(currentofferMock.id))).toEqual({
    cities: citiesMock,
    currentCityName: currentCityMock.name,
    offers: [],
    nearbyOffers: [],
    hoveredOfferId: null,
    currentOfferId: currentofferMock.id,
    sortType: SortType.POPULAR
  });
});

it(`Reducer data setHoveredOffer`, () => {
  expect(reducer({
    cities: citiesMock,
    currentCityName: currentCityMock.name,
    offers: [],
    nearbyOffers: [],
    hoveredOfferId: null,
    currentOfferId: null,
    sortType: SortType.POPULAR
  }, ActionCreator.setHoveredOffer(currentofferMock.id))).toEqual({
    cities: citiesMock,
    currentCityName: currentCityMock.name,
    offers: [],
    nearbyOffers: [],
    hoveredOfferId: currentofferMock.id,
    currentOfferId: null,
    sortType: SortType.POPULAR
  });
});

describe(`Operation data loadData`, () => {
  it(`Should make a correct API`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const loader = Operation.loadData();

    apiMock
      .onGet(`/${Url.HOTELS}`)
      .reply(200, responseOffersMock);

    return loader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_DATA,
          payload: offersMock,
        });
      });
  });
});
