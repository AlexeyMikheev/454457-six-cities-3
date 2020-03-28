import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {SortType} from "../../consts.js";
import Sorting from "./sorting.jsx";
import NameSpace from "../../reducer/name-space.js";

Enzyme.configure({
  adapter: new Adapter(),
});

const mockStore = configureStore([]);

const mock = SortType.POPULAR;

it(`Should sorting be toggled`, () => {

  const store = mockStore({[NameSpace.DATA]: {
    offers: [],
    currentOffers: [],
    currentOffer: null,
    cities: [],
    reviews: [],
    currentCity: null,
    nearOffers: [],
    sortType: mock
  }});

  const div = document.createElement(`div`);
  document.body.appendChild(div);

  const onToggleChange = jest.fn();

  const sortingComponent = mount(<Provider store={store}><Sorting isToggled={false} onToggleChange={onToggleChange}/></Provider>, {attachTo: div});

  const placesSorting = sortingComponent.find(`span.places__sorting-type`);

  placesSorting.simulate(`click`);

  expect(onToggleChange).toHaveBeenCalledTimes(1);

});
