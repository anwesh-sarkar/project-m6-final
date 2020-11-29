import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Homepage from "./Homepage";
import Login from "./menu/Login";
import Register from "./menu/Register";
import Settings from "./menu/Settings";
import SetWanted from "./menu/SetWanted";
import SetOffering from "./menu/SetOffering";

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

        <Route path="/settings" componenet={Settings}>
          <Settings />
        </Route>
        <Route path="/offering" componenet={SetOffering}>
          <SetOffering />
        </Route>
        <Route path="/wanted" component={SetWanted}>
          <SetWanted />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
