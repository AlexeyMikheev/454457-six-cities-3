import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Offers from "../offers/offers.jsx";
import Locations from "../locations/locations.jsx";
import Sorting from "../sorting/sorting.jsx";
import {ViewMode} from "../../consts.js";
import {OfferShape, CityShapre} from "../../settings.js";
import Map from "../map/map.jsx";

class Main extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {offers, currentCity, hoveredOffer} = this.props;

    const title = offers.length > 0 ? `${offers.length} ${offers.length > 1 ? `places` : `place`} to stay in ${currentCity ? currentCity.name : ``}` : `No places to stay available`;

    return (
      <div className="page page--gray page--main">
        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <Locations />
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{title}</b>
                <Sorting />
                <Offers viewMode={ViewMode.Main} />
              </section>
              <div className="cities__right-section">
                <Map offers={offers} hoveredOffer={hoveredOffer} viewMode={ViewMode.Main} />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

Main.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape(OfferShape)).isRequired,
  currentCity: PropTypes.shape(CityShapre),
  hoveredOffer: PropTypes.shape(OfferShape),
};

const mapStateToProps = (state) => ({
  offers: state.currentOffers,
  currentCity: state.currentCity,
  hoveredOffer: state.hoveredOffer
});

export {Main};
export default connect(mapStateToProps)(Main);
