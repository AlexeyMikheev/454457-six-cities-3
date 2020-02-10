import React from "react";
import renderer from "react-test-renderer";
import Place from "./place.jsx";
import {places} from '../../utils.js';

it(`Render App`, () => {
  const tree = renderer
    .create(<Place name={places[0]} onPlaceHeaderClick={() => {}} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
