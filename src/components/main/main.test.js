import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import Main from "./main.jsx";
import {OfferType, FEATURES, SortType} from '../../consts.js';

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
  owner: {
    name: `Angelina`,
    avatar: `img/avatar-angelina.jpg`,
    description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
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

  const store = mockStore({
    offers: mockOffers,
    currentOffers: [],
    currentOffer: null,
    cities: mockCities,
    reviews: [],
    currentCity: mockCities[0],
    nearOffers: [],
    sortType: SortType.POPULAR
  });

  const tree = renderer
    .create(<Provider store={store}><Main /></Provider>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
