import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ViewMode} from "../../consts.js";
import FavoritesEmpty from "../favorites-empty/favorites-empty.jsx";
import {getGroupedFavoriteOffers} from "../../reducer/data/selectors.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import Header from "../header/header.jsx";
import Offer from "../offer/offer.jsx";

const renderContent = (groupedOffers, setCurrentOffer) => {
  return (
    <React.Fragment>
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {(groupedOffers).map((groupedOffer) => {
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
                        cityOffers.map((offer) =>
                          <Offer key={offer.id} offer={offer}viewMode={ViewMode.Favorite} onHeaderClick={setCurrentOffer} />
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

const Favorites = ({groupedOffers, setCurrentOffer}) => {
  if (!groupedOffers.length) {
    return renderEmpty();
  }

  return renderContent(groupedOffers, setCurrentOffer);
};

Favorites.propTypes = {
  groupedOffers: PropTypes.arrayOf(Object),
  setCurrentOffer: PropTypes.func.isRequired
};

Favorites.defaultProps = {
  groupedOffers: []
};

const mapStateToProps = (state) => ({
  groupedOffers: getGroupedFavoriteOffers(state)
});

const mapDispatchToProps = {
  setCurrentOffer: DataOperation.setCurrentOffer
};

export {Favorites};
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
