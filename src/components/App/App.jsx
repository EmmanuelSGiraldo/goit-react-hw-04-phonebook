import React, { Component } from 'react';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';
import styles from './App.module.scss';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = (name, number) => {
    const { contacts } = this.state;
    const newContact = {
      id: this.generateId(),
      name,
      number,
    };
    const updatedContacts = [...contacts, newContact];

    this.setState({ contacts: updatedContacts });
  };

  generateId = () => {
    return `id-${Math.random().toString(36).substr(2, 9)}`;
  };

  handleFilterChange = event => {
    this.setState({ filter: event.target.value });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = id => {
    const { contacts } = this.state;
    const updatedContacts = contacts.filter(contact => contact.id !== id);

    this.setState({ contacts: updatedContacts });
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.getFilteredContacts();

    return (
      <div className={styles.app}>
        <h1>Phonebook</h1>

        <ContactForm onAddContact={this.addContact} />

        <h2>Contacts</h2>

        <Filter value={filter} onChange={this.handleFilterChange} />

        <ContactList
          contacts={filteredContacts}
          onDeleteContact={this.deleteContact}
        />

        <h2>Designed by Emmanuel S Giraldo</h2>
      </div>
    );
  }
}

export default App;
