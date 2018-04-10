import React, { Component } from 'react';
import { RaisedButton, TextField } from 'material-ui';
import beautify from 'json-beautify';
import Menu from './Menu';
import au from './au';

const styles = {
  textField: {
    width: '400px'
  },
  pre: {
    textAlign: 'left',
    maxWidth: '800px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
  },
};

class Hist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      revs: [],
      rev: ''
    };
  }

  fetchGuid = guid => {
    const headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(au));
    guid = guid || '92a7b323-5c9d-41e4-d07a-9a9d6a9f683b';
    const url = `https://eco-cou.oknosoft.ru/wb_21_doc/doc.calc_order%7C${guid}?revs_info=true`;
    console.log(url);

    fetch(url, { headers })
      .then(res => res.json())
      .then(json => this.pushRevs(json))
      .catch(err => {
        console.error(err);
      });
  };

  revClick = e => {
    const rev = e.target.innerText;
    const { input } = this.state;
    const headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(au));
    const guid = input || '92a7b323-5c9d-41e4-d07a-9a9d6a9f683b';
    const url = `https://eco-cou.oknosoft.ru/wb_21_doc/doc.calc_order%7C${guid}?rev=${rev}`;
    console.log(url);

    fetch(url, { headers })
      .then(res => res.json())
      .then(json => this.setState({ rev: beautify(json, null, 2, 120) }))
      .catch(err => {
        console.error(err);
      });
  };

  pushRevs = json => {
    console.log(json);
    const revs = [];
    json._revs_info.forEach(rev => {
      if (rev.status === 'available') {
        revs.push(rev.rev);
      }
    });
    this.setState({ revs });
  };

  handleClick = _ => {
    const { input } = this.state;
    this.fetchGuid(input);
  };

  inputChange = e => this.setState({ input: e.target.value });

  render() {
    const { revs, rev } = this.state;
    return (
      <div className="App-intro">
        <Menu />
        <h5>HISTORY</h5>
        <TextField
          className="item"
          id="input"
          hintText="guid"
          style={styles.textField}
          onChange={this.inputChange}
          floatingLabelText="guid формат 92a7b323-5c9d-41e4-d07a-9a9d6a9f683b"
        />
        <RaisedButton className="item" label="Загрузить" onClick={this.handleClick} />
        <div style={styles.grid}>
          <div>
            <ul>
              {revs.map(rev => (
                <li key={rev} onClick={this.revClick}>
                  {rev}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <pre style={styles.pre}>{rev}</pre>
          </div>
        </div>
      </div>
    );
  }
}

export default Hist;
