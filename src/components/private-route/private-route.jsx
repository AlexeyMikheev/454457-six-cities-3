import React from "react";
import PropTypes from "prop-types";
import {Route, Redirect} from "react-router-dom";

const PrivateRoute = (props) => {
  const {path, render, isRequire, redirectTo, exact} = props;

  return (
    <Route
      path={path}
      exact={exact}
      component={() => {
        return (
          isRequire
            ? render()
            : <Redirect to={redirectTo} />
        );
      }}
    />
  );
};

PrivateRoute.propTypes = {
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
  isRequire: PropTypes.bool.isRequired,
  redirectTo: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired
};


export default PrivateRoute;
