import React from "react";
import Header from "../header/header.jsx";

const FavoritesEmpty = () => {
  return (
    <React.Fragment>
      <Header />
      <main className="page__main page__main--favorites page__main--favorites-empty">
        <div className="page__favorites-container container">
          <section className="favorites favorites--empty">
            <h1 className="visually-hidden">Favorites (empty)</h1>
            <div className="favorites__status-wrapper">
              <b className="favorites__status">Nothing yet saved.</b>
              <p className="favorites__status-description">Save properties to narrow down search or plan yor future trips.</p>
            </div>
          </section>
        </div>
      </main>
    </React.Fragment>
  );
};

export default React.memo(FavoritesEmpty);