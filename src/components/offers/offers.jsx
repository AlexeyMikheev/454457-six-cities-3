import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Offer from '../offer/offer.jsx';
import {OfferShape} from '../../settings.js';
import {ViewMode, VIEWMODES, MAX_NEAR_DISPLAY_COUNT, FavoriteState} from '../../consts.js';
import {ActionCreator, Operation as DataOperation} from "../../reducer/data/data.js";
import {getCurrentOffers, getCurrentCity, getNearOffers} from "../../reducer/data/selectors.js";

class Offers extends PureComponent {
  constructor(props) {
    super(props);
  }

  renderMainOffer(offer, viewMode, setCurrentOffer, setHoveredOffer, setFavorite) {
    return (
      <Offer key={offer.id} offer={offer}
        onPlaceHeaderClick={
          (evt) => {
            evt.preventDefault();
            setCurrentOffer(offer.id);
            setHoveredOffer(null);
          }
        }
        onPlaceCardMouseOver={
          () => {
            setHoveredOffer(offer.id);
          }
        }
        onPlaceCardMouseLeave={
          () => {
            setHoveredOffer(null);
          }
        }
        setFavorite={() => {
          setFavorite(offer.id, offer.isMarked ? FavoriteState.UNMARKED : FavoriteState.MARKED);
        }}
        viewMode={viewMode} />
    );
  }

  renderPropertyOffer(offer, viewMode, setCurrentOffer, setFavorite) {
    return (
      <Offer key={offer.id} offer={offer}
        onPlaceHeaderClick={
          (evt) => {
            evt.preventDefault();
            setCurrentOffer(offer.id);
          }
        }
        setFavorite={() => {
          setFavorite(offer.id, offer.isMarked ? FavoriteState.UNMARKED : FavoriteState.MARKED);
        }
        }
        viewMode={viewMode} />
    );
  }

  render() {
    const {offers, nearOffers, viewMode, setCurrentOffer, setHoveredOffer, setFavorite} = this.props;

    const isMainViewMode = viewMode === ViewMode.Main;
    const displayOffers = isMainViewMode ? offers : nearOffers.slice(0, MAX_NEAR_DISPLAY_COUNT);

    return (
      <div className={`${isMainViewMode ? `cities__places-list places__list tabs__content` : `near-places__list places__list` }`}>
        {displayOffers.map((offer) => {
          switch (viewMode) {
            case ViewMode.Main:
              return this.renderMainOffer(offer, viewMode, setCurrentOffer, setHoveredOffer, setFavorite);
            case ViewMode.Property:
              return this.renderPropertyOffer(offer, viewMode, setCurrentOffer, setFavorite);
            default: return null;
          }
        })
        }
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
  setHoveredOffer: PropTypes.func.isRequired,
  setFavorite: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  offers: getCurrentOffers(state),
  nearOffers: getNearOffers(state),
  currentCity: getCurrentCity(state)
});

const mapDispatchToProps = {
  setCurrentOffer: DataOperation.setCurrentOffer,
  setHoveredOffer: ActionCreator.setHoveredOffer,
  setFavorite: DataOperation.setFavorite,
};

export {Offers};
export default connect(mapStateToProps, mapDispatchToProps)(Offers);
