import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";
import {OfferType, FEATURES} from '../../consts';

const mock = [{
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
  }
}];

it(`Render App`, () => {

  const tree = renderer
    .create(<App offers={mock} onPlaceHeaderClick={() => {}} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
