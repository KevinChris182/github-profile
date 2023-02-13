import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Readme from "./components/Readme";
import Home from "./components/Home";
import "./App.css";

const App: React.FC = () => {
  return (
    <>
      <Route path="/" render={() => <Redirect to="/home" />} />
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route
          path="/readme/:owner_name/:project_name/:branch_name"
          component={Readme}
        />
      </Switch>
    </>
  );
};

export default App;
