import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ContactForm.module.scss';

const ContactForm = ({ onAddContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onAddContact(name, number);

    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles['contact-form']}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Number:
        <input
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          required
        />
      </label>

      <button type="submit">Add contact</button>
    </form>
  );
};

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};

export default ContactForm;
