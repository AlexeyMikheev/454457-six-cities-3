import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {AuthStatus} from "../../consts.js";
import {BrowserRouter} from "react-router-dom";
import NameSpace from "../../reducer/name-space.js";
import Header from "./header.jsx";

const mockStore = configureStore([]);

it(`Render Header`, () => {

  const store = mockStore({[NameSpace.USER]: {
    authStatus: AuthStatus.NO_AUTH,
    authInfo: null
  }});

  const tree = renderer
      .create(
          <BrowserRouter>
            <Provider store={store}><Header /></Provider>
          </BrowserRouter>)
      .toJSON();
  expect(tree).toMatchSnapshot();
});
