import React from "react";
import Navbar from './components/Navbar/NavbarShow'
import { BrowserRouter, Switch, Route } from "react-router-dom";

//all components
import Signup from './components/Signup/Signup'
import Signin from './components/Signin/Signin'

const Routes = () => {
    return (
        <BrowserRouter>
       <Navbar></Navbar>
        <Switch> 
          <Route path="/signup" exact component={Signup} />
          <Route path="/signin" exact component={Signin} />
          
        </Switch>
      </BrowserRouter>
    )
}

export default Routes;
