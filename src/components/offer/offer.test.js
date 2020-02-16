import React from "react";
import renderer from "react-test-renderer";
import Offer from "./offer.jsx";
import {OfferType} from '../../consts.js';

const mock = {
  id: 1,
  isPremium: true,
  cost: 120,
  isMarked: false,
  rating: 4,
  name: `Beautiful & luxurious apartment at great location`,
  type: OfferType.APARTMENT,
  image: `img/apartment-01.jpg`
};

it(`Render App`, () => {

  const tree = renderer
    .create(<Offer offer={mock} onPlaceHeaderClick={() => {}} onPlaceCardMouseEnter={() => {}} onPlaceCardMouseLeave={() => {}} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
