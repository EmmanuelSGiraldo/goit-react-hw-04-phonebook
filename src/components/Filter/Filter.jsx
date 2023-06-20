
import PropTypes from 'prop-types';
import styles from './Filter.module.scss';

const Filter = ({ value, onChange }) => {
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
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
