import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";
import {Settings, places} from '../../utils.js';

it(`Render App`, () => {
  const tree = renderer
    .create(<App offersCount={Settings.OFFERS_COUNT} places={places} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
