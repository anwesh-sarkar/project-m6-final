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
import PublicRoute from "../hocs/PublicRoute";
import PrivateRoute from "../hocs/PrivateRoute";

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
        <Route exact path="/" component={Homepage} />
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register" component={Register} />
        <Route path="/logout" component={Logout} />
        <Route path="/settings" componenet={Settings}>
          <Settings />
        </Route>
        <Route path="/offering" componenet={SetOffering} />
        <Route path="/wanted" component={SetWanted} />
      </Switch>
    </Router>
  );
}

export default App;
