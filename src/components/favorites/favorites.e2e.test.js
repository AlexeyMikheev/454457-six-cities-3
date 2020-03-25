import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Favorites from './favorites.jsx';
import {FEATURES, OfferType, AuthStatus, SortType} from '../../consts.js';
import {Router} from "react-router-dom";
import history from "../../history.js";
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import NameSpace from '../../reducer/name-space.js';

const mockStore = configureStore([]);

Enzyme.configure({
  adapter: new Adapter(),
});

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

const mockFavorites = [
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

const mockUserInfo = {
  [`avatar_url`]: `img/1.png`,
  email: `Oliver.conner@gmail.com`,
  id: 1,
  [`is_pro`]: false,
  name: `Oliver.conner`,
};

it(`Favorites e2e (with favoriteOffers, AuthStatus.AUTH)`, () => {

  const store = mockStore({
    [NameSpace.DATA]: {
      cities: [],
      currentCityName: null,
      offers: [],
      nearbyOffers: [],
      hoveredOfferId: null,
      currentOfferId: null,
      sortType: SortType.POPULAR,
      favoriteOffers: mockFavorites
    },
    [NameSpace.USER]: {
      authStatus: AuthStatus.AUTH,
      authInfo: mockUserInfo,
      authError: null
    }
  });

  const mockEvt = {preventDefault: () => {}};
  const setFavorite = jest.fn();
  const setCurrentOffer = jest.fn();

  const favorites = mount(
      <Router history={history}>
        <Provider store={store}>
          <Favorites />
        </Provider>
      </Router>
  );
  const placeCard = favorites.first(`h2.place-card__name`);

  placeCard.simulate(`click`, mockEvt);
  expect(setCurrentOffer).toHaveBeenCalledTimes(1);
  expect(setCurrentOffer).toHaveBeenCalledWith(mockFavorites[0].id);
});
