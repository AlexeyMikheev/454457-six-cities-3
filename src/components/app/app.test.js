import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import App from "./app.jsx";
import {Provider} from "react-redux";
import {OfferType, FEATURES, SortType} from '../../consts';

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
  lonlat: [52.3909553943508, 4.85309666406198]
}];

const mockDate = new Date(0).valueOf();

const reviewsMock = [
  {
    id: 1,
    name: `Max`,
    avatar: `img/avatar-max.jpg`,
    rating: 4.5,
    description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    date: mockDate
  },
  {
    id: 2,
    name: `Nina`,
    avatar: `img/avatar-max.jpg`,
    rating: 0,
    description: `The building is green and from 18th century.`,
    date: mockDate
  },
  {
    id: 3,
    name: `Andre`,
    avatar: `img/avatar-max.jpg`,
    rating: 3.5,
    description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
    date: mockDate
  }];


it(`Render App`, () => {

  const store = mockStore({
    offers: mocks,
    currentOffers: [],
    currentOffer: null,
    cities: [],
    reviews: reviewsMock,
    currentCity: null,
    sortType: SortType.POPULAR
  });

  const tree = renderer
    .create(<Provider store={store}><App /></Provider>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
