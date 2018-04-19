import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Input from './Input';
import Hist from './Hist';
import Test from './Test'
import { Switch, Route, HashRouter } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Makeev vs Sketch Service</h1>
        </header>
        <MuiThemeProvider>
          <HashRouter>
            <Switch>
              <Route exact path="/" component={Input} />
              <Route path="/hist" component={Hist} />
              <Route path="/test" component={Test} />
            </Switch>
          </HashRouter>
        </MuiThemeProvider>
      </div>
    );
  }
}
// To get started, edit <code>src/App.js</code> and save to reload.
export default App;
