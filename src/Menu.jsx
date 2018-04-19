import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Menu extends Component {
  render() {
    return (
      <div>
        <Link to="/" className='menu'>Эскизы</Link>
        <Link to="/hist" className='menu'>История</Link>
        <Link to="/test" className='menu'>Тест</Link>
      </div>
    );
  }
}

export default Menu;
