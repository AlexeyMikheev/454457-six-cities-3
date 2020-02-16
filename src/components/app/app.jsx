import React from "react";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";
import {OfferType} from '../../consts.js';

const App = ({offers}) => {
  return (
    <Main offers={offers} />
  );
};

App.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    isPremium: PropTypes.bool.isRequired,
    cost: PropTypes.number.isRequired,
    isMarked: PropTypes.bool.isRequired,
    rating: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf([OfferType.APARTMENT, OfferType.PRIVATE_ROOM]).isRequired,
    image: PropTypes.string.isRequired
  })).isRequired
};


export default App;
