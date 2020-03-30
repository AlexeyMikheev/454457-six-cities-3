import * as React from "react";
import {City} from "../../types";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/data/data.js";
import {getCities, getCurrentCity} from "../../reducer/data/selectors.js";

interface Props{
  cities: City[];
  currentCity: City;
  setCurrentCity: (cityName: string) => void;
}

const Locations: React.FC<Props> = ({cities, currentCity, setCurrentCity}) => {
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

const mapStateToProps = (state) => ({
  cities: getCities(state),
  currentCity: getCurrentCity(state)
});

const mapDispatchToProps = {
  setCurrentCity: ActionCreator.setCurrentCity
};

export {Locations};
export default connect(mapStateToProps, mapDispatchToProps)(Locations);
