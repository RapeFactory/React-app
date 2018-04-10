import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Menu extends Component {
  render() {
    return (
      <div>
        <Link to="/" className='menu'>Эскизы</Link>
        <Link to="/hist" className='menu'>История</Link>
      </div>
    );
  }
}

export default Menu;
