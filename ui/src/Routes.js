import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

//all components
import Home from './components/Home/Home'
import Signup from './components/Signup/Signup'
import Signin from './components/Signin/Signin'
import CreateTweet from './components/CreateTweet/CreateTweet'
import Profile from './components/Profile/Profile'
import OtherUser from './components/OtherUser/OtherUser'
import AllUser from './components/AllUser/AllUser'
import SingleTweet from "./components/SingleTweet/SingleTweet";

const Routes = () => {
    return (
        <BrowserRouter >
       
        <Switch> 
          <Route path="/" exact component={Home} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/signin" exact component={Signin} />
          <Route path="/tweet" exact component={CreateTweet} />
          <Route path="/user/profile" exact component={Profile} />
          <Route path="/user/find" exact component={AllUser} />
          <Route path="/profile/:userId" exact component={OtherUser} />
          <Route path="/tweet/details/:tweetId" exact component={SingleTweet} />
          
        </Switch>
            
      </BrowserRouter>
 
    )
}



export default Routes;
