import React from "react";
import renderer from "react-test-renderer";
import Review from "./review.jsx";

const mockDate = new Date(0).valueOf();

const mock = {
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
};

it(`Render Reviews`, () => {

  const tree = renderer
    .create(<Review review={mock} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
