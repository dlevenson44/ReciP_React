import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';

import Error from './components/Error';
import FavoritesList from './components/FavoritesList';
import Header from './components/Header';
import Login from './components/Login';
import Nav from './components/Nav';
import Profile from './components/Profile';
import Register from './components/Register';
import Search from './components/Search';

class App extends Component {
  constructor() {
    super()
    this.state = {
      auth: false,
      user: null,
      fireRedirect: false,
      redirectPath: null,
    }   
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this)
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this)
    this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this)
    this.logout = this.logout.bind(this)
    this.searchTakenCredentials = this.searchTakenCredentials.bind(this)
    this.userDelete = this.userDelete.bind(this)
  }

  handleLoginSubmit(e, data) {
    e.preventDefault()
    fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data)
    }).then(res => res.json())
    .then(res => {
      this.setState({
        auth: res.auth,
        user: res.data.user
      })
    }).catch(err => console.log(err))
  }

  handleRegisterSubmit(e, data) {
    e.preventDefault()
    fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data)
    }).then(res => res.json())
    .then(res => {
      console.log(res)
      console.log(this.state)
      this.setState({
        auth: res.auth,
        user: res.data.user
      })
      console.log(this.state)
    }).catch(err => console.log(err))
  }

  handleUpdateSubmit(e, data, id) {
    e.preventDefault()
    fetch(`/api/auth${id}`, {
      method: 'PUT',
      credentials: 'inlucde',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(res => res.json())
    .then(res => {
      this.setState({
        fireRedirect: true,
        redirectPath: '/profile'
      })
    }).catch(err => console.log(err))
  }

  logout() {
    fetch('/api/auth/logout', {
      credentials: 'include',
    }).then(res => res.json())
    .then(res => {
      this.setState({
        auth: false,
        user: res.data.user,
      })
    }).catch(err => console.log(err))
  }

  searchTakenCredentials() {
    fetch('/api/auth/taken', {
      method: 'GET',
    }).then(res => res.json())
    .then(res => {
      console.log(res)
    })
  }

  userDelete(id) {
    fetch(`/api/auth/${id}`, {
      method: 'DELETE',
    }).then(res => res.json())
    .then(res => {
      this.setState({
        fireRedirect: true,
        redirectPath: '/',
        auth: false
      })
      alert('Profile Deleted')
    }).catch(err => console.log(err))
  }

  componentWillMount() {
    fetch('/api/auth/verify', {
      credentials: 'include',
    }).then(res => res.json())
    .then(res => {
      this.setState({
        auth: res.auth,
        user: res.data.user,
      })
    }).catch(err => console.log(err))
  }

  render() {
    return (
      <Router>
      <div className="App">
        <Header header="ReciP" />
        <Nav logout={this.logout} auth={this.state.auth} />
        
        <Route exact path="/" auth={this.state.auth} user={this.state.user} render={() => <Search user={this.state.user} auth={this.state.auth}/ >} />        

        <Route exact path="/login" render={() => (
          this.state.auth
          ? <Redirect to="/favorites" />
          : <Login handleLoginSubmit={this.handleLoginSubmit} />
        )} />

        <Route exact path="/register" render={() => (
          this.state.auth
          ? <Redirect to="/favorites" />
          : <Register handleRegisterSubmit={this.handleRegisterSubmit} searchTakenCredentials={this.searchTakenCredentials} />
        )} />

        <Route exact path="/favorites" render={() => (
          this.state.auth
          ? <FavoritesList auth={this.state.auth} user={this.state.user} />
          : <Error />
        )} />

        <Route exact path="/profile" render={() => (
          this.state.auth
          ? <Profile user={this.state.user} handleUpdateSubmit={this.handleUpdateSubmit} userDelete={this.userDelete} />
          : <Error />
        )} />
      </div>
      </Router>
    );
  }
}

export default App;
