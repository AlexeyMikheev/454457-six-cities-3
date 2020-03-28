import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, Router} from "react-router-dom";
import history from "../../history.js";
import {connect} from "react-redux";
import Main from "../main/main.jsx";
import Login from "../login/login.jsx";
import Property from "../property/property.jsx";
import Favorites from "../favorites/favorites.jsx";
import {CityShape} from "../../settings.js";
import {getHasSelectedOffer, getCurrentCity} from "../../reducer/data/selectors.js";
import {isUserAuthorized, isUserAuthorizedLoading} from "../../reducer/user/selectors.js";
import {AppRoute} from "../../consts.js";
import PrivateRoute from "../private-route/private-route.jsx";

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {isAuthorized, isUserAuthLoading} = this.props;

    if (isUserAuthLoading) {
      return null;
    }

    return (
      <Router history={history}>
        <Switch>
          <PrivateRoute exact path={AppRoute.LOGIN} isRequire={!isAuthorized} redirectTo={AppRoute.ROOT}
            render={() => {
              return (
                <Login />
              );
            }}
          />
          <PrivateRoute exact path={AppRoute.FAVORITES} isRequire={isAuthorized} redirectTo={AppRoute.LOGIN}
            render={() => {
              return (
                <Favorites />
              );
            }}
          />
          <Route exact path={`${AppRoute.OFFER}/:offerId`} component={Property} />
          <Route exact path={AppRoute.ROOT} component={Main}/>
          <Route exact path={AppRoute.LOGIN} component={Login}/>
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  hasSelectedOffer: PropTypes.bool.isRequired,
  selectedCity: PropTypes.shape(CityShape),
  isAuthorized: PropTypes.bool.isRequired,
  isUserAuthLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  hasSelectedOffer: getHasSelectedOffer(state),
  selectedCity: getCurrentCity(state),
  isAuthorized: isUserAuthorized(state),
  isUserAuthLoading: isUserAuthorizedLoading(state)
});

export {App};
export default connect(mapStateToProps)(App);
