import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import FavoritesEmpty from "../favorites-empty/favorites-empty.jsx";
import {OfferShape} from "../../settings.js";
import {getGroupedFavoriteOffers} from "../../reducer/data/selectors.js";
import {Operation as FavoriteOperation} from "../../reducer/data/data.js";
import Header from "../header/header.jsx";
import FavoriteOffer from "../favorite-offer/favorite-offer.jsx";

class Favorites extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {loadFavorits} = this.props;

    loadFavorits();
  }

  renderContent(groupedOffers) {
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
                        {cityOffers.map((offer) => <FavoriteOffer key={offer.id} offer={offer} />)}
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
  }

  renderEmpty() {
    return (
      <FavoritesEmpty />
    );
  }

  render() {
    const {groupedOffers} = this.props;

    if (!groupedOffers.length) {
      return this.renderEmpty();
    }

    return this.renderContent(groupedOffers);
  }
}

Favorites.propTypes = {
  groupedOffers: PropTypes.arrayOf(PropTypes.shape(OfferShape)),
  loadFavorits: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  groupedOffers: getGroupedFavoriteOffers(state),
});

const mapDispatchToProps = {
  loadFavorits: FavoriteOperation.loadFavorits,
};

export {Favorites};
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
