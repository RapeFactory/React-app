import React, { Component } from 'react';
import Menu from './Menu';
import logo from './logo.svg';
import './App.css';

const CONTACTS = [
  {
    id: 1,
    name: 'Darth Vader',
    phoneNumber: '+250966666666',
    image: 'img/darth.gif',
    email: 'darthvader@sith.net',
    address: 'DeathStar'
  },
  {
    id: 2,
    name: 'Princess Leia',
    phoneNumber: '+250966344466',
    image: 'img/leia.gif',
    email: 'leiaorgana@rebel.net',
    address: 'Hot'
  },
  {
    id: 3,
    name: 'Luke Skywalker',
    phoneNumber: '+250976654433',
    image: 'img/luke.gif',
    email: 'lukeskywalker@rebel.net',
    address: 'Tatuin'
  },
  {
    id: 4,
    name: 'Chewbacca',
    phoneNumber: '+250456784935',
    image: 'img/chewbacca.gif',
    email: 'chewbacca@archer.net',
    address: 'Kashiik'
  },
  {
    id: 5,
    name: 'R2D2',
    phoneNumber: '+232223233',
    image: 'img/r2d2.gif',
    email: 'R2D2@driods.net',
    address: 'DroidSity'
  }
];

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false
    };
  }

  handleClick = () => {
    let { isOpened } = this.state;
    isOpened ? this.setState({ isOpened: false }) : this.setState({ isOpened: true });
  };

  handleEnter = () => {
    this.setState({ isOpened: true });
  };

  handleLeave = () => {
    this.setState({ isOpened: false });
  };

  render() {
    const {
      handleClick,
      handleEnter,
      handleLeave,
      props: { image, name, phoneNumber, email, address }
    } = this;
    const { isOpened } = this.state;
    return (
      <li className="contact" onClick={handleClick} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
        <img className="contact-image" src={image} alt="logo" width="60px" height="60px" />
        <div className="contact-info">
          <div className="contact-name">{name}</div>
          <div className="contact-number">{phoneNumber}</div>
          {isOpened && (
            <div>
              <div className="contact-number">{email}</div>
              <div className="contact-number">From: {address}</div>
            </div>
          )}
        </div>
      </li>
    );
  }
}

class ContactList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayedContacts: CONTACTS
    };
  }

  handleSearch = event => {
    let searchQuery = event.target.value.toLowerCase();
    let displayedContacts = CONTACTS.filter(row => {
      let searchValue = row.name.toLowerCase();
      return searchValue.indexOf(searchQuery) !== -1;
    });
    this.setState({ displayedContacts });
  };

  render() {
    return (
      <div className="App-intro">
        <Menu />
        <h4>Контакты</h4>
        <div className="contacts">
          <input type="text" placeholder="Search..." className="search-field" onChange={this.handleSearch} />
          <ul className="contacts-list">
            {this.state.displayedContacts.map(row => {
              return (
                <Contact
                  key={row.id}
                  name={row.name}
                  phoneNumber={row.phoneNumber}
                  image={row.image}
                  email={row.email}
                  address={row.address}
                />
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default ContactList;
