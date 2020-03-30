import * as React from "react";
import {mount} from "enzyme";
import Comment from "./comment";
import {Review} from '../../types';

const mockDate: number = new Date(0).valueOf();

const mockComment: Review = {
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

it(`Comments snapshot`, () => {

  const div = document.createElement(`div`);
  document.body.appendChild(div);

  const reviewComponent = mount(<Comment review={mockComment} />, {attachTo: div});

  expect(reviewComponent.getDOMNode()).toMatchSnapshot();
});
