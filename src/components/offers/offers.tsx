import * as React from "react";
import {connect} from "react-redux";
import Offer from '../offer/offer';
import {Offer as OfferObjectType, OfferChangeFunction, OfferHoveredChangeFunction} from '../../types';
import {ViewMode, MAX_NEAR_DISPLAY_COUNT} from '../../consts';
import {ActionCreator, Operation as DataOperation} from "../../reducer/data/data.js";
import {getCurrentOffers, getCurrentCity, getNearOffers} from "../../reducer/data/selectors.js";

interface Props{
  offers: OfferObjectType[];
  nearOffers: OfferObjectType[];
  setCurrentOffer: OfferChangeFunction;
  setHoveredOffer: OfferHoveredChangeFunction;
  viewMode: ViewMode;
}

class Offers extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
  }

  renderMainOffer(offer, viewMode) {
    const {setCurrentOffer, setHoveredOffer} = this.props;

    return (
      <Offer key={offer.id} offer={offer}
        onHeaderClick={setCurrentOffer}
        onHoveredChange={setHoveredOffer}
        viewMode={viewMode} />
    );
  }

  renderPropertyOffer(offer, viewMode) {
    const {setCurrentOffer} = this.props;
    return (
      <Offer key={offer.id} offer={offer}
        onHeaderClick={setCurrentOffer} onHoveredChange={null}
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
