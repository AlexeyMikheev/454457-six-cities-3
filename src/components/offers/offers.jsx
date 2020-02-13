import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Offer from '../offer/offer.jsx';
import {OfferType} from '../../consts.js';

export default class Offers extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {value: null};

    this._placeCardMouseEnterHandler = this._placeCardMouseEnterHandler.bind(this);
    this._placeCardMouseLeaveHandler = this._placeCardMouseLeaveHandler.bind(this);
    this._placeHeaderClickHandler = this._placeHeaderClickHandler.bind(this);
  }

  _placeHeaderClickHandler() {}

  _placeCardMouseEnterHandler(offer) {
    this.setState({value: offer});
  }

  _placeCardMouseLeaveHandler(offer) {
    this.setState({value: offer});
  }

  render() {
    const {offers} = this.props;
    const {onPlaceHeaderClick} = this.props;
    return (
      <div className="cities__places-list places__list tabs__content">
        {offers.map((offer) => <Offer key={offer.id} offer={offer} onPlaceHeaderClick={onPlaceHeaderClick} onPlaceCardMouseEnter={this._placeCardMouseEnterHandler} onPlaceCardMouseLeave={this._placeCardMouseLeaveHandler} />)}
      </div>
    );
  }
}

Offers.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    isPremium: PropTypes.bool.isRequired,
    cost: PropTypes.number.isRequired,
    isMarked: PropTypes.bool.isRequired,
    rating: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf([OfferType.APARTMENT, OfferType.PRIVATE_ROOM]).isRequired,
    image: PropTypes.string.isRequired
  })).isRequired,
  onPlaceHeaderClick: PropTypes.func.isRequired
};
