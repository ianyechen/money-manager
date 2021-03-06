import React from 'react';

import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';

import Spendings from './components/Spendings'
import Investments from './components/Investments'
import Community from './components/Community'
import NavBar from './components/NavBar/index.js';
import AdminNavBar from './components/NavBar/adminNavBar.js';
import Home from './components/Home';
import Login from './components/Login/login';
import SignUp from './components/Signup/signup.js';
import Contact from './components/ContactUs/contact.js';
import Sent from './components/ContactUs/sent.js';
import About from './components/AboutUs/about.js';
import Profile from './components/Profile/profile.js';
import Manage from './components/Manage/manage.js';
import Resources from './components/Resources/resources.js';
import Error from './components/Error/error.js';
import { checkSession } from "./actions/user.js";

class App extends React.Component {

  componentDidMount() {
    checkSession(this); // sees if a user is logged in
  }

  state = {
    loggedIn: false,
    username: "",
    password: "",
    userLevel: "",
    currentUser: null,
    signedUpUser: false,
  }

  loginHandler = (username, password) => {

    if (username == 'user' && password == 'user') {
      this.state.loggedIn = true;
      this.state.username = username;
      this.state.password = password;
      this.state.userLevel = "User";
    }
    else if (username == 'admin' && password == 'admin') {
      this.state.loggedIn = true;
      this.state.username = username;
      this.state.password = password;
      this.state.userLevel = "Financial Advisor";
    }
    else this.state.loggedIn = false;

    this.setState({
      loggedIn: this.state.loggedIn,
      username: this.state.username,
      password: this.state.password,
      userLevel: this.state.userLevel,
    })
  }

  handleLogOut = () => {
    this.state.loggedIn = false;
    this.state.userLevel = "";
    this.setState({
      loggedIn: this.state.loggedIn,
      userLevel: this.state.userLevel,
    })
  }

  render() {

    const { currentUser } = this.state;
    if(currentUser != null) {
      this.state.loggedIn = true;
    } else {
      this.state.loggedIn = false;
    }

    return (

      <div>
        <BrowserRouter>

          {currentUser != null ? 
            currentUser.userLevel === "Financial Advisor" ?
              <div>
                <AdminNavBar
                  username={currentUser.username}
                />
              </div>
              : this.state.loggedIn ?
                <div>
                  <NavBar
                    username={currentUser.username}
                  />
                </div>
                : null
            :
            null
          }

          <Switch>

            <Route exact path='/'
              render={() => (<Home
                loggedIn={this.state.loggedIn} />)} />

            <Route exact path='/error'
              render={props => (<Error 
                loggedIn={this.state.loggedIn}
                {...props} app={this}/>)} />
            
            <Route
                exact path={["/login", "/spendings"]}
                render={ props => (
                    <div className="app">
                        { /* Different componenets rendered depending on if someone is logged in. */}
                        {!currentUser ? 
                          <Login {...props} app={this} /> 
                          : 
                          currentUser.userLevel == "Regular User" ?
                            <Spendings loggedIn={this.state.loggedIn} {...props} app={this} />
                            :
                            <Community loggedIn={this.state.loggedIn}
                                      username={currentUser.username}
                                      usertype={currentUser.userLevel}
                                      FAName={currentUser.FAName}
                                      FAIntro={currentUser.FAIntro}
                                      FAFields={currentUser.FAFields}
                                      FAPoints={currentUser.FAPoints}
                                      userInfo={currentUser}
                                      {...props} app={this} />
                          }
                    </div>                   // ... spread operator - provides all of the props in the props object
                    
                )}
            />

            <Route exact path='/signup'
              render={props => (<SignUp {...props} app={this}/>)} />

            <Route exact path='/community'
              render={props => (
                <div className = "app">
                  {!currentUser ? 
                          <Login {...props} app={this} /> 
                          : 
                          <Community
                            loggedIn={this.state.loggedIn}
                            username={currentUser.username}
                            usertype={currentUser.userLevel}
                            FAName={currentUser.FAName}
                            FAIntro={currentUser.FAIntro}
                            FAFields={currentUser.FAFields}
                            FAPoints={currentUser.FAPoints}
                            userInfo={currentUser}
                            app={this} />
                  }
                </div>
              )}
            />

              <Route
                exact path={["/investments", "/manage"]}
                render={ props => (
                    <div className="app">
                        { /* Different componenets rendered depending on if someone is logged in. */}
                        {!currentUser ? 
                          <Login {...props} app={this} /> 
                          : 
                          currentUser.userLevel == "Regular User" ?
                            <Investments user={currentUser} loggedIn={this.state.loggedIn} {...props} app={this} />
                            :
                            <Manage loggedIn={this.state.loggedIn}
                                            user={currentUser}
                                            {...props} 
                                            app={this}/>
                          }
                    </div>                   // ... spread operator - provides all of the props in the props object
                    
                )}
            />

            <Route exact path='/contact'
              render={() => (<Contact
                loggedIn={this.state.loggedIn} />)} />

            <Route exact path='/investments'
              render={props => (
                <div className = "app">
                  {!currentUser ? 
                          <Login {...props} app={this} /> 
                          : 
                          <Investments
                            loggedIn={this.state.loggedIn}
                            user={currentUser}
                            {...props} app={this}
                          />
                  }
                </div>
              )}
            />

            <Route exact path='/manage'
              render={props => (
                <div className = "app">
                  {!currentUser ? 
                          <Login {...props} app={this} /> 
                          : 
                          <Manage
                            loggedIn={this.state.loggedIn}
                            user={currentUser}
                            {...props} 
                            app={this}
                          />
                  }
                </div>
              )}
            />

            <Route exact path='/resources'
              render={props => (
                <div className = "app">
                  {!currentUser ? 
                          <Login {...props} app={this} /> 
                          : 
                          <Resources
                            loggedIn={this.state.loggedIn}
                          />
                  }
                </div>
              )}
            />

            <Route exact path='/sent'
              render={() => (<Sent
                loggedIn={this.state.loggedIn} />)} />

            <Route exact path='/about'
              render={() => (<About
                loggedIn={this.state.loggedIn} />)} />

            <Route exact path='/profile'
              render={props => (
                <div className = "app">
                  {!currentUser ? 
                          <Login {...props} app={this} /> 
                          : 
                          <Profile
                            handleLogOut={this.handleLogOut}
                            loggedIn={this.state.loggedIn}
                            user={currentUser}
                            app={this}
                            {...props}
                          />
                  }
                </div>
              )}
            />

          </Switch>
        </BrowserRouter>
      </div>

    )

  }

}

export default App;