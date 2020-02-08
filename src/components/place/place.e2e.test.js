import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Place from "./place.jsx";
import {places} from "../../utils.js";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should welcome button be pressed`, () => {
  const onPlaceHeaderClick = jest.fn();

  const placeComponent = shallow(<Place name={places[0]} onPlaceHeaderClick={onPlaceHeaderClick}/>);

  const placeHeader = placeComponent.find(`h2.place-card__name`);

  placeHeader.props().onClick();

  expect(onPlaceHeaderClick.mock.calls.length).toBe(1);
});
