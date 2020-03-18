import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import Main from "./main.jsx";
import {OfferType, FEATURES, SortType, AuthStatus} from '../../consts.js';
import NameSpace from "../../reducer/name-space.js";
import {BrowserRouter} from "react-router-dom";

const mockStore = configureStore([]);

const mockOffers = [{
  id: 1,
  isPremium: true,
  cost: 120,
  isMarked: false,
  rating: 4,
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
  ],
  features: FEATURES,
  description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
  owner: {
    id: 1,
    name: `Angelina`,
    avatar: `img/avatar-angelina.jpg`,
    isTrust: true
  },
  cityId: 1,
  lonlat: [52.3909553943508, 4.85309666406198]
}];

const mockCities = [
  {
    id: 1,
    name: `Paris`
  },
  {
    id: 2,
    name: `Cologne`
  },
  {
    id: 3,
    name: `Brussels`
  },
  {
    id: 4,
    name: `Amsterdam`
  },
  {
    id: 5,
    name: `Hamburg`
  },
  {
    id: 6,
    name: `Dusseldorf`
  },
];

it(`Render Main`, () => {

  const store = mockStore({[NameSpace.DATA]: {
    cities: mockCities,
    currentCityName: mockCities[0].name,
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

  const tree = renderer
    .create(
        <BrowserRouter>
          <Provider store={store}>
            <Main />
          </Provider>
        </BrowserRouter>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
