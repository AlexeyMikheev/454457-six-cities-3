import * as React from "react";
import {Route, Redirect} from "react-router-dom";

interface Props{
  path: string;
  render: () => void;
  isRequire: boolean;
  redirectTo: string;
  exact: boolean;
}

const PrivateRoute: React.FC<Props> = (props) => {
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

export default PrivateRoute;
