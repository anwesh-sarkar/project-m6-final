import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Homepage from "./Homepage";
import Login from "./menu/Login";
import Logout from "./menu/Logout";
import Register from "./menu/Register";
import Settings from "./menu/Settings";
import SetWanted from "./menu/SetWanted";
import SetOffering from "./menu/SetOffering";
import PrivateRoute from "../hocs/PrivateRoute";
import PublicRoute from "../hocs/PublicRoute";

import { loadUser } from "../components/actions/auth-actions";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  React.useEffect(() => {
    dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Switch>
        <PublicRoute exact path="/" component={Homepage} />
        <PublicRoute path="/login" component={Login} />
        <PublicRoute path="/register" component={Register} />
        <PrivateRoute path="/logout" component={Logout} />
        <PrivateRoute path="/settings" componenet={Settings} />
        <PrivateRoute path="/offering" componenet={SetOffering} />
        <Route path="/wanted" component={SetWanted} />
      </Switch>
    </Router>
  );
}

export default App;
