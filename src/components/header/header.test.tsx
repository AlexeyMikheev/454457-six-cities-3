import * as React from "react";
import {mount} from "enzyme";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {AuthStatus} from "../../consts";
import {UserInfo} from "../../types";
import {BrowserRouter} from "react-router-dom";
import NameSpace from "../../reducer/name-space.js";
import Header from "./header";

const mockStore = configureStore([]);

const mockUserInfo: UserInfo = {
  [`avatar_url`]: `img/1.png`,
  email: `Oliver.conner@gmail.com`,
  id: 1,
  [`is_pro`]: false,
  name: `Oliver.conner`,
};


it(`Header snapshot (AuthStatus.NO_AUTH)`, () => {

  const store = mockStore({[NameSpace.USER]: {
    authStatus: AuthStatus.NO_AUTH,
    authInfo: null
  }});

  const div = document.createElement(`div`);
  document.body.appendChild(div);

  const headerComponent = mount(<BrowserRouter><Provider store={store}><Header /></Provider></BrowserRouter>, {attachTo: div});

  expect(headerComponent).toMatchSnapshot();
});

it(`Header snapshot (AuthStatus.AUTH)`, () => {

  const store = mockStore({[NameSpace.USER]: {
    authStatus: AuthStatus.AUTH,
    authInfo: mockUserInfo
  }});

  const div = document.createElement(`div`);
  document.body.appendChild(div);

  const headerComponent = mount(<BrowserRouter><Provider store={store}><Header /></Provider></BrowserRouter>, {attachTo: div});

  expect(headerComponent).toMatchSnapshot();
});
