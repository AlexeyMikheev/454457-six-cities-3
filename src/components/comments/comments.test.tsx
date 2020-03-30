import * as React from "react";
import {mount} from "enzyme";
import Comments from "./comments";
import {Review} from '../../types';

const mockDate: number = new Date(0).valueOf();

const mocksReviews: Review[] = [
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

it(`Comments snapshot`, () => {
  const div = document.createElement(`div`);
  document.body.appendChild(div);

  const commentsComponent = mount(<Comments reviews={mocksReviews} />, {attachTo: div});

  expect(commentsComponent.getDOMNode()).toMatchSnapshot();
});
