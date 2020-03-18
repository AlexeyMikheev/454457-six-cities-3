import React from "react";
import renderer from "react-test-renderer";
import Reviews from "./reviews.jsx";

const mockDate = new Date(0).valueOf();

const mocks = [
  {
    comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    date: mockDate,
    id: 1,
    rating: 4,
    user: {
      avatar: `img/1.png`,
      id: 4,
      isTrust: false,
      name: `Max`
    }
  },
  {
    comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    date: mockDate,
    id: 2,
    rating: 4,
    user: {
      avatar: `img/1.png`,
      id: 4,
      isTrust: false,
      name: `Max`
    }
  },
  {
    comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    date: mockDate,
    id: 3,
    rating: 4,
    user: {
      avatar: `img/1.png`,
      id: 4,
      isTrust: false,
      name: `Max`
    }
  }
];

it(`Render Offer`, () => {

  const tree = renderer
    .create(<Reviews reviews={mocks} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
