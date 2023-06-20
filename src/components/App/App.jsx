import { Component } from "react";
import ContactForm from "../ContactForm/ContactForm";
import ContactList from "../ContactList/ContactList";
import Filter from "../Filter/Filter";
import styles from "./App.module.scss";

const localStorageKey = "contacts";

class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  // Este método se ejecuta después de que el componente se monta en el DOM.
  componentDidMount() {
    // Intentamos obtener los contactos almacenados en el local storage.
    const storedContacts = localStorage.getItem(localStorageKey);

    if (storedContacts) {
      // Si hay contactos almacenados, los parseamos y los establecemos en el estado de la aplicación.
      const parsedContacts = JSON.parse(storedContacts);
      this.setState({ contacts: parsedContacts });
    }
  }

  addContact = (name, number) => {
    const { contacts } = this.state;
    const newContact = {
      id: this.generateId(),
      name,
      number,
    };
    const updatedContacts = [...contacts, newContact];

    // Actualizamos el estado de los contactos y guardamos los cambios en el local storage.
    this.setState({ contacts: updatedContacts }, () => {
      localStorage.setItem(localStorageKey, JSON.stringify(updatedContacts));
    });
  };

  generateId = () => {
    return `id-${Math.random().toString(36).substr(2, 9)}`;
  };

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = (id) => {
    const { contacts } = this.state;
    const updatedContacts = contacts.filter((contact) => contact.id !== id);

    // Actualizamos el estado de los contactos y guardamos los cambios en el local storage.
    this.setState({ contacts: updatedContacts }, () => {
      localStorage.setItem(localStorageKey, JSON.stringify(updatedContacts));
    });
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