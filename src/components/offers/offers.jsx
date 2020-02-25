import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Offer from '../offer/offer.jsx';
import {OfferShape} from '../../settings.js';
import {ViewMode, VIEWMODES, MAX_NEAR_DISPLAY_COUNT} from '../../consts.js';
import {ActionCreator} from "../../reducer.js";

class Offers extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {value: null};

    this._placeCardMouseEnterHandler = this.placeCardMouseEnterHandler.bind(this);
    this._placeCardMouseLeaveHandler = this.placeCardMouseLeaveHandler.bind(this);
  }

  placeCardMouseEnterHandler(offerId) {
    // this.setState({activeOfferId: offerId});
  }

  placeCardMouseLeaveHandler(offerId) {
    // this.setState({activeOfferId: offerId});
  }

  render() {
    const {offers, nearOffers, viewMode, setCurrentOffer} = this.props;

    const isNearViewMode = viewMode === ViewMode.Property;

    const displayOffers = isNearViewMode ? nearOffers.slice(0, MAX_NEAR_DISPLAY_COUNT) : offers;

    return (
      <div className={`${isNearViewMode ? `near-places__list places__list` : `cities__places-list places__list tabs__content` }`}>
        {displayOffers.map((offer) => <Offer key={offer.id} offer={offer} onPlaceHeaderClick={(evt) => {
          evt.preventDefault();
          setCurrentOffer(offer.id);
        }} onPlaceCardMouseEnter={() => {
          this.placeCardMouseEnterHandler(offer.id);
        }} onPlaceCardMouseLeave={() => {
          this.placeCardMouseLeaveHandler(undefined);
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
  setCurrentOffer: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  offers: state.currentOffers,
  nearOffers: state.nearOffers,
  currentCity: state.currentCity
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentOffer(offerId) {
    dispatch(ActionCreator.setCurrentOffer(offerId));
  }
});

export {Offers};
export default connect(mapStateToProps, mapDispatchToProps)(Offers);
