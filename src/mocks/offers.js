import {OfferType} from '../consts.js';

export default [
  {
    id: 1,
    isPremium: true,
    cost: 120,
    isMarked: false,
    rating: 20,
    name: `Beautiful & luxurious apartment at great location`,
    type: OfferType.APARTMENT,
    image: `img/apartment-01.jpg`
  },
  {
    id: 2,
    isPremium: false,
    cost: 80,
    isMarked: true,
    rating: 30,
    name: `Wood and stone place`,
    type: OfferType.PRIVATE_ROOM,
    image: `img/room.jpg`
  },
  {
    id: 3,
    isPremium: false,
    cost: 132,
    isMarked: false,
    rating: 40,
    name: `iCanal View Prinsengracht`,
    type: OfferType.APARTMENT,
    image: `img/apartment-02.jpg`
  },
  {
    id: 4,
    isPremium: true,
    cost: 180,
    isMarked: false,
    rating: 50,
    name: `Nice, cozy, warm big bed apartment`,
    type: OfferType.APARTMENT,
    image: `img/apartment-03.jpg`
  },
  {
    id: 5,
    isPremium: false,
    cost: 80,
    isMarked: true,
    rating: 60,
    name: `Wood and stone place`,
    type: OfferType.PRIVATE_ROOM,
    image: `img/room.jpg`
  },
];

