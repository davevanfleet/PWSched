import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router,
  Switch,
  Route } from 'react-router-dom';
import Layout from './containers/Layout';
import Home from './components/Home';
import Shifts from './components/Shifts'

function App() {
  return (
    <div className="App">
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/shifts">
              <Shifts />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
