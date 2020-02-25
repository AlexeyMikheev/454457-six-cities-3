import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {CityShapre} from "../../settings.js";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer.js";

class Locations extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {cities, currentCity, setCurrentCity} = this.props;
    return (
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city) =>
            <li key={city.id} className="locations__item" onClick={(evt) => {
              evt.preventDefault();
              setCurrentCity(city.id);
            }}>
              <a className={`locations__item-link tabs__item ${currentCity && city.id === currentCity.id ? `tabs__item--active` : ``}`} href="#" >
                <span>{city.name}</span>
              </a>
            </li>
          )}
        </ul>
      </section>
    );
  }
}

Locations.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.shape(CityShapre)),
  currentCity: PropTypes.shape(CityShapre),
  setCurrentCity: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  cities: state.cities,
  currentCity: state.currentCity
});

const mapDispatchToProps = {
  setCurrentCity: ActionCreator.setCurrentCity
};

export {Locations};
export default connect(mapStateToProps, mapDispatchToProps)(Locations);
