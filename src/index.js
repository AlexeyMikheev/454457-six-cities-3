import React from "react";
import ReactDom from "react-dom";
import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import App from "./components/app/app.jsx";
import reducer from "./reducer/reducer.js";
import {Operation} from "./reducer/data/data.js";
import {Operation as UserOperation} from "./reducer/user/user.js";
import {createAPI} from "./api.js";

const api = createAPI();

const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
    )
);

store.dispatch(Operation.loadData());

store.dispatch(UserOperation.checkAuth());

ReactDom.render(
    <Provider store={store}>
      <App />
    </Provider>
    , document.getElementById(`root`)
);

