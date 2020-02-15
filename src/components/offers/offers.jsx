import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Offer from '../offer/offer.jsx';
import {OfferShape} from '../../settings.js';

export default class Offers extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {value: null};

    this._placeCardMouseEnterHandler = this.placeCardMouseEnterHandler.bind(this);
    this._placeCardMouseLeaveHandler = this.placeCardMouseLeaveHandler.bind(this);
    this._placeHeaderClickHandler = this.placeHeaderClickHandler.bind(this);
  }

  placeHeaderClickHandler() {}

  placeCardMouseEnterHandler(offerId) {
    this.setState({activeOfferId: offerId});
  }

  placeCardMouseLeaveHandler(offerId) {
    this.setState({activeOfferId: offerId});
  }

  render() {
    const {offers} = this.props;
    const {onPlaceHeaderClick} = this.props;
    return (
      <div className="cities__places-list places__list tabs__content">
        {offers.map((offer) => <Offer key={offer.id} offer={offer} onPlaceHeaderClick={() => {
          onPlaceHeaderClick(offer.id);
        }} onPlaceCardMouseEnter={() => {
          this.placeCardMouseEnterHandler(offer.id);
        }} onPlaceCardMouseLeave={() => {
          this.placeCardMouseLeaveHandler(undefined);
        }} />)}
      </div>
    );
  }
}

Offers.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape(OfferShape)).isRequired,
  onPlaceHeaderClick: PropTypes.func.isRequired
};
