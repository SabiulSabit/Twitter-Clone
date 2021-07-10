import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

//all components
import Signup from './components/Signup/Signup'

const Routes = () => {
    return (
        <BrowserRouter>
        <Switch> dashboard
          <Route path="/signup" exact component={Signup} />
          
        </Switch>
      </BrowserRouter>
    )
}

export default Routes;
