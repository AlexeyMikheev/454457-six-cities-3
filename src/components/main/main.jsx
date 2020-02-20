import React from "react";
import PropTypes from "prop-types";
import Offers from "../offers/offers.jsx";
import {ViewMode} from "../../consts.js";
import {OfferShape} from "../../settings.js";
import Map from "../map/map.jsx";

const Main = ({offers, onPlaceHeaderClick}) => {
  return (
    <div className="page page--gray page--main">
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in Amsterdam</b>
              <Offers offers={offers} onPlaceHeaderClick={onPlaceHeaderClick} />
            </section>
            <div className="cities__right-section">
              <Map offers={offers} viewMode={ViewMode.Near} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

Main.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape(OfferShape)).isRequired,
  onPlaceHeaderClick: PropTypes.func.isRequired
};

export default Main;
