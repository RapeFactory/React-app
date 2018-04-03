import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Input from './Input'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Makeev vs Sketch Service</h1>
        </header>
        <MuiThemeProvider>
          <div className="App-intro">
            <Input />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
// To get started, edit <code>src/App.js</code> and save to reload.
export default App;
