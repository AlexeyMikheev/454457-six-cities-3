import * as React from "react";
import {Switch, Route, Router} from "react-router-dom";
import history from "../../history.js";
import {connect} from "react-redux";
import Main from "../main/main";
import Login from "../login/login";
import Property from "../property/property";
import Favorites from "../favorites/favorites";
import {City} from "../../types";
import {getHasSelectedOffer, getCurrentCity} from "../../reducer/data/selectors.js";
import {isUserAuthorized, isUserAuthorizedLoading} from "../../reducer/user/selectors.js";
import {AppRoute} from "../../consts";
import PrivateRoute from "../private-route/private-route";

interface Props{
  hasSelectedOffer: boolean;
  selectedCity: City;
  isAuthorized: boolean;
  isUserAuthLoading: boolean;
}

class App extends React.PureComponent<Props> {
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

const mapStateToProps = (state) => ({
  hasSelectedOffer: getHasSelectedOffer(state),
  selectedCity: getCurrentCity(state),
  isAuthorized: isUserAuthorized(state),
  isUserAuthLoading: isUserAuthorizedLoading(state)
});

export {App};
export default connect(mapStateToProps)(App);
