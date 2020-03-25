import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {FavoriteState, ViewMode} from "../../consts.js";
import FavoritesEmpty from "../favorites-empty/favorites-empty.jsx";
import {getGroupedFavoriteOffers} from "../../reducer/data/selectors.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import Header from "../header/header.jsx";
import Offer from "../offer/offer.jsx";

const renderContent = (groupedOffers, setCurrentOffer, setFavorite) => {
  return (
    <React.Fragment>
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            {(groupedOffers).map((groupedOffer) => {
              const cityName = groupedOffer[0];
              const cityOffers = groupedOffer[1];
              return (
                <ul key={cityName} className="favorites__list">
                  <li className="favorites__locations-items">
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
                          <Offer key={offer.id} offer={offer}
                            onPlaceHeaderClick={
                              (evt) => {
                                evt.preventDefault();
                                setCurrentOffer(offer.id);
                              }
                            }
                            setFavorite={
                              () => {
                                setFavorite(offer.id, offer.isMarked ? FavoriteState.UNMARKED : FavoriteState.MARKED);
                              }
                            }
                            viewMode={ViewMode.Favorite}
                          />
                        )
                      }
                    </div>
                  </li>
                </ul>
              );
            })}
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
  debugger;
  if (!groupedOffers.length) {
    return renderEmpty();
  }

  return renderContent(groupedOffers, setCurrentOffer);
};

Favorites.propTypes = {
  groupedOffers: PropTypes.arrayOf(Object),
  setCurrentOffer: PropTypes.func.isRequired,
  setFavorite: PropTypes.func.isRequired
};

Favorites.defaultProps = {
  groupedOffers: []
};

const mapStateToProps = (state) => ({
  groupedOffers: getGroupedFavoriteOffers(state)
});

const mapDispatchToProps = {
  setCurrentOffer: DataOperation.setCurrentOffer,
  setFavorite: DataOperation.setFavorite,
};

export {Favorites};
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
