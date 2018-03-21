import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { RaisedButton, TextField, CircularProgress } from 'material-ui';
import { GridList, GridTile } from 'material-ui/GridList';

const styles = {
    textField: {
        margin: '10px',
        width: '400px',
    },
    raisedButton: {

    },
    gridList: {
        display: 'flex',
        flexWrap: 'wrap',
        overflowX: 'auto',
    },
}

class ImgList extends Component {

    render () {
        const { imgs } = this.props;
        return (
            <GridList cols={ 4 } cellHeight={ 'auto' } style={ styles.gridList } >
                { imgs.map((img, id) => {
                    return <GridTile
                        key={ id }
                        title={ img.id }
                        titleBackground={ 'rgba(0, 0, 0, 0.1)' }
                    >
                        <img src={ `data:image/png;base64, ${img.img}` } />
                    </GridTile>
                }) }
            </GridList>
        );
    }
}

class Input extends Component {
    constructor (props) {
        super(props);
        this.state = {
            imgs: [],
            loaded: true,
        }
    }

    getImgs = (json) => {
        const imgs = [];
        for (const key of Object.keys(json)) {
            if (json[key].hasOwnProperty('imgs')) {
                for (const img of Object.entries(json[key].imgs)) {
                    imgs.push({ id: img[0], img: img[1] });
                }
            }
        };
        return imgs;
    };

    handleClick = event => {
        this.setState({
            imgs: [],
            loaded: false,
        });
        const input = document.getElementById('input');
        const guid = input.value || '92a7b323-5c9d-41e4-d07a-9a9d6a9f683b';
        input.value = guid;
        const url = `https://zakaz.ecookna.ru/r/img/doc.calc_order/${guid}`;
        console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(json => this.getImgs(json))
            .then(imgs => this.setState({
                imgs,
                loaded: true,
            }))
            .catch(err => console.error(err));
    }

    render () {
        const { imgs, loaded } = this.state;
        return (
            <div>
                <TextField id='input' hintText='guid' style={ styles.textField } />
                <RaisedButton label='Отобразить' onClick={ this.handleClick } disabled={ !loaded } />
                <div>
                    { loaded
                        ? <ImgList imgs={ imgs } />
                        // ? imgs.map(img => <img src={ `data:image/png;base64, ${img}` } />)
                        : <CircularProgress size={ 150 } thickness={ 10 } style={ { margin: 50 } } /> }
                </div>
            </div>
        );
    }
}

class App extends Component {
    render () {
        return <div className="App">
            <header className="App-header">
                <img src={ logo } className="App-logo" alt="logo" />
                <h1 className="App-title">Makeev vs Sketch Service</h1>
            </header>
            <MuiThemeProvider>
                <div className="App-intro">
                    <Input />
                </div>
            </MuiThemeProvider>
        </div>;
    }
}
// To get started, edit <code>src/App.js</code> and save to reload.
export default App;
