import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {SortType} from "../../consts.js";
import Sorting from "./sorting.jsx";

const mockStore = configureStore([]);

const mock = SortType.POPULAR;

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should sorting be toggled`, () => {

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

  const onToggleChange = jest.fn();

  const sortingComponent = mount(<Provider store={store}><Sorting isToggled={false} onToggleChange={onToggleChange}/></Provider>);

  const placesSorting = sortingComponent.find(`span.places__sorting-type`);

  placesSorting.simulate(`click`);

  expect(onToggleChange).toHaveBeenCalledTimes(1);

});
