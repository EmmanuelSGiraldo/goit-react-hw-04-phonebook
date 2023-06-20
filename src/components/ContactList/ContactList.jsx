import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ContactList.module.scss';

class ContactList extends Component {
  render() {
    const { contacts, onDeleteContact } = this.props;

    return (
      <ul className={styles.contactList}>
        {contacts.map(contact => (
          <li key={contact.id} className={styles.contactItem}>
            <span className={styles.contactName}>{contact.name}: </span>
            <span className={styles.contactNumber}>{contact.number}</span>
            <button
              onClick={() => onDeleteContact(contact.id)}
              className={styles.deleteButton}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    );
  }
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactList;
