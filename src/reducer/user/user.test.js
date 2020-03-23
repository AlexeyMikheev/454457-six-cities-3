import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api.js";
import {reducer, Operation, ActionCreator, ActionType} from "./user.js";
import {AuthStatus, Url} from "../../consts";

const api = createAPI(() => { });

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

const authError = `auth arror`;

it(`Reducer user initial state`, () => {
  expect(reducer(undefined, {})).toEqual({
    authStatus: AuthStatus.NO_AUTH,
    authInfo: null,
    authError: null
  });
});


it(`Reducer user SET_AUTH_STATUS`, () => {
  expect(reducer({
    authStatus: AuthStatus.NO_AUTH,
    authInfo: null,
    authError: null
  }, ActionCreator.setAuthStatus(AuthStatus.AUTH))).toEqual({
    authStatus: AuthStatus.AUTH,
    authInfo: null,
    authError: null
  });
});

it(`Reducer user SET_AUTH`, () => {
  expect(reducer({
    authStatus: AuthStatus.NO_AUTH,
    authInfo: null,
    authError: null
  }, ActionCreator.setAuthInfo(mockUserInfo))).toEqual({
    authStatus: AuthStatus.AUTH,
    authInfo: mockUserInfo,
    authError: null
  });
});

it(`Reducer user SET_AUTH_ERROR`, () => {
  expect(reducer({
    authStatus: AuthStatus.NO_AUTH,
    authInfo: null,
    authError: null
  }, ActionCreator.setAuthError(authError))).toEqual({
    authStatus: AuthStatus.NO_AUTH,
    authInfo: null,
    authError
  });
});

describe(`Reducer user Operation.checkAuth`, () => {
  it(`Should make a correct API`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const loader = Operation.checkAuth();

    apiMock
      .onGet(`/${Url.LOGIN}`)
      .reply(200, mockAuthData);

    return loader(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_AUTH,
          payload: mockAuthData
        });
      });
  });
});

describe(`Reducer user Operation.login`, () => {
  it(`Should make a correct API`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const loader = Operation.login(mockAuthData);

    apiMock
      .onPost(`/${Url.LOGIN}`, {
        email: mockAuthData.login,
        password: mockAuthData.password
      })
      .reply(200, mockUserInfo);

    return loader(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_AUTH,
          payload: mockUserInfo
        });
      });
  });
});
