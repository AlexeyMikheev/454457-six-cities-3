import * as React from "react";
import {mount} from "enzyme";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import App from "./app";
import {OfferType, FEATURES, SortType, AuthStatus} from "../../consts";
import NameSpace from "../../reducer/name-space.js";
import {Location, City, Owner, Offer, Review} from '../../types';

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

const mockDate: number = new Date(0).valueOf();

const mocksReviews: Review[] = [
  {
    comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    date: mockDate,
    id: 1,
    rating: 4,
    user: {
      avatar: `img/1.png`,
      id: 4,
      isTrust: false,
      name: `Max`
    }
  },
  {
    comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    date: mockDate,
    id: 2,
    rating: 4,
    user: {
      avatar: `img/1.png`,
      id: 4,
      isTrust: false,
      name: `Max`
    }
  },
  {
    comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    date: mockDate,
    id: 3,
    rating: 4,
    user: {
      avatar: `img/1.png`,
      id: 4,
      isTrust: false,
      name: `Max`
    }
  }
];

it(`App snapshot`, () => {

  const store = mockStore({
    [NameSpace.DATA]: {
      cities: mocksCities,
      reviews: mocksReviews,
      currentCityName: cityParis.name,
      offers: mockOffers,
      nearbyOffers: [],
      hoveredOfferId: null,
      currentOfferId: null,
      sortType: SortType.POPULAR
    },
    [NameSpace.USER]: {
      authStatus: AuthStatus.NO_AUTH,
      authInfo: null
    }
  });

  const div = document.createElement(`div`);
  document.body.appendChild(div);

  const appComponent = mount(<Provider store={store}><App /></Provider>, {attachTo: div});

  expect(appComponent.getDOMNode()).toMatchSnapshot();
});
