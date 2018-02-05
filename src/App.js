import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class HelloWorld extends Component {
    render() {
        const { props: { title, author, body } } = this;
        return (<div className="State">
            <h3>{title}</h3>
            <h4>{author}</h4>
            <h5>{body}</h5>
        </div>)
    }
}

class App extends Component {
    render() {
        return (<div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <h1 className="App-title">Makeev vs React</h1>
            </header>
            <p className="App-intro">
                <HelloWorld title="Заголовок" author="Автор" body="Статья"/>
            </p>
        </div>);
    }
}
// To get started, edit <code>src/App.js</code> and save to reload.
export default App;
