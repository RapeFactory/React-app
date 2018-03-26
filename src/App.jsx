import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { RaisedButton, TextField, CircularProgress, MenuItem, SelectField } from 'material-ui';
import { GridList, GridTile } from 'material-ui/GridList';

const styles = {
    textField: {
        width: '400px',
    },
    raisedButton: {

    },
    gridList: {
        margin: '30px',
    },
    radioButton: {

    },
    radioButtonGroup: {

    },
}

class ImgList extends Component {
    render () {
        const { imgs, loaded } = this.props;
        return loaded 
            ? <GridList cols={ 4 } cellHeight={ 'auto' } style={ styles.gridList } >
                { imgs.map((img, id) => {
                    return <GridTile
                        key={ id }
                        title={ img.id }
                        titleBackground={ 'rgba(0, 0, 0, 0.1)' }
                    >
                        <img src={ `data:image/png;base64, ${img.img}` } alt="" />
                    </GridTile>
                }) }
            </GridList>
            : <CircularProgress size={ 150 } thickness={ 10 } style={ { display: 'block', marginLeft: 130, marginTop: 50 } } />
    }
}

class Input extends Component {
    constructor (props) {
        super(props);
        this.state = {
            imgs: [],
            loaded: true,
            url: 'product',
            input: '',
        }
    }

    getGuid = order => {
        const url = (this.state.url === 'product'
            ? `https://eco-cou.oknosoft.ru/wb_21_doc/`
            : `http://192.168.0.2:5984/wb_21_doc/`) +
            '_design/doc/_view/number_doc?include_docs=true&inclusive_end=true&' +
            `start_key=["doc.calc_order", 2017, "${order}"]&end_key=["doc.calc_order", 2017, "${order}"]`;

        fetch(url)
            .then(res => res.json())
            .then(json => console.log(json))
    }

    fetchGuid = guid => {
        guid = guid || '92a7b323-5c9d-41e4-d07a-9a9d6a9f683b';
        const url = this.state.url === 'product'
            ? `https://zakaz.ecookna.ru/r/img/doc.calc_order/${guid}`
            : `http://192.168.0.2:3021/r/img/doc.calc_order/${guid}`
        console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(json => this.getImgs(json))
            .then(imgs => this.setState({
                imgs,
                loaded: true,
            }))
            .catch(err => {
                console.error(err);
                this.setState({ loaded: true })
            });
    }

    getImgs = json => {
        const imgs = [];
        for (const key of Object.keys(json)) {
            if (json[key].hasOwnProperty('imgs')) {
                for (const img of Object.entries(json[key].imgs)) {
                    imgs.push({ id: img[0], img: img[1] });
                }
            }
        };
        if (imgs.length === 0) throw new Error('Неверный запрос или эскизов нет')
        return imgs;
    }

    handleClick = _ => {
        this.setState({
            imgs: [],
            loaded: false,
        });

        const { input } = this.state;
        this.fetchGuid(input);
        /* input.indexOf('-') !== -1
            ? this.fetchGuid(input)
            : this.getGuid(input); */
    }

    inputChange = e => this.setState({ input: e.target.value })

    selectChange = (e, i, value) => this.setState({ url: value })

    render () {
        const { imgs, loaded, url } = this.state;
        return (
            <div>
                <div className="grid">
                    <SelectField
                        className="item"
                        floatingLabelText="База"
                        fullWidth
                        value={ url }
                        onChange={ this.selectChange }
                    >
                        <MenuItem value={ "product" } primaryText="Product" />
                        <MenuItem value={ "develop" } primaryText="Develop" />
                    </SelectField>
                    <TextField 
                        className="item"
                        id='input' 
                        hintText='guid' 
                        style={ styles.textField } 
                        onChange={ this.inputChange }
                        floatingLabelText='guid формат 92a7b323-5c9d-41e4-d07a-9a9d6a9f683b'
                    />
                    <RaisedButton
                        className="item" 
                        label='Отобразить'
                        onClick={ this.handleClick }
                        disabled={ !loaded }
                    />
                </div>
                <ImgList 
                    className="item1"
                    imgs={ imgs } 
                    loaded={ loaded }
                />
            </div>
        )
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
