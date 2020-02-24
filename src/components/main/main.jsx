import React from "react";
import PropTypes from "prop-types";
import Offers from "../offers/offers.jsx";
import Locations from "../locations/locations.jsx";
import Sorting from "../sorting/sorting.jsx";
import {ViewMode} from "../../consts.js";
import {OfferShape, CityShapre} from "../../settings.js";
import Map from "../map/map.jsx";

const Main = ({offers, cities, currentCity, onCityClick, onPlaceHeaderClick}) => {

  const title = offers.length > 0 ? `${offers.length} ${offers.length > 1 ? `places` : `place`} to stay in ${currentCity ? currentCity.name : ``}` : `No places to stay available`;

  return (
    <div className="page page--gray page--main">
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <Locations cities={cities} activeCity={currentCity} onCityClick={onCityClick} />
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{title}</b>
              <Sorting />
              <Offers offers={offers} viewMode={ViewMode.Main} onPlaceHeaderClick={onPlaceHeaderClick} />
            </section>
            <div className="cities__right-section">
              <Map offers={offers} viewMode={ViewMode.Main} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

Main.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape(OfferShape)).isRequired,
  cities: PropTypes.arrayOf(PropTypes.shape(CityShapre)).isRequired,
  currentCity: PropTypes.shape(CityShapre),
  onCityClick: PropTypes.func.isRequired,
  onPlaceHeaderClick: PropTypes.func.isRequired
};

export default Main;
