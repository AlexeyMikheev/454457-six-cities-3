import * as React from "react";
import {mount} from "enzyme";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import Locations from "./locations";
import NameSpace from "../../reducer/name-space.js";
import {City, Location} from "../../types";

const mockStore = configureStore([]);

const location: Location = {
  latitude: 4.85309666406198,
  longitude: 52.3909553943508,
  zoom: 10,
  center: [4.85309666406198, 52.3909553943508]
};

const cityParis: City = {
  name: `Paris`,
  location,
  center: location.center,
  zoom: location.zoom
};

const mocksCities: City[] = [
  cityParis,
  {
    name: `Cologne`,
    location,
    center: location.center,
    zoom: location.zoom
  },
  {
    name: `Brussels`,
    location,
    center: location.center,
    zoom: location.zoom
  },
  {
    name: `Amsterdam`,
    location,
    center: location.center,
    zoom: location.zoom
  },
  {
    name: `Hamburg`,
    location,
    center: location.center,
    zoom: location.zoom
  },
  {
    name: `Dusseldorf`,
    location,
    center: location.center,
    zoom: location.zoom
  }
];

it(`Locations snapshot`, () => {

  const store = mockStore({[NameSpace.DATA]: {
    offers: [],
    currentOffers: [],
    currentOffer: null,
    cities: mocksCities,
    reviews: [],
    currentCity: cityParis,
    nearOffers: []
  }});

  const div = document.createElement(`div`);
  document.body.appendChild(div);

  const locationsComponent = mount(<Provider store={store}><Locations /></Provider>, {attachTo: div});

  expect(locationsComponent.getDOMNode()).toMatchSnapshot();
});
