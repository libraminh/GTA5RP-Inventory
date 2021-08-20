import React from "react";
import Panel from "components/Panel/Panel";
import Primary from "components/Primary/Primary";
import Sidebar from "components/Sidebar/Sidebar";
import Login from "components/Auth/Login";
import Register from "components/Auth/Register";

const routes = [
  {
    path: ["/", "lists/:id", "tasks/:id", "search/:id"],
    exact: false,
    render: (props) => {
      return (
        <>
          <Sidebar {...props} />
          <Primary {...props} />
          {props.location.state && props.location.state.todo && (
            <Panel {...props} />
          )}
        </>
      );
    },
  },
  {
    path: "/auth/login",
    exact: true,
    auth: Login,
  },
  {
    path: "/auth/register",
    exact: true,
    auth: Register,
  },
];

export default routes;
