import React from "react";
import ReactDom from "react-dom";
import App from "./components/app/app.jsx";
import {Settings, places} from './utils.js';

ReactDom.render(
    <App offersCount={Settings.OFFERS_COUNT} places={places} />,
    document.getElementById(`root`)
);

