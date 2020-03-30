import * as React from "react";
import {connect} from "react-redux";
import Offers from "../offers/offers";
import Locations from "../locations/locations";
import Sorting from "../sorting/sorting";
import MainEmpty from "../main-empty/main-empty";
import {ViewMode} from "../../consts";
import {Offer, City} from "../../types";
import Map from "../map/map";
import withBooleanState from "../../hoks/with-boolean-state/with-boolean-state";
import {getCurrentOffers, getCurrentCity, getHoveredOffer, getMainPageTitle} from "../../reducer/data/selectors.js";
import Header from "../header/header";

interface Props{
  offers: Offer[];
  currentCity: City;
  hoveredOffer: Offer;
  mainPageTitle: string;
}

const SortingWithState = withBooleanState(Sorting);

class Main extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
  }

  renderContent() {
    const {offers, currentCity, hoveredOffer, mainPageTitle} = this.props;

    return (
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{mainPageTitle}</b>
          <SortingWithState />
          <Offers viewMode={ViewMode.Main} />
        </section>
        <div className="cities__right-section">
          <Map offers={offers} hoveredOffer={hoveredOffer} activeOffer={null} viewMode={ViewMode.Main} currentCity={currentCity}/>
        </div>
      </div>
    );
  }

  renderEmpty() {
    return (
      <MainEmpty />
    );
  }

  render() {
    const {offers} = this.props;

    const isHasDisplayOffers = offers.length > 0;

    return (
      <React.Fragment>
        <Header />
        <div className="page page--gray page--main">
          <main className={`page__main page__main--index ${!isHasDisplayOffers ? `page__main--index-empty` : ``}`}>
            <h1 className="visually-hidden">Cities</h1>
            <Locations />
            <div className="cities">
              { isHasDisplayOffers ? this.renderContent() : this.renderEmpty()}
            </div>
          </main>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  offers: getCurrentOffers(state),
  currentCity: getCurrentCity(state),
  hoveredOffer: getHoveredOffer(state),
  mainPageTitle: getMainPageTitle(state)
});

export {Main};
export default connect(mapStateToProps)(Main);
