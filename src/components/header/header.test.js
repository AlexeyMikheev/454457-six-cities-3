import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import Header from "./header.jsx";
import NameSpace from "../../reducer/name-space.js";
import {AuthStatus} from "../../consts.js";

const mockStore = configureStore([]);

it(`Render Header`, () => {

  const store = mockStore({[NameSpace.USER]: {
    authStatus: AuthStatus.NO_AUTH,
    authInfo: null
  }});

  const tree = renderer
      .create(<Provider store={store}><Header /></Provider>)
      .toJSON();
  expect(tree).toMatchSnapshot();
});
