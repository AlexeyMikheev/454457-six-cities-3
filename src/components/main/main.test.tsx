import * as React from "react";
import {mount} from "enzyme";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";
import history from "../../history.js";
import Main from "./main";
import {OfferType, FEATURES, SortType, AuthStatus} from '../../consts';
import NameSpace from "../../reducer/name-space.js";
import {Location, City, Owner, Offer} from '../../types';

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

const mocksCities: City[] = [
  cityParis,
  {
    name: `Cologne`,
    location,
    center: location.center,
    zoom: location.zoom
  },
  {
    name: `Brussels`,
    location,
    center: location.center,
    zoom: location.zoom
  },
  {
    name: `Amsterdam`,
    location,
    center: location.center,
    zoom: location.zoom
  },
  {
    name: `Hamburg`,
    location,
    center: location.center,
    zoom: location.zoom
  },
  {
    name: `Dusseldorf`,
    location,
    center: location.center,
    zoom: location.zoom
  }
];

const mockOffers: Offer[] = [
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

it(`Render Main`, () => {

  const store = mockStore({[NameSpace.DATA]: {
    cities: mocksCities,
    currentCityName: cityParis.name,
    offers: mockOffers,
    nearbyOffers: [],
    hoveredOfferId: null,
    currentOfferId: null,
    sortType: SortType.POPULAR
  },
  [NameSpace.USER]: {
    authStatus: AuthStatus.NO_AUTH,
    authInfo: null,
    authError: null
  }});

  const mainComponent = mount(
      <Router history={history}>
        <Provider store={store}>
          <Main />
        </Provider>
      </Router>);

  expect(mainComponent.getDOMNode()).toMatchSnapshot();
});
