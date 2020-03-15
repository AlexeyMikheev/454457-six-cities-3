import React from "react";
import {createAPI} from "../../api.js";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {AuthStatus} from "../../consts.js";
import NameSpace from "../../reducer/name-space.js";
import Login from "./login.jsx";
import thunk from "redux-thunk";
import MockAdapter from "axios-mock-adapter";
import {Url} from "../../consts.js";

Enzyme.configure({
  adapter: new Adapter(),
});

const api = createAPI(() => {});
const apiMock = new MockAdapter(api);

const mockStore = configureStore([thunk.withExtraArgument(api)]);

it(`Should login submit`, () => {

  const mockUserInfo = {
    [`avatar_url`]: `img/1.png`,
    email: `Oliver.conner@gmail.com`,
    id: 1,
    [`is_pro`]: false,
    name: `Oliver.conner`,
  };

  const mockAuthData = {
    login: mockUserInfo.email,
    password: `password`,
  };

  apiMock
  .onPost(`/${Url.LOGIN}`, mockAuthData)
  .reply(200, mockUserInfo);

  const store = mockStore({
    [NameSpace.USER]: {
      authStatus: AuthStatus.NO_AUTH,
      authInfo: null,
      authError: null
    }
  });

  const onSubmitHanler = jest.fn();
  const loginComponent = mount(<Provider store={store}><Login onSubmit={onSubmitHanler} error={`Error auth`}/></Provider>);

  const form = loginComponent.find(`form.login__form`);

  form.simulate(`submit`, {preventDefault: () => {}});
  expect(onSubmitHanler).toHaveBeenCalledTimes(1);
});
