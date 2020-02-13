import React from "react";
import renderer from "react-test-renderer";
import OfferDetail from "./offer-detail.jsx";
import {OfferType, FEATURES} from '../../consts.js';

const mock = {
  id: 1,
  isPremium: true,
  cost: 120,
  isMarked: false,
  rating: 20,
  name: `Beautiful & luxurious apartment at great location`,
  type: OfferType.APARTMENT,
  image: `img/apartment-01.jpg`,
  roomsCount: 3,
  membersCount: 4,
  images: [
    `img/room.jpg`,
    `img/apartment-01.jpg`,
    `img/apartment-02.jpg`,
    `img/apartment-03.jpg`,
    `img/studio-01.jpg`,
    `img/apartment-01.jpg`,
  ],
  features: FEATURES
};

it(`Render App`, () => {

  const tree = renderer
    .create(<OfferDetail offer={mock} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});