import * as React from "react";
import {mount} from "enzyme";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import Offers from "./offers";
import {OfferType, FEATURES, SortType, ViewMode, AuthStatus} from '../../consts';
import NameSpace from "../../reducer/name-space.js";
import history from "../../history.js";
import {Router} from "react-router-dom";
import {Location, City, Owner, Offer as OfferObjectType} from '../../types';

const mockStore = configureStore([]);

const owner: Owner = {
  id: 1,
  name: `Angelina`,
  avatar: `img/avatar-angelina.jpg`,
  isTrust: true
};

const location: Location = {
  latitude: 4.85309666406198,
  longitude: 52.3909553943508,
  zoom: 10,
  center: [4.85309666406198, 52.3909553943508]
};

const cityParis: City = {
  name: `Paris`,
  location,
  center: location.center,
  zoom: location.zoom
};

const cityAmsterdam: City = {
  name: `Amsterdam`,
  location,
  center: location.center,
  zoom: location.zoom
};

const mockCities: City[] = [cityParis, cityAmsterdam];

const mockOffers: OfferObjectType[] = [
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

  const div = document.createElement(`div`);
  document.body.appendChild(div);

  const offersComponent = mount(<Router history={history}><Provider store={store}><Offers viewMode={ViewMode.Main}/></Provider></Router>, {attachTo: div});

  expect(offersComponent.getDOMNode()).toMatchSnapshot();
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

  const div = document.createElement(`div`);
  document.body.appendChild(div);

  const offersComponent = mount(<Router history={history}><Provider store={store}><Offers viewMode={ViewMode.Property}/></Provider></Router>, {attachTo: div});

  expect(offersComponent.getDOMNode()).toMatchSnapshot();
});

