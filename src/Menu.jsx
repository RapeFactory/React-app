import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Paper, FlatButton } from 'material-ui';
import { blue100, orange100, green100, red100 } from 'material-ui/styles/colors';
const style = {
  border: '10px',
  padding: '10px',
  width: 'fit-content',
  margin: '10px auto'
};

class Menu extends Component {
  render() {
    return (
      <Paper zDepth={1} style={style}>
        <Link to="/" className="menu">
          <FlatButton backgroundColor={red100} label="Эскизы" />
        </Link>
        <Link to="/hist" className="menu">
          <FlatButton backgroundColor={orange100} label="История" />
        </Link>
        <Link to="/list" className="menu">
          <FlatButton backgroundColor={green100} label="Контакты" />
        </Link>
        <Link to="/test" className="menu">
          <FlatButton backgroundColor={blue100} label="Тест" />
        </Link>
      </Paper>
    );
  }
}

export default Menu;
