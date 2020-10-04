import React from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router,
  Switch, Redirect,
  Route } from 'react-router-dom';
import Layout from './containers/Layout';
import Home from './components/Home';
import Shifts from './components/Shifts'
import ShiftForm from './components/ShiftForm';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

function App(props) {
  return (
    <div className="App">
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/shifts">
              {props.currentUser ? <Shifts /> : <Redirect to='/' />}
            </Route>
            <Route exact path="/create_shift">
              {props.currentUser && props.currentUser.role === "admin" ? <ShiftForm /> : <Redirect to='/shifts' />}
            </Route>
            <Route exact path="/register">
              {!props.currentUser ? <RegisterForm /> : <Redirect to='/' />}
            </Route>
            <Route exact path="/login">
              {!props.currentUser ? <LoginForm /> : <Redirect to='/' />}
            </Route>
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, null)(App);
