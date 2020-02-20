import React from "react";
import ReactDom from "react-dom";
import App from "./components/app/app.jsx";
import offers from './mocks/offers.js';
import reviewsMock from "../../mocks/reviews.js";

ReactDom.render(
    <App offers={offers} reviews={reviewsMock}/>,
    document.getElementById(`root`)
);

