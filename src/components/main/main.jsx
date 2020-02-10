import React from "react";
import PropTypes from "prop-types";
import Place from '../place/place.jsx';

const placeHeaderHandler = () => {};

const Main = ({offersCount, places}) => {
  return (
    <div className="page page--gray page--main">
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offersCount} places to stay in Amsterdam</b>
              <div className="cities__places-list places__list tabs__content">
                {places.map((it, i) => <Place key={it + i} name={it} onPlaceHeaderClick={placeHeaderHandler} />)}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

Main.propTypes = {
  offersCount: PropTypes.number.isRequired,
  places: PropTypes.arrayOf(PropTypes.string)
};

export default Main;
