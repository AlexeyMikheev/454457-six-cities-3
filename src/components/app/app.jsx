import React from "react";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";

const App = ({offersCount, places}) => {
  return (
    <Main offersCount={offersCount} places={places}/>
  );
};

App.propTypes = {
  offersCount: PropTypes.number.isRequired,
  places: PropTypes.arrayOf(PropTypes.string),
};


export default App;
