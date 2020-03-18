import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import Main from "../main/main.jsx";
import Login from "../login/login.jsx";
import Property from "../property/property.jsx";
import Favorites from "../favorites/favorites.jsx";
import {CityShape} from "../../settings.js";
import {getHasSelectedOffer, getCurrentCity} from "../../reducer/data/selectors.js";
import {isUserAuthorized} from "../../reducer/user/selectors.js";
import {AppRoute} from "../../consts.js";
import PrivateRoute from "../private-route/private-route.jsx";

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {isAuthorized} = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path={`${AppRoute.OFFER}/:offerId`} component={Property} />
          <Route exact path={AppRoute.LOGIN} render={
            () => {
              return isAuthorized ? <Redirect to={AppRoute.ROOT} /> : <Login />;
            }
          }/>
          <PrivateRoute
            exact
            isAuthorized={isAuthorized}
            path={`${AppRoute.FAVORITES}`}
            render={() => {
              return (
                <Favorites />
              );
            }}
          />
          <Route exact path={AppRoute.ROOT}>
            <Main />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  hasSelectedOffer: PropTypes.bool.isRequired,
  selectedCity: PropTypes.shape(CityShape),
  isAuthorized: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  hasSelectedOffer: getHasSelectedOffer(state),
  selectedCity: getCurrentCity(state),
  isAuthorized: isUserAuthorized(state),
});

export {App};
export default connect(mapStateToProps)(App);
