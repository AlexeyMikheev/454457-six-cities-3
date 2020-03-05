import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import Locations from "./locations.jsx";
import NameSpace from "../../reducer/name-space.js";

const mockStore = configureStore([]);

const mocks = [
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

const mock = {
  id: 1,
  name: `Paris`
};

it(`Render Offer`, () => {

  const store = mockStore({[NameSpace.DATA]: {
    offers: [],
    currentOffers: [],
    currentOffer: null,
    cities: mocks,
    reviews: [],
    currentCity: mock,
    nearOffers: []
  }});

  const tree = renderer
    .create(<Provider store={store}><Locations /></Provider>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
