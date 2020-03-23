import MockAdapter from "axios-mock-adapter";
import { createAPI } from "../../api.js";
import { reducer, Operation, ActionCreator, ActionType } from "./data.js";
import { SortType, Url, FavoriteState } from "../../consts.js";
import { getCities } from "../../utils.js";
import { adaptOffersResponse, adaptOfferResponse } from "../../adapters.js";

const api = createAPI(() => { });

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
    [`is_favorite`]: true,
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

const offersMock = adaptOffersResponse(responseOffersMock);

const markedFavoriteOffers = adaptOffersResponse(responseOffersMock);
markedFavoriteOffers[0].isMarked = false;


const currentofferMock = offersMock[0];

const citiesMock = getCities(offersMock);

const currentCityMock = citiesMock[0];

const newCurrentCityMock = citiesMock[1];

it(`Reducer data initial state`, () => {
  expect(reducer(undefined, {})).toEqual({
    cities: [],
    currentCityName: null,
    offers: [],
    nearbyOffers: [],
    hoveredOfferId: null,
    currentOfferId: null,
    sortType: SortType.POPULAR,
    favoriteOffers: []
  });
});

it(`Reducer data SET_CURRENT_CITY`, () => {
  expect(reducer({
    cities: [],
    currentCityName: currentCityMock.name,
    offers: [],
    nearbyOffers: [],
    hoveredOfferId: null,
    currentOfferId: null,
    sortType: SortType.POPULAR,
    favoriteOffers: []
  }, ActionCreator.setCurrentCity(newCurrentCityMock.name))).toEqual({
    cities: [],
    currentCityName: newCurrentCityMock.name,
    offers: [],
    nearbyOffers: [],
    hoveredOfferId: null,
    currentOfferId: null,
    sortType: SortType.POPULAR,
    favoriteOffers: []
  });
});

it(`Reducer data SET_CURRENT_OFFER`, () => {
  expect(reducer({
    cities: [],
    currentCityName: null,
    offers: [],
    nearbyOffers: [],
    hoveredOfferId: null,
    currentOfferId: null,
    sortType: SortType.POPULAR,
    favoriteOffers: []
  }, ActionCreator.setCurrentOffer(currentofferMock.id))).toEqual({
    cities: [],
    currentCityName: null,
    offers: [],
    nearbyOffers: [],
    hoveredOfferId: null,
    currentOfferId: currentofferMock.id,
    sortType: SortType.POPULAR,
    favoriteOffers: []
  });
});

it(`Reducer data SET_HOVERED_OFFER`, () => {
  expect(reducer({
    cities: [],
    currentCityName: null,
    offers: [],
    nearbyOffers: [],
    hoveredOfferId: null,
    currentOfferId: null,
    sortType: SortType.POPULAR,
    favoriteOffers: []
  }, ActionCreator.setHoveredOffer(currentofferMock.id))).toEqual({
    cities: [],
    currentCityName: null,
    offers: [],
    nearbyOffers: [],
    hoveredOfferId: currentofferMock.id,
    currentOfferId: null,
    sortType: SortType.POPULAR,
    favoriteOffers: []
  });
});

it(`Reducer data SET_SORT_TYPE`, () => {
  expect(reducer({
    cities: [],
    currentCityName: null,
    offers: [],
    nearbyOffers: [],
    hoveredOfferId: null,
    currentOfferId: null,
    sortType: SortType.POPULAR,
    favoriteOffers: []
  }, ActionCreator.setSortType(SortType.PRICE_LH))).toEqual({
    cities: [],
    currentCityName: null,
    offers: [],
    nearbyOffers: [],
    hoveredOfferId: null,
    currentOfferId: null,
    sortType: SortType.PRICE_LH,
    favoriteOffers: []
  });
});

it(`Reducer data SET_NEARBY_OFFERS`, () => {
  expect(reducer({
    cities: [],
    currentCityName: null,
    offers: [],
    nearbyOffers: [],
    hoveredOfferId: null,
    currentOfferId: null,
    sortType: SortType.POPULAR,
    favoriteOffers: []
  }, ActionCreator.setNearbyOffers(adaptOffersResponse(responseOffersMock)))).toEqual({
    cities: [],
    currentCityName: null,
    offers: [],
    nearbyOffers: offersMock,
    hoveredOfferId: null,
    currentOfferId: null,
    sortType: SortType.POPULAR,
    favoriteOffers: []
  });
});

it(`Reducer data SET_DATA`, () => {
  expect(reducer({
    cities: [],
    currentCityName: null,
    offers: [],
    nearbyOffers: [],
    hoveredOfferId: null,
    currentOfferId: null,
    sortType: SortType.POPULAR,
    favoriteOffers: []
  }, ActionCreator.setData(adaptOffersResponse(responseOffersMock)))).toEqual({
    cities: citiesMock,
    currentCityName: currentCityMock.name,
    offers: offersMock,
    nearbyOffers: [],
    hoveredOfferId: null,
    currentOfferId: null,
    sortType: SortType.POPULAR,
    favoriteOffers: []
  });
});

it(`Reducer data SET_FAVORITE_OFFERS`, () => {
  expect(reducer({
    cities: [],
    currentCityName: null,
    offers: [],
    nearbyOffers: [],
    hoveredOfferId: null,
    currentOfferId: null,
    sortType: SortType.POPULAR,
    favoriteOffers: []
  }, ActionCreator.setFavoritesOffers(adaptOffersResponse(responseOffersMock)))).toEqual({
    cities: [],
    currentCityName: null,
    offers: [],
    nearbyOffers: [],
    hoveredOfferId: null,
    currentOfferId: null,
    sortType: SortType.POPULAR,
    favoriteOffers: offersMock
  });
});

it(`Reducer data SET_FAVORITE_STATUS`, () => {
  expect(reducer({
    cities: [],
    currentCityName: null,
    offers: offersMock,
    nearbyOffers: offersMock,
    hoveredOfferId: null,
    currentOfferId: null,
    sortType: SortType.POPULAR,
    favoriteOffers: []
  }, ActionCreator.setFavoritesOfferStatus(markedFavoriteOffers[0]))).toEqual({
    cities: [],
    currentCityName: null,
    offers: markedFavoriteOffers,
    nearbyOffers: markedFavoriteOffers,
    hoveredOfferId: null,
    currentOfferId: null,
    sortType: SortType.POPULAR,
    favoriteOffers: [markedFavoriteOffers[0]]
  });
});

describe(`Reducer data Operation.loadData`, () => {
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
          payload: adaptOffersResponse(responseOffersMock),
        });
      });
  });
});

describe(`Reducer data Operation.loadNearbyOffers`, () => {
  it(`Should make a correct API`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const loader = Operation.loadNearbyOffers(currentofferMock.id);

    apiMock
      .onGet(`/${Url.HOTELS}/${currentofferMock.id}/${Url.NEARBY}`)
      .reply(200, responseOffersMock);

    return loader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_NEARBY_OFFERS,
          payload: adaptOffersResponse(responseOffersMock),
        });
      });
  });
});

describe(`Reducaer data data Operation.loadFavorits`, () => {
  it(`Should make a correct API`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const loader = Operation.loadFavorits();

    apiMock
      .onGet(`/${Url.FAVORITE}`)
      .reply(200, responseOffersMock);

    return loader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_FAVORITE_OFFERS,
          payload: adaptOffersResponse(responseOffersMock),
        });
      });
  });
});

describe(`Reducer data Operation.setFavorite`, () => {
  it(`Should make a correct API`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const loader = Operation.setFavorite(currentofferMock.id, FavoriteState.UNMARKED);

    apiMock
      .onPost(`/${Url.FAVORITE}/${currentofferMock.id}/${FavoriteState.UNMARKED}`)
      .reply(200, responseOffersMock[0]);

    return loader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_FAVORITE_STATUS,
          payload: adaptOfferResponse(responseOffersMock[0]),
        });
      });
  });
});

describe(`Reducer data Operation.setCurrentOffer`, () => {
  it(`Should make a correct API`, function () {
    const dispatch = jest.fn();

    Operation.setCurrentOffer(currentofferMock.id)(dispatch, () => { });
    expect(dispatch).toHaveBeenCalledTimes(3);

  });
});


describe(`Reducer data Operation.setCurrentOffer`, () => {
  it(`Should make a correct API`, function () {
    const dispatch = jest.fn();

    Operation.setCurrentOffer(null)(dispatch, () => { });
    expect(dispatch).toHaveBeenCalledTimes(2);
  });
});
