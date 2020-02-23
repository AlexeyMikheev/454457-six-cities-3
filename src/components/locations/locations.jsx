import React from "react";
import PropTypes from "prop-types";
import {CityShapre} from "../../settings.js";


const Locations = ({cities, activeCity, onCityClick}) => {

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((city) =>
          <li key={city.id} className="locations__item">
            <a className={`locations__item-link tabs__item ${activeCity && city.id === activeCity.id ? `tabs__item--active` : ``}`} href="#" onClick={(evt) => {
              evt.preventDefault();
              onCityClick(city.id);
            }}>
              <span>{city.name}</span>
            </a>
          </li>
        )}
      </ul>
    </section>
  );
};

Locations.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.shape(CityShapre)),
  activeCity: PropTypes.shape(CityShapre),
  onCityClick: PropTypes.func.isRequired
};

export default Locations;
