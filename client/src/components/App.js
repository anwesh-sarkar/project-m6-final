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

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
        <Route path="/setoffering">
          <SetOffering />
        </Route>
        <Route path="/setwanted">
          <SetWanted />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
