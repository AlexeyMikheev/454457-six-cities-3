import React from "react";
import renderer from "react-test-renderer";
import Sorting from "./sorting.jsx";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {SortType} from "../../consts.js";

const mockStore = configureStore([]);

const mock = SortType.POPULAR;

it(`Render Sorting`, () => {

  const store = mockStore({
    offers: [],
    currentOffers: [],
    currentOffer: null,
    cities: [],
    reviews: [],
    currentCity: null,
    nearOffers: [],
    sortType: mock
  });

  const tree = renderer
    .create(<Provider store={store}><Sorting /></Provider>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
