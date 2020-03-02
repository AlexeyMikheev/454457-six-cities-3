import React from "react";
import renderer from "react-test-renderer";
import Review from "./review.jsx";

const mockDate = new Date(0);

const mock = {
  id: 1,
  name: `Max`,
  avatar: `img/avatar-max.jpg`,
  rating: 4.5,
  description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
  date: mockDate
};

it(`Render Reviews`, () => {

  const tree = renderer
    .create(<Review review={mock} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
