import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Offers from "../offers/offers.jsx";
import Locations from "../locations/locations.jsx";
import Sorting from "../sorting/sorting.jsx";
import MainEmpty from "../main-empty/main-empty.jsx";
import {ViewMode} from "../../consts.js";
import {OfferShape, CityShape} from "../../settings.js";
import Map from "../map/map.jsx";
import withBooleanState from "../../hoks/with-boolean-state.js";

const SortingWithState = withBooleanState(Sorting);

class Main extends PureComponent {
  constructor(props) {
    super(props);
  }

  renderContent() {
    const {offers, currentCity, hoveredOffer} = this.props;

    const title = offers.length > 0 ? `${offers.length} ${offers.length > 1 ? `places` : `place`} to stay in ${currentCity ? currentCity.name : ``}` : `No places to stay available`;

    return (
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{title}</b>
          <SortingWithState />
          <Offers viewMode={ViewMode.Main} />
        </section>
        <div className="cities__right-section">
          <Map offers={offers} hoveredOffer={hoveredOffer} viewMode={ViewMode.Main} currentCity={currentCity}/>
        </div>
      </div>
    );
  }

  renderEmpty() {
    return (
      <MainEmpty />
    );
  }

  render() {
    const {offers} = this.props;

    const isHasDisplayOffers = offers.length > 0;

    return (
      <main className={`page__main page__main--index ${!isHasDisplayOffers ? `page__main--index-empty` : ``}`}>
        <h1 className="visually-hidden">Cities</h1>
        <Locations />
        <div className="cities">
          { isHasDisplayOffers ? this.renderContent() : this.renderEmpty()}
        </div>
      </main>
    );
  }
}

Main.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape(OfferShape)).isRequired,
  currentCity: PropTypes.shape(CityShape),
  hoveredOffer: PropTypes.shape(OfferShape),
};

const mapStateToProps = (state) => ({
  offers: state.currentOffers,
  currentCity: state.currentCity,
  hoveredOffer: state.hoveredOffer
});

export {Main};
export default connect(mapStateToProps)(Main);
