import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

const CONTACTS = [
    {
        id: 1,
        name: 'Darth Vader',
        phoneNumber: '+250966666666',
        image: 'img/darth.gif',
    }, {
        id: 2,
        name: 'Princess Leia',
        phoneNumber: '+250966344466',
        image: 'img/leia.gif',
    }, {
        id: 3,
        name: 'Luke Skywalker',
        phoneNumber: '+250976654433',
        image: 'img/luke.gif',
    }, {
        id: 4,
        name: 'Chewbacca',
        phoneNumber: '+250456784935',
        image: 'img/chewbacca.gif',
    }, {
        id: 5,
        name: 'R2D2',
        phoneNumber: '+232223233',
        image: 'img/',
    },
];

class Contact extends Component {
    render() {
        return (<li className="contact">
            <img className="contact-image" src={this.props.image} alt="logo" width="60px" height="60px"/>
            <div className="contact-info">
                <div className="contact-name">
                    {this.props.name}
                </div>
                <div className="contact-number">
                    {this.props.phoneNumber}
                </div>
            </div>
        </li>);
    }
}

class ContactList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayedContacts: CONTACTS
        };
    }

    handleSearch(event) {
        let searchQuery = event.target.value.toLowerCase();
        let displayedContacts = CONTACTS.filter((el) => {
            let searchValue = el.name.toLowerCase();
            return searchValue.indexOf(searchQuery) !== -1;
        });
        this.setState({displayedContacts});
    }

    render() {
        return <div className="contacts">
            <input type="text" placeholder="Search..." className="search-field" onChange={this.handleSearch.bind(this)}/>
            <ul className="contacts-list">
                {
                    this.state.displayedContacts.map((el) => {
                        return <Contact key={el.id} name={el.name} phoneNumber={el.phoneNumber} image={el.image}/>;
                    })
                }
            </ul>
        </div>;
    }
}

class App extends Component {
    render() {
        return <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <h1 className="App-title">Makeev vs React</h1>
            </header>
            <div className="App-intro">
                <ContactList/>
            </div>
        </div>;
    }
}
// To get started, edit <code>src/App.js</code> and save to reload.
export default App;
