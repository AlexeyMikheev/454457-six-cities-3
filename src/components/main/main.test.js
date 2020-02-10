import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";
import {Settings, places} from '../../utils.js';

it(`Render App`, () => {
  const tree = renderer
    .create(<Main offersCount={Settings.OFFERS_COUNT} places={places} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
