import React from "react";
import ReactDom from "react-dom";
import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import {AuthStatus} from "./consts";
import App from "./components/app/app.jsx";
import reducer from "./reducer/reducer.js";
import {Operation} from "./reducer/data/data.js";
import {Operation as UserOperation, ActionCreator} from "./reducer/user/user.js";
import {createAPI} from "./api.js";

const onUnauthorized = () => {
  store.dispatch(ActionCreator.checkAuth(AuthStatus.NO_AUTH));
};

const api = createAPI(onUnauthorized);

const store = createStore(
    reducer,
    applyMiddleware(thunk.withExtraArgument(api))
);

store.dispatch(Operation.loadData());

store.dispatch(UserOperation.checkAuth());

ReactDom.render(
    <Provider store={store}>
      <App />
    </Provider>
    , document.getElementById(`root`)
);

