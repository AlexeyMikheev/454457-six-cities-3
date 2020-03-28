import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Review from "./review.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

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

  const div = document.createElement(`div`);
  document.body.appendChild(div);

  const reviewComponent = mount(<Review review={mock} />, {attachTo: div});

  expect(reviewComponent.getDOMNode()).toMatchSnapshot();
});
