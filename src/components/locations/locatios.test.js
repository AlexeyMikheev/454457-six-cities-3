import React from "react";
import renderer from "react-test-renderer";
import Locations from "./locations.jsx";

const mocks = [
  {
    id: 1,
    name: `Paris`
  },
  {
    id: 2,
    name: `Cologne`
  },
  {
    id: 3,
    name: `Brussels`
  },
  {
    id: 4,
    name: `Amsterdam`
  },
  {
    id: 5,
    name: `Hamburg`
  },
  {
    id: 6,
    name: `Dusseldorf`
  },
];

const mock = {
  id: 1,
  name: `Paris`
};

it(`Render Offer`, () => {

  const tree = renderer
    .create(<Locations cities={mocks} activeCity={mock} onCityClick={() => {}} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
