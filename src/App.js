import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    render() {
        return (<div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <h1 className="App-title">Makeev vs React</h1>
            </header>
            <p className="App-intro">
                RapeMe
            </p>
        </div>);
    }
}
// To get started, edit <code>src/App.js</code> and save to reload.
export default App;
