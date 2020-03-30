import * as React from "react";
import {Route, Redirect} from "react-router-dom";

interface Props{
  path: string;
  render: () => React.ReactNode;
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
      render={() => {
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
