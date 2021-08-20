import React from "react";
import { Route, Redirect } from "react-router-dom";
import Utils from "utils/methods";

const ProtectedRoute = ({ ...rest }) => {
  const isCurrentUser = Utils.getLocalStorage("uid");

  if (isCurrentUser) {
    return <Route {...rest} />;
  } else {
    return (
      <Redirect
        to={{
          pathname: "/auth/login",
        }}
      />
    );
  }
};

export default ProtectedRoute;
