import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import Offers from "./offers.jsx";
import {OfferType, FEATURES} from '../../consts.js';
import NameSpace from "../../reducer/name-space.js";

const mockStore = configureStore([]);

const mocks = [{
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

it(`Render Offers`, () => {

  const store = mockStore({[NameSpace.DATA]: {
    offers: mocks,
    currentOffers: [],
    currentOffer: null,
    cities: [],
    reviews: [],
    currentCity: null,
    nearOffers: []
  }});

  const tree = renderer
    .create(<Provider store={store}><Offers /></Provider>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
