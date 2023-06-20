import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Filter.module.scss';

class Filter extends Component {
  render() {
    const { value, onChange } = this.props;

    return (
      <label className={styles.filter}>
        Filter contacts by name:
        <input
          type="text"
          value={value}
          onChange={onChange}
          className={styles.input}
        />
      </label>
    );
  }
}

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
