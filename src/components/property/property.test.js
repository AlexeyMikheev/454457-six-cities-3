import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import Property from "./property.jsx";
import {OfferType, FEATURES, AuthStatus, SortType} from '../../consts.js';
import NameSpace from "../../reducer/name-space.js";
import {Router} from "react-router-dom";
import history from "../../history.js";

Enzyme.configure({
  adapter: new Adapter(),
});

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

const mockDate = new Date(0).valueOf();

const reviewsMock = [
  {
    id: 1,
    comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    rating: 4.5,
    date: mockDate,
    user: {
      id: 1,
      name: `Max`,
      avatar: `img/avatar-max.jpg`,
      isTrust: true
    }
  },
  {
    id: 2,
    comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    rating: 4.5,
    date: mockDate,
    user: {
      id: 1,
      name: `Ivan`,
      avatar: `img/avatar-max.jpg`,
      isTrust: true
    }
  },
  {
    id: 3,
    comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    rating: 4.5,
    date: mockDate,
    user: {
      id: 1,
      name: `Petr`,
      avatar: `img/avatar-max.jpg`,
      isTrust: true
    }
  }];


it(`Render Property`, () => {

  const store = mockStore({
    [NameSpace.DATA]: {
      cities: mockCities,
      currentCityName: mockCities[0].name,
      offers: mockOffers,
      nearbyOffers: mockOffers,
      hoveredOfferId: null,
      currentOfferId: mockOffers[0].id,
      sortType: SortType.POPULAR,
    },
    [NameSpace.COMMNET]: {
      comments: reviewsMock,
      commentError: null,
      isLoading: false
    },
    [NameSpace.USER]: {
      authStatus: AuthStatus.NO_AUTH,
      authInfo: null,
      authError: null
    }
  });

  const div = document.createElement(`div`);
  document.body.appendChild(div);

  const mockMatch = {params: {offerId: mockOffers[0].id}};

  const propertyComponent = mount(
      <Router history={history}>
        <Provider store={store}>
          <Property
            setCurrentOffer={() => {}}
            match={mockMatch}/>
        </Provider>
      </Router>, {attachTo: div});

  expect(propertyComponent.getDOMNode()).toMatchSnapshot();
});
