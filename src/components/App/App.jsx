import  { useState, useEffect } from "react";
import ContactForm from "../ContactForm/ContactForm";
import ContactList from "../ContactList/ContactList";
import Filter from "../Filter/Filter";
import styles from "./App.module.scss";

const localStorageKey = "contacts";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const storedContacts = localStorage.getItem(localStorageKey);

    if (storedContacts) {
      const parsedContacts = JSON.parse(storedContacts);
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    const newContact = {
      id: generateId(),
      name,
      number,
    };
    const updatedContacts = [...contacts, newContact];

    setContacts(updatedContacts);
  };

  const generateId = () => {
    return `id-${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = (id) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== id);

    setContacts(updatedContacts);
  };

  const filteredContacts = getFilteredContacts();

  return (
    <div className={styles.app}>
      <h1>Phonebook</h1>

      <ContactForm onAddContact={addContact} />

      <h2>Contacts</h2>

      <Filter value={filter} onChange={handleFilterChange} />

      <ContactList
        contacts={filteredContacts}
        onDeleteContact={deleteContact}
      />

      <h2>Designed by Emmanuel S Giraldo</h2>
    </div>
  );
};

export default App;
