import React from "react";
import renderer from "react-test-renderer";
import Offer from "./offer.jsx";
import {OfferType} from '../../consts.js';

it(`Render App`, () => {

  const offer = {
    id: 1,
    isPremium: true,
    cost: 120,
    isMarked: false,
    rating: 4,
    name: `Beautiful & luxurious apartment at great location`,
    type: OfferType.APARTMENT,
    image: `img/apartment-01.jpg`
  };

  const tree = renderer
    .create(<Offer offer={offer} onPlaceHeaderClick={() => {}} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
