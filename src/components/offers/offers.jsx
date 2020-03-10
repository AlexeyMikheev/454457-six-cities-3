import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Offer from '../offer/offer.jsx';
import {OfferShape} from '../../settings.js';
import {ViewMode, VIEWMODES, MAX_NEAR_DISPLAY_COUNT} from '../../consts.js';
import {ActionCreator, Operation as DataOperation} from "../../reducer/data/data.js";
import {getCurrentOffers, getCurrentCity, getNearOffers} from "../../reducer/data/selectors.js";

class Offers extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {offers, nearOffers, viewMode, setCurrentOffer, setHoveredOffer} = this.props;

    const isNearViewMode = viewMode === ViewMode.Property;

    const displayOffers = isNearViewMode ? nearOffers.slice(0, MAX_NEAR_DISPLAY_COUNT) : offers;

    return (
      <div className={`${isNearViewMode ? `near-places__list places__list` : `cities__places-list places__list tabs__content` }`}>
        {displayOffers.map((offer) => <Offer key={offer.id} offer={offer} onPlaceHeaderClick={(evt) => {
          evt.preventDefault();
          setCurrentOffer(offer.id);
        }} onPlaceCardMouseOver={() => {
          setHoveredOffer(offer.id);
        }} onPlaceCardMouseLeave={() => {
          setHoveredOffer(null);
        }} isNearViewMode={isNearViewMode} />)}
      </div>
    );
  }
}

Offers.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape(OfferShape)).isRequired,
  viewMode: PropTypes.oneOf(VIEWMODES)
};

Offers.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape(OfferShape)),
  nearOffers: PropTypes.arrayOf(PropTypes.shape(OfferShape)),
  setCurrentOffer: PropTypes.func.isRequired,
  setHoveredOffer: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  offers: getCurrentOffers(state),
  nearOffers: getNearOffers(state),
  currentCity: getCurrentCity(state)
});

const mapDispatchToProps = {
  setCurrentOffer: DataOperation.setCurrentOffer,
  setHoveredOffer: ActionCreator.setHoveredOffer
};

export {Offers};
export default connect(mapStateToProps, mapDispatchToProps)(Offers);
