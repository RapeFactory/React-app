import React, { Component } from 'react';
import { RaisedButton, TextField, Paper } from 'material-ui';
import beautify from 'json-beautify';
import Menu from './Menu';
import au from './au';
import { orange50, orange100 } from 'material-ui/styles/colors';

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
    const url = `http://rd.srvtel.ru:5984/wb_21_doc/doc.calc_order%7C${guid}?revs_info=true`;

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
    const url = `http://rd.srvtel.ru:5984/wb_21_doc/doc.calc_order%7C${guid}?rev=${rev}`;

    fetch(url, { headers })
      .then(res => res.json())
      .then(json => this.setState({ rev: beautify(json, null, 2, 120) }))
      .catch(err => {
        console.error(err);
      });
  };

  pushRevs = json => {
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
        <Paper zDepth={2} style={{ minHeight: '675px', minWidth: '99%', backgroundColor: orange50 }}>
          <h4>История</h4>
          <div className="grid">
            <TextField
              className         = "item1"
              id                = "input"
              hintText          = "guid"
              onChange          = {this.inputChange}
              floatingLabelText = "guid формат 92a7b323-5c9d-41e4-d07a-9a9d6a9f683b"
              fullWidth
            />
            <RaisedButton className="item1" label="Загрузить" onClick={this.handleClick} backgroundColor={orange100} />
            <div className="item2">
              <ul>
                {revs.map(rev => (
                  <li key={rev} onClick={this.revClick}>
                    {rev}
                  </li>
                ))}
              </ul>
            </div>
            <div className="item3">
              <pre>{rev}</pre>
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

export default Hist;
