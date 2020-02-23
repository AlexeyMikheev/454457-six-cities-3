import React from "react";
import renderer from "react-test-renderer";
import Reviews from "./reviews.jsx";

const mocks = [
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

it(`Render Offer`, () => {

  const tree = renderer
    .create(<Reviews reviews={mocks} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
