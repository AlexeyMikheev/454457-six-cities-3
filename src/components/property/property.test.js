import React from "react";
import renderer from "react-test-renderer";
import Property from "./property.jsx";
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
  features: FEATURES,
  owner: {
    name: `Angelina`,
    avatar: `img/avatar-angelina.jpg`,
    description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
    isTrust: true
  }
};

const reviewsMock = [
  {
    id: 1,
    name: `Max`,
    avatar: `img/avatar-max.jpg`,
    rating: 4.5,
    description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    date: new Date().valueOf()
  },
  {
    id: 2,
    name: `Nina`,
    avatar: `img/avatar-max.jpg`,
    rating: 0,
    description: `The building is green and from 18th century.`,
    date: new Date().valueOf()
  },
  {
    id: 3,
    name: `Andre`,
    avatar: `img/avatar-max.jpg`,
    rating: 3.5,
    description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
    date: new Date().valueOf()
  }];

const nearOffersMock = [
  {
    id: 1,
    isPremium: true,
    cost: 120,
    isMarked: false,
    rating: 2,
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
      `img/apartment-01.jpg`,
      `img/apartment-01.jpg`,
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
  },
  {
    id: 2,
    isPremium: false,
    cost: 80,
    isMarked: true,
    rating: 3,
    name: `Wood and stone place`,
    type: OfferType.ROOM,
    image: `img/room.jpg`,
    roomsCount: 2,
    membersCount: 1,
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
      name: `Angelina 1`,
      avatar: `img/avatar-angelina.jpg`,
      description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
      isTrust: true
    },
    lonlat: [52.369553943508, 4.85309666406198]
  },
  {
    id: 3,
    isPremium: false,
    cost: 132,
    isMarked: false,
    rating: 4.1,
    name: `iCanal View Prinsengracht`,
    type: OfferType.HOTEL,
    image: `img/apartment-02.jpg`,
    roomsCount: 4,
    membersCount: 5,
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
      name: `Angelina 2`,
      avatar: `img/avatar-angelina.jpg`,
      description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
      isTrust: true
    },
    lonlat: [52.3909553943508, 4.929309666406198]
  },
  {
    id: 4,
    isPremium: true,
    cost: 180,
    isMarked: false,
    rating: 5.1,
    name: `Nice, cozy, warm big bed apartment`,
    type: OfferType.HOUSE,
    image: `img/apartment-03.jpg`,
    roomsCount: 4,
    membersCount: 5,
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
      name: `Angelina 3`,
      avatar: `img/avatar-angelina.jpg`,
      description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
      isTrust: true
    },
    lonlat: [52.3809553943508, 4.939309666406198]
  }
];

it(`Render App`, () => {

  const tree = renderer.create(<Property offer={mock} reviews={reviewsMock} nearOffers={nearOffersMock} onPlaceHeaderClick={() => { }} />).toJSON();

  expect(tree).toMatchSnapshot();
});