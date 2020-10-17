import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import styled from "styled-components";
import Homepage from "./Homepage/Homepage";

function App (){
return (
  <Router>
    <Switch>
      <Route exact path="/">
        <Homepage />
      </Route>
    </Switch>
  </Router>
);
}
  

export default App;