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
import withBooleanState from "../../hoks/withBooleanState/with-boolean-state.jsx";
import {getCurrentOffers, getCurrentCity, getHoveredOffer, getMainPageTitle} from "../../reducer/data/selectors.js";
import Header from "../header/header.jsx";

const SortingWithState = withBooleanState(Sorting);

class Main extends PureComponent {
  constructor(props) {
    super(props);
  }

  renderContent() {
    const {offers, currentCity, hoveredOffer, mainPageTitle} = this.props;

    return (
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{mainPageTitle}</b>
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
      <React.Fragment>
        <Header />
        <div className="page page--gray page--main">
          <main className={`page__main page__main--index ${!isHasDisplayOffers ? `page__main--index-empty` : ``}`}>
            <h1 className="visually-hidden">Cities</h1>
            <Locations />
            <div className="cities">
              { isHasDisplayOffers ? this.renderContent() : this.renderEmpty()}
            </div>
          </main>
        </div>
      </React.Fragment>
    );
  }
}

Main.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape(OfferShape)),
  currentCity: PropTypes.shape(CityShape),
  hoveredOffer: PropTypes.shape(OfferShape),
  mainPageTitle: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  offers: getCurrentOffers(state),
  currentCity: getCurrentCity(state),
  hoveredOffer: getHoveredOffer(state),
  mainPageTitle: getMainPageTitle(state)
});

export {Main};
export default connect(mapStateToProps)(Main);
