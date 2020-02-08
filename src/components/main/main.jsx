import React from "react";

const Main = (props) => {
  // eslint-disable-next-line react/prop-types
  const {offersCount} = props;
  return (
    <div className="page page--gray page--main">
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offersCount} places to stay in Amsterdam</b>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Main;
