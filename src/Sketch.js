import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgs: []
        }
    }

    getImgs = (json) => {
        const imgs = [];
        for (const key of Object.keys(json)) {
            if (json[key].hasOwnProperty('imgs')) {
                for (const img of Object.values(json[key].imgs)) {
                    imgs.push(img);
                }
            }
        };
        return imgs;
    };
    
    handleClick = event => {
        this.setState({ imgs: [] });
        let inputValue = event.target.previousSibling.value;
        const guid = inputValue || '92a7b323-5c9d-41e4-d07a-9a9d6a9f683b';
        const url = `https://zakaz.ecookna.ru/r/img/doc.calc_order/${guid}`;
        console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(json => this.getImgs(json))
            .then(imgs => this.setState({ imgs }))
            .catch(err => console.error(err));
    }

    render() {
        return (
            <div>
                <input placeholder='guid' type='text' className='search-field'/>
                <button onClick={this.handleClick}>ЖМИ</button>
                <ul>{this.state.imgs.map( img => {
                    const srcImg = `data:image/png;base64, ${img}`
                        return <li>
                            <img src={srcImg} alt=""/>
                        </li>
                    })}
                </ul>
            </div>
        );
    }
}

class App extends Component {
    render() {
        return <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <h1 className="App-title">Makeev vs Sketch Service</h1>
            </header>
            <div className="App-intro">
                <Input/>
            </div>
        </div>;
    }
}
// To get started, edit <code>src/App.js</code> and save to reload.
export default App;
