import React from "react";
import renderer from "react-test-renderer";
import Offer from "./offer.jsx";
import {OfferType, FEATURES} from '../../consts.js';

const mock = {
  id: 1,
  isPremium: true,
  cost: 120,
  isMarked: false,
  rating: 4,
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
  features: FEATURES,
  owner: {
    name: `Angelina`,
    avatar: `img/avatar-angelina.jpg`,
    description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
    isTrust: true
  },
  lonlat: [52.3909553943508, 4.85309666406198]
};

it(`Render Offer`, () => {

  const tree = renderer
    .create(<Offer offer={mock} onPlaceHeaderClick={() => {}} onPlaceCardMouseEnter={() => {}} onPlaceCardMouseLeave={() => {}} isNearViewMode={false}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
