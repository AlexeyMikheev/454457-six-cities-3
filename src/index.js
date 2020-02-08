import React from "react";
import ReactDom from "react-dom";
import App from "./components/app/app.jsx";

const Settings = {
  OFFERS_COUNT: 17
};

const places = [`Beautiful & luxurious apartment at great location`, `Wood and stone place`, `Canal View Prinsengracht`];

ReactDom.render(
    <App offersCount={Settings.OFFERS_COUNT} places={places} />,
    document.getElementById(`root`)
);

