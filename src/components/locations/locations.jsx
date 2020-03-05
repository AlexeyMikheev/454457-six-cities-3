import React from "react";
import PropTypes from "prop-types";
import {CityShape} from "../../settings.js";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/data/data.js";
import {getCities, getCurrentCity} from "../../reducer/data/selectors.js";

const Locations = ({cities, currentCity, setCurrentCity}) => {
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((city) =>
          <li key={city.name} className="locations__item" onClick={(evt) => {
            evt.preventDefault();
            setCurrentCity(city.name);
          }}>
            <a className={`locations__item-link tabs__item ${currentCity && city.name === currentCity.name ? `tabs__item--active` : ``}`} href="#" >
              <span>{city.name}</span>
            </a>
          </li>
        )}
      </ul>
    </section>
  );
};

Locations.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.shape(CityShape)),
  currentCity: PropTypes.shape(CityShape),
  setCurrentCity: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  cities: getCities(state),
  currentCity: getCurrentCity(state)
});

const mapDispatchToProps = {
  setCurrentCity: ActionCreator.setCurrentCity
};

export {Locations};
export default connect(mapStateToProps, mapDispatchToProps)(Locations);
