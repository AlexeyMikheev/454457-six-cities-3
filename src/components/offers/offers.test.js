import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import Offers from "./offers.jsx";
import {OfferType, FEATURES, SortType, ViewMode, AuthStatus} from '../../consts.js';
import NameSpace from "../../reducer/name-space.js";
import {BrowserRouter} from "react-router-dom";

const mockStore = configureStore([]);

const owner = {
  id: 1,
  name: `Angelina`,
  avatar: `img/avatar-angelina.jpg`,
  isTrust: true
};

const location = {
  latitude: 4.85309666406198,
  longitude: 52.3909553943508,
  zoom: 10,
  center: [4.85309666406198, 52.3909553943508]
};

const cityParis = {
  name: `Paris`,
  location,
  center: location.center,
  zoom: location.zoom
};

const cityAmsterdam = {
  name: `Amsterdam`,
  location,
  center: location.center,
  zoom: location.zoom
};

const mockCities = [cityParis, cityAmsterdam];

const mockOffers = [
  {
    owner,
    location,
    city: cityParis,
    id: 1,
    isPremium: true,
    isMarked: false,
    cost: 120,
    rating: 4,
    name: `Beautiful & luxurious apartment at great location`,
    description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
    roomsCount: 3,
    membersCount: 4,
    type: OfferType.APARTMENT,
    image: `img/apartment-01.jpg`,
    images: [
      `img/room.jpg`,
      `img/apartment-01.jpg`,
      `img/apartment-02.jpg`,
      `img/apartment-03.jpg`,
      `img/studio-01.jpg`,
      `img/apartment-01.jpg`,
    ],
    features: FEATURES,
    cityName: cityParis.name,
    center: location.center,
    zoom: location.zoom
  },
  {
    owner,
    location,
    city: cityAmsterdam,
    id: 2,
    isPremium: true,
    isMarked: false,
    cost: 120,
    rating: 4,
    name: `Beautiful & luxurious apartment at great location`,
    description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
    roomsCount: 3,
    membersCount: 4,
    type: OfferType.APARTMENT,
    image: `img/apartment-01.jpg`,
    images: [
      `img/room.jpg`,
      `img/apartment-01.jpg`,
      `img/apartment-02.jpg`,
      `img/apartment-03.jpg`,
      `img/studio-01.jpg`,
      `img/apartment-01.jpg`,
    ],
    features: FEATURES,
    cityName: cityParis.name,
    center: location.center,
    zoom: location.zoom
  },
];

it(`Offers spanshot (Main)`, () => {

  const store = mockStore({
    [NameSpace.DATA]: {
      cities: mockCities,
      currentCityName: null,
      offers: mockOffers,
      nearbyOffers: mockOffers,
      hoveredOfferId: null,
      currentOfferId: null,
      sortType: SortType.POPULAR,
      favoriteOffers: []
    },
    [NameSpace.USER]: {
      authStatus: AuthStatus.NO_AUTH,
      authInfo: null,
      authError: null
    }
  });

  const tree = renderer
    .create(<BrowserRouter><Provider store={store}><Offers viewMode={ViewMode.Main}/></Provider></BrowserRouter>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Offers spanshot (Property)`, () => {

  const store = mockStore({
    [NameSpace.DATA]: {
      cities: mockCities,
      currentCityName: null,
      offers: mockOffers,
      nearbyOffers: mockOffers,
      hoveredOfferId: null,
      currentOfferId: null,
      sortType: SortType.POPULAR,
      favoriteOffers: []
    },
    [NameSpace.USER]: {
      authStatus: AuthStatus.NO_AUTH,
      authInfo: null,
      authError: null
    }
  });

  const tree = renderer
    .create(<BrowserRouter><Provider store={store}><Offers viewMode={ViewMode.Property}/></Provider></BrowserRouter>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

