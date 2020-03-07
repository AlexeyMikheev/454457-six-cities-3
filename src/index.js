import React from "react";
import ReactDom from "react-dom";
import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import App from "./components/app/app.jsx";
import reducer from "./reducer/reducer.js";
import {Operation} from "./reducer/data/data.js";
import {createAPI} from "./api.js";

const api = createAPI(() => {});

const store = createStore(
    reducer,
    applyMiddleware(thunk.withExtraArgument(api))
);

store.dispatch(Operation.loadData());

ReactDom.render(
    <Provider store={store}>
      <App />
    </Provider>
    , document.getElementById(`root`)
);

