import * as React from "react";
import {mount} from "enzyme";
import {Locations} from "./locations";
import {City, Location} from "../../types";

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

const cityCologne: City = {
  name: `Cologne`,
  location,
  center: location.center,
  zoom: location.zoom
};

const mocksCities: City[] = [
  cityParis,
  cityCologne,
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

it(`Locations e2e`, () => {

  const div = document.createElement(`div`);
  document.body.appendChild(div);

  const setCurrentCityHandler = jest.fn();
  const mockEvt = {preventDefault: jest.fn()};

  const locationsComponent = mount(<Locations cities={mocksCities} currentCity={cityParis} setCurrentCity={setCurrentCityHandler} />, {attachTo: div});

  const locationLink = locationsComponent.find(`a.locations__item-link`).at(1);

  locationLink.simulate(`click`, mockEvt);

  expect(setCurrentCityHandler).toHaveBeenCalledTimes(1);
  expect(setCurrentCityHandler).toHaveBeenCalledWith(cityCologne.name);
});
