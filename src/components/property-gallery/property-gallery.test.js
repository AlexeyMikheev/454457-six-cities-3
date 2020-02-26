import React from "react";
import renderer from "react-test-renderer";
import PropertyGallery from "./property-gallery.jsx";

const mocks = [
  `img/room.jpg`,
  `img/apartment-01.jpg`,
  `img/apartment-02.jpg`,
  `img/apartment-03.jpg`,
  `img/studio-01.jpg`,
  `img/apartment-01.jpg`,
];

it(`Render PropertyGallery`, () => {

  const tree = renderer.create(<PropertyGallery images={mocks} />).toJSON();

  expect(tree).toMatchSnapshot();
});
