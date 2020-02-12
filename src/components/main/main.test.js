import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";
import {OfferType} from '../../consts.js';

it(`Render App`, () => {

  const offers = [{
    id: 1,
    isPremium: true,
    cost: 120,
    isMarked: false,
    rating: 4,
    name: `Beautiful & luxurious apartment at great location`,
    type: OfferType.APARTMENT,
    image: `img/apartment-01.jpg`
  }];

  const tree = renderer
    .create(<Main offers={offers} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
