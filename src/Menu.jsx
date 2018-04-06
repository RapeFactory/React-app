import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Menu extends Component {
  render() {
    return (
      <div>
        <Link to="/">Эскизы</Link>
        <Link to="/hist">История</Link>
      </div>
    );
  }
}

export default Menu;
