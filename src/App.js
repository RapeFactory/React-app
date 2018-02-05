import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class HelloWorld extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayedText: 'stranger'
        };
    }

    handleNameChange(event) {
        this.setState({
            displayedText: event.target.value
        });
    }

    render() {
        return (
            <div>
                <input
                    type="text"
                    placeholder="Search..."
                    className="search-field"
                    onChange={this.handleNameChange.bind(this)}>
                </input>
                <div>
                    Hello, {this.state.displayedText}
                </div>
            </div>
        );
    }
}

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Makeev vs React</h1>
                </header>
                <div className="App-intro">
                    <HelloWorld />
                </div>
            </div>
        );
    }
}
// To get started, edit <code>src/App.js</code> and save to reload.
export default App;
