import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';

import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header header="ReciP" />

        <Route exact path="/login" render={() => (
          this.state.auth
          ? <Redirect to="/favorites" />
          : <Login handleLoginSubmit={this.handleLoginSubmit} />
        )} />

        <Route exact path="/register" render={() => (
          this.state.auth
          ? <Redirect to="/favorites" />
          : <Register handleRegisterSubmit={this.handleRegisterSubmit} />
        )} />

        <Route exact path="/favorites" render={() => (
          this.state.auth
          ? <Favorites user={this.state.user} />
          : <Error />
        )} />

        <Route exact path="/profile" render={() => (
          this.state.auth
          ? <Profile user={this.state.user} handleUpdateSubmit={this.handleUpdateSubmit} userDelete={this.userDelete} />
          : <Error />
        )} />
      </div>
    );
  }
}

export default App;
