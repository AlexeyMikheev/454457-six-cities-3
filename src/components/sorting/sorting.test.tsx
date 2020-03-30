import * as React from "react";
import {mount} from "enzyme";
import Sorting from "./sorting";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {SortType} from "../../consts";
import NameSpace from "../../reducer/name-space.js";

const mockStore = configureStore([]);

const mock = SortType.POPULAR;

it(`Render Sorting`, () => {

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

  const sortingComponent = mount(<Provider store={store}><Sorting isToggled={false} onToggleChange={jest.fn()}/></Provider>, {attachTo: div});

  expect(sortingComponent.getDOMNode()).toMatchSnapshot();
});
