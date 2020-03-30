import * as React from "react";
import {connect} from "react-redux";
import {ViewMode} from "../../consts";
import FavoritesEmpty from "../favorites-empty/favorites-empty";
import {getGroupedFavoriteOffers} from "../../reducer/data/selectors.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import Header from "../header/header";
import Offer from "../offer/offer";
import {Offer as OfferObjectType, OfferChangeFunction} from "../../types";

interface Props{
  groupedOffers: Array<[string, OfferObjectType[]]>;
  setCurrentOffer: OfferChangeFunction;
}

const renderContent = (groupedOffers, setCurrentOffer) => {
  return (
    <React.Fragment>
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {groupedOffers.map((groupedOffer: [string, OfferObjectType[]]) => {
                const cityName = groupedOffer[0];
                const cityOffers = groupedOffer[1];
                return (
                  <li key={cityName} className="favorites__locations-items">
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="#">
                          <span>{cityName}</span>
                        </a>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {
                        cityOffers.map((offer: OfferObjectType) =>
                          <Offer key={offer.id} offer={offer}viewMode={ViewMode.Favorite} onHeaderClick={setCurrentOffer} onHoveredChange={null} />
                        )
                      }
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </main>
    </React.Fragment>
  );
};

const renderEmpty = () => {
  return (
    <FavoritesEmpty />
  );
};

const Favorites: React.FC<Props> = ({groupedOffers = [], setCurrentOffer}) => {
  if (!groupedOffers.length) {
    return renderEmpty();
  }

  return renderContent(groupedOffers, setCurrentOffer);
};

const mapStateToProps = (state) => ({
  groupedOffers: getGroupedFavoriteOffers(state)
});

const mapDispatchToProps = {
  setCurrentOffer: DataOperation.setCurrentOffer
};

export {Favorites};
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
