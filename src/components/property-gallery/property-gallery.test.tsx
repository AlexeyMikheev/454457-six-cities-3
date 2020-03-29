import * as React from "react";
import {mount} from "enzyme";
import PropertyGallery from "./property-gallery";

const mocks: string[] = [
  `img/room.jpg`,
  `img/apartment-01.jpg`,
  `img/apartment-02.jpg`,
  `img/apartment-03.jpg`,
  `img/studio-01.jpg`,
  `img/apartment-01.jpg`,
];

it(`PropertyGallery snapshot`, () => {

  const div = document.createElement(`div`);
  document.body.appendChild(div);

  const propertyGalleryComponent = mount(<PropertyGallery images={mocks} />, {attachTo: div});

  expect(propertyGalleryComponent).toMatchSnapshot();
});
