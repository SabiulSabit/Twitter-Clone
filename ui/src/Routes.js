import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

//all components
import Home from './components/Home/Home'
import Signup from './components/Signup/Signup'
import Signin from './components/Signin/Signin'

const Routes = () => {
    return (
        <BrowserRouter>
       {/* <Navbar></Navbar> */}
        <Switch> 
          <Route path="/" exact component={Home} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/signin" exact component={Signin} />
          
        </Switch>
      </BrowserRouter>
    )
}

export default Routes;
