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

    this.headerClickHandler = this.headerClickHandler.bind(this);
    this.hoveredHandler = this.hoveredHandler.bind(this);
  }

  headerClickHandler(offerId) {
    const {setCurrentOffer, setHoveredOffer} = this.props;

    setCurrentOffer(offerId);
    setHoveredOffer(null);
  }

  hoveredHandler(offerId) {
    const {setHoveredOffer} = this.props;
    setHoveredOffer(offerId);
  }

  renderMainOffer(offer, viewMode) {
    return (
      <Offer key={offer.id} offer={offer}
        onHeaderClick={this.headerClickHandler}
        onHoveredChange={this.hoveredHandler}
        viewMode={viewMode} />
    );
  }

  renderPropertyOffer(offer, viewMode) {
    return (
      <Offer key={offer.id} offer={offer}
        onHeaderClick={this.headerClickHandler}
        viewMode={viewMode} />
    );
  }

  render() {
    const {offers, nearOffers, viewMode} = this.props;

    const isMainViewMode = viewMode === ViewMode.Main;
    const displayOffers = isMainViewMode ? offers : nearOffers.slice(0, MAX_NEAR_DISPLAY_COUNT);

    return (
      <div className={`${isMainViewMode ? `cities__places-list places__list tabs__content` : `near-places__list places__list` }`}>
        {displayOffers.map((offer) => {
          switch (viewMode) {
            case ViewMode.Main:
              return this.renderMainOffer(offer, viewMode);
            case ViewMode.Property:
              return this.renderPropertyOffer(offer, viewMode);
            default: return null;
          }
        })}
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
  setHoveredOffer: ActionCreator.setHoveredOffer,
};

export {Offers};
export default connect(mapStateToProps, mapDispatchToProps)(Offers);
