import * as React from "react";
import {mount} from "enzyme";
import MainEmpty from "./main-empty";

it(`MainEmpty snapshot`, () => {

  const div = document.createElement(`div`);
  document.body.appendChild(div);

  const mainEmptyComponent = mount(<MainEmpty />, {attachTo: div});

  expect(mainEmptyComponent.getDOMNode()).toMatchSnapshot();
});
