import React, { Component } from 'react';
import { RaisedButton, TextField, MenuItem, SelectField } from 'material-ui';
import ImgList from './ImgList';

const styles = {
  textField: {
    width: '400px'
  }
};

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgs: [],
      loaded: true,
      url: 'product',
      input: ''
    };
  }

  getGuid = order => {
    const url =
      (this.state.url === 'product'
        ? `https://eco-cou.oknosoft.ru/wb_21_doc/`
        : `http://192.168.0.2:5984/wb_21_doc/`) +
      '_design/doc/_view/number_doc?include_docs=true&inclusive_end=true&' +
      `start_key=["doc.calc_order", 2017, "${order}"]&end_key=["doc.calc_order", 2017, "${order}"]`;

    fetch(url)
      .then(res => res.json())
      .then(json => console.log(json));
  };

  fetchGuid = guid => {
    guid = guid || '92a7b323-5c9d-41e4-d07a-9a9d6a9f683b';
    const url =
      this.state.url === 'product'
        ? `https://zakaz.ecookna.ru/r/img/doc.calc_order/${guid}`
        : `http://192.168.0.2:3021/r/img/doc.calc_order/${guid}`;
    console.log(url);
    fetch(url)
      .then(res => res.json())
      .then(json => this.getImgs(json))
      .then(imgs =>
        this.setState({
          imgs,
          loaded: true
        })
      )
      .catch(err => {
        console.error(err);
        this.setState({ loaded: true });
      });
  };

  getImgs = json => {
    const imgs = [];
    for (const key of Object.keys(json)) {
      if (json[key].hasOwnProperty('imgs')) {
        for (const img of Object.entries(json[key].imgs)) {
          imgs.push({ id: img[0], img: img[1] });
        }
      }
    }
    if (imgs.length === 0) throw new Error('Неверный запрос или эскизов нет');
    return imgs;
  };

  handleClick = _ => {
    this.setState({
      imgs: [],
      loaded: false
    });

    const { input } = this.state;
    this.fetchGuid(input);
    // input.indexOf('-') !== -1 ? this.fetchGuid(input) : this.getGuid(input);
  };

  inputChange = e => this.setState({ input: e.target.value });

  selectChange = (e, i, value) => this.setState({ url: value });

  render() {
    const { imgs, loaded, url } = this.state;
    return (
      <div>
        <div className="grid">
          <SelectField
            className="item"
            floatingLabelText="База"
            fullWidth
            value={url}
            onChange={this.selectChange}
          >
            <MenuItem value={'product'} primaryText="Product" />
            <MenuItem value={'develop'} primaryText="Develop" />
          </SelectField>
          <TextField
            className="item"
            id="input"
            hintText="guid"
            style={styles.textField}
            onChange={this.inputChange}
            floatingLabelText="guid формат 92a7b323-5c9d-41e4-d07a-9a9d6a9f683b"
          />
          <RaisedButton
            className="item"
            label="Отобразить"
            onClick={this.handleClick}
            disabled={!loaded}
          />
        </div>
        <ImgList className="item1" imgs={imgs} loaded={loaded} />
      </div>
    );
  }
}

export default Input;
